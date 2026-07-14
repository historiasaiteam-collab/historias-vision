import { createFileRoute } from "@tanstack/react-router";

// Simple robots.txt. Sitemap directive is omitted until a canonical URL is
// configured, so we never bake a placeholder host into the file.
const BODY = `User-agent: *
Allow: /

# Add "Sitemap: https://your-domain/sitemap.xml" once the canonical host is set.
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(BODY, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
