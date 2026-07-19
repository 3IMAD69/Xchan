import { createFileRoute } from "@tanstack/react-router";
import { createIPX, createIPXWebServer, ipxHttpStorage } from "ipx";

// =============================================================================
// IPX image optimizer
// Fetches remote images from the 4chan CDN server-side and resizes/reformats
// them with sharp. Hosts are restricted to the 4chan CDN (same allowlist as
// the /api/proxy route). Media is immutable, so cache aggressively.
// URL format: /api/ipx/<modifiers>/<source-url>
// Example:      /api/ipx/w_550,f_auto/https://i.4cdn.org/g/1234567890.jpg
// =============================================================================

const httpStorage = ipxHttpStorage({
  domains: ["i.4cdn.org", "s.4cdn.org", "is2.4chan.org"],
  maxAge: 60 * 60 * 24 * 7, // 7 days
  fetchOptions: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://boards.4chan.org/",
      Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
    },
  },
});

const ipx = createIPX({
  storage: httpStorage,
  httpStorage,
});

const ipxHandler = createIPXWebServer(ipx);

// =============================================================================
// In-memory LRU cache for processed images (avoids re-sharping / re-fetching)
// =============================================================================

const MAX_CACHE_ENTRIES = 500;

interface CachedImage {
  body: ArrayBuffer;
  contentType: string;
  etag: string | null;
}

const cache = new Map<string, CachedImage>();

function getCached(key: string): CachedImage | null {
  const entry = cache.get(key);
  if (!entry) return null;
  // Move to end (most recently used)
  cache.delete(key);
  cache.set(key, entry);
  return entry;
}

function setCached(key: string, entry: CachedImage): void {
  if (cache.has(key)) cache.delete(key);
  // Evict oldest if at capacity
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(key, entry);
}

function imageResponse(image: CachedImage, hit: "HIT" | "MISS"): Response {
  return new Response(image.body, {
    status: 200,
    headers: {
      "Content-Type": image.contentType,
      ...(image.etag ? { ETag: image.etag } : {}),
      "Cache-Control": "public, max-age=604800, immutable",
      "X-Cache": hit,
    },
  });
}

// =============================================================================
// Route
// =============================================================================

export const Route = createFileRoute("/api/ipx/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        // Strip the route prefix so IPX sees /<modifiers>/<id>
        const ipxPath = url.pathname.replace(/^\/api\/ipx/, "") || "/";
        // f_auto negotiates the format from the Accept header (Vary: Accept),
        // so the cache key must include it
        const cacheKey = `${request.headers.get("accept") || ""}|${ipxPath}`;

        // Serve from cache when possible
        const cached = getCached(cacheKey);
        if (cached) {
          if (cached.etag && request.headers.get("if-none-match") === cached.etag) {
            return new Response(null, { status: 304 });
          }
          return imageResponse(cached, "HIT");
        }

        const response = await ipxHandler(
          new Request(new URL(ipxPath, url.origin), request)
        );

        // Only cache successful image responses
        const contentType = response.headers.get("content-type") || "";
        if (response.ok && contentType.startsWith("image/")) {
          const image: CachedImage = {
            body: await response.arrayBuffer(),
            contentType,
            etag: response.headers.get("etag"),
          };
          setCached(cacheKey, image);
          return imageResponse(image, "MISS");
        }

        return response;
      },
    },
  },
});
