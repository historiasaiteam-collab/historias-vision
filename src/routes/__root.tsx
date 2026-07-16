import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian-depth px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow text-mint">404 / Not Found</p>
        <h1 className="mt-4 text-h1 text-cream">
          This frame doesn't <span className="italic-serif">exist.</span>
        </h1>
        <p className="mt-3 text-body">
          The page you're looking for has been cut from the sequence.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-cream/40 px-5 py-2.5 text-eyebrow text-cream transition hover:border-mint hover:text-mint"
          >
            Return home
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian-depth px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow text-mint">Signal lost</p>
        <h1 className="mt-4 text-h2 text-cream">This page didn't load.</h1>
        <p className="mt-3 text-body">
          Something interrupted the render. Try again or head back to the start.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center gap-2 bg-cream px-5 py-2.5 text-eyebrow text-obsidian transition hover:bg-mint"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-cream/40 px-5 py-2.5 text-eyebrow text-cream transition hover:border-mint hover:text-mint"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Historias AI Studio — Cinematic AI Video Production House" },
      {
        name: "description",
        content:
          "Historias AI Studio produces cinematic, photorealistic commercials, product films, and brand stories — a unified live-action and generative AI pipeline for corporate brands.",
      },
      { name: "author", content: "Historias AI Studio" },
      { property: "og:title", content: "Historias AI Studio — Cinematic AI Video Production House" },
      {
        property: "og:description",
        content:
          "Historias AI Studio produces cinematic, photorealistic commercials, product films, and brand stories — a unified live-action and generative AI pipeline for corporate brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Historias AI Studio — Cinematic AI Video Production House" },
      { name: "twitter:description", content: "Historias AI Studio produces cinematic, photorealistic commercials, product films, and brand stories — a unified live-action and generative AI pipeline for corporate brands." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cb7d2556-74ef-4a64-bd32-77141d675302/id-preview-52f876e5--c8f2d406-2abf-4adc-88ab-97f82f196adb.lovable.app-1784125726788.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cb7d2556-74ef-4a64-bd32-77141d675302/id-preview-52f876e5--c8f2d406-2abf-4adc-88ab-97f82f196adb.lovable.app-1784125726788.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png?v=2", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
