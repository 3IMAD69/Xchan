import { createFileRoute } from "@tanstack/react-router";

// =============================================================================
// Configuration
// =============================================================================

const CONFIG = {
  // Allowed 4chan CDN hostnames
  allowedHosts: ["i.4cdn.org", "s.4cdn.org", "is2.4chan.org"],
  // Cache settings
  cache: {
    maxSize: 500, // Max number of cached responses
    ttl: 3600 * 1000, // 1 hour in ms
  },
};

// =============================================================================
// In-Memory Cache with LRU eviction
// =============================================================================

interface CacheEntry {
  data: ArrayBuffer;
  contentType: string;
  contentLength: number;
  timestamp: number;
}

class LRUCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize: number;
  private ttl: number;

  constructor(maxSize: number, ttl: number) {
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  get(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry;
  }

  set(key: string, entry: CacheEntry): void {
    // Delete if exists to update position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    this.cache.set(key, entry);
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  get size(): number {
    return this.cache.size;
  }
}

const cache = new LRUCache(CONFIG.cache.maxSize, CONFIG.cache.ttl);

// =============================================================================
// URL Validation
// =============================================================================

function validateUrl(
  urlString: string | null
): { valid: true; url: URL } | { valid: false; error: string } {
  // Must be a non-empty string
  if (typeof urlString !== "string" || !urlString.trim()) {
    return { valid: false, error: "Missing 'url' query parameter" };
  }

  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }

  // Must be HTTPS
  if (url.protocol !== "https:") {
    return { valid: false, error: "Only HTTPS URLs are allowed" };
  }

  // Host must exactly match allowed hosts
  if (!CONFIG.allowedHosts.includes(url.hostname)) {
    return { valid: false, error: "Only 4chan CDN URLs are allowed" };
  }

  // Path must start with / and contain valid media extension
  const validExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webm",
    ".mp4",
    ".webp",
  ];
  const hasValidExtension = validExtensions.some((ext) =>
    url.pathname.toLowerCase().endsWith(ext)
  );
  if (!hasValidExtension) {
    return { valid: false, error: "Invalid media file type" };
  }

  // No query strings allowed (prevent injection)
  if (url.search) {
    return { valid: false, error: "Query parameters not allowed in media URL" };
  }

  return { valid: true, url };
}

// =============================================================================
// Fetch with caching
// =============================================================================

async function fetchWithCache(
  url: string
): Promise<{ data: ArrayBuffer; contentType: string; contentLength: number }> {
  // Check cache first
  const cached = cache.get(url);
  if (cached) {
    return {
      data: cached.data,
      contentType: cached.contentType,
      contentLength: cached.contentLength,
    };
  }

  // Fetch from origin
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://boards.4chan.org/",
      Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Upstream error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.arrayBuffer();
  const contentType =
    response.headers.get("content-type") || "application/octet-stream";
  const contentLength = data.byteLength;

  // Cache the response (only if reasonable size, < 50MB)
  if (contentLength < 50 * 1024 * 1024) {
    cache.set(url, {
      data,
      contentType,
      contentLength,
      timestamp: Date.now(),
    });
  }

  return { data, contentType, contentLength };
}

// =============================================================================
// Handlers
// =============================================================================

async function handleProxy(request: Request, includeBody: boolean) {
  const urlParam = new URL(request.url).searchParams.get("url");

  // Validate URL
  const validation = validateUrl(urlParam);
  if (!validation.valid) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const targetUrl = validation.url.toString();

  try {
    const { data, contentType, contentLength } =
      await fetchWithCache(targetUrl);

    // Handle Range requests for video seeking
    const rangeHeader = request.headers.get("range");
    if (includeBody && rangeHeader && contentType.startsWith("video/")) {
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        const start = parseInt(match[1], 10);
        const end = match[2] ? parseInt(match[2], 10) : contentLength - 1;

        // Validate range
        if (start >= contentLength || end >= contentLength || start > end) {
          return Response.json(
            { error: "Range not satisfiable" },
            {
              status: 416,
              headers: { "Content-Range": `bytes */${contentLength}` },
            }
          );
        }

        const slice = data.slice(start, end + 1);

        return new Response(slice, {
          status: 206,
          headers: {
            "Content-Type": contentType,
            "Content-Length": String(slice.byteLength),
            "Content-Range": `bytes ${start}-${end}/${contentLength}`,
            "Accept-Ranges": "bytes",
            "Cache-Control": "public, max-age=86400",
          },
        });
      }
    }

    // Full response
    return new Response(includeBody ? data : null, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(contentLength),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=86400",
        "X-Cache": cache.has(targetUrl) ? "HIT" : "MISS",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    // Don't expose internal errors
    if (message.startsWith("Upstream error:")) {
      const status = parseInt(message.split(":")[1].trim()) || 502;
      return Response.json({ error: message }, { status });
    }

    console.error(`Proxy error for ${targetUrl}:`, error);
    return Response.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}

export const Route = createFileRoute("/api/proxy")({
  server: {
    handlers: {
      GET: async ({ request }) => handleProxy(request, true),
      HEAD: async ({ request }) => handleProxy(request, false),
    },
  },
});
