import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

const app = new Elysia()
  // Enable CORS plugin for all routes
  .use(
    cors({
      origin: "*",
      methods: ["GET", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
      credentials: false,
    })
  )

  .get("/", () => "4chan Media Proxy Server")

  // Reverse proxy endpoint for 4chan media with streaming
  .get("/proxy", async ({ query, set }) => {
    const url = query.url as string;

    if (!url) {
      set.status = 400;
      return { error: "Missing 'url' query parameter" };
    }

    // Validate it's a 4chan URL
    if (!url.includes("4cdn.org")) {
      set.status = 403;
      return { error: "Only 4chan CDN URLs are allowed" };
    }

    try {
      // Fetch the resource with appropriate headers
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Referer: "https://boards.4chan.org/",
        },
      });

      if (!response.ok) {
        set.status = response.status;
        return { error: `Failed to fetch: ${response.statusText}` };
      }

      // Get the content type
      const contentType =
        response.headers.get("content-type") || "application/octet-stream";

      // Set response headers
      set.headers = {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
        "Accept-Ranges": "bytes",
      };

      // Stream the response back for better performance
      if (response.body) {
        return new Response(response.body, {
          headers: set.headers,
        });
      }

      return response.arrayBuffer();
    } catch (error) {
      set.status = 500;
      return { error: "Failed to proxy request", details: String(error) };
    }
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `🔄 Proxy available at http://localhost:3000/proxy?url=<4chan_media_url>`
);
