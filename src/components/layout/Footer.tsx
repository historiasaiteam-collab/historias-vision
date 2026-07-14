import { ArrowUp, Instagram, Youtube, Linkedin, type LucideIcon } from "lucide-react";
import { FOOTER_NAV, SOCIAL_LINKS, LEGAL_LINKS } from "@/data/nav";
import logo from "@/assets/logo-h.png.asset.json";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  Instagram,
  YouTube: Youtube,
  LinkedIn: Linkedin,
};

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-edge/60 bg-obsidian-depth text-cream">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-14">
        <div className="grid gap-10 py-14 md:grid-cols-[auto_1fr_auto] md:items-center">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              backToTop();
            }}
            aria-label="Historias AI Studio — back to top"
            className="justify-self-start focus-visible:outline-none focus-visible:ring-mint rounded"
          >
            <img
              src={logo.url}
              alt="Historias AI Studio"
              width={56}
              height={56}
              className="h-12 w-12 object-contain md:h-14 md:w-14"
              loading="lazy"
            />
          </a>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-7 gap-y-3 md:justify-center">
            {FOOTER_NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="min-h-11 text-eyebrow text-cream/70 transition hover:text-mint focus-visible:outline-none focus-visible:text-mint"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-3 md:justify-end" aria-label="Social channels">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              const enabled = Boolean(s.href);
              const inner = (
                <>
                  {Icon ? <Icon size={16} aria-hidden /> : null}
                  <span className="sr-only sm:not-sr-only">{s.label}</span>
                  {!enabled ? (
                    <span className="sr-only"> (coming soon)</span>
                  ) : null}
                </>
              );
              return (
                <li key={s.label}>
                  {enabled ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-11 items-center gap-2 rounded border border-edge px-3 py-2 text-eyebrow text-cream/70 transition hover:border-mint hover:text-mint focus-visible:outline-none focus-visible:border-mint"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      title="Coming soon"
                      className={cn(
                        "inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded border border-edge/50 px-3 py-2 text-eyebrow text-cream/40",
                      )}
                    >
                      {inner}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4 border-t border-edge/60 py-6 text-meta text-smoke md:flex-row md:items-center md:justify-between">
          <span>AI Video Production House</span>
          <span className="order-last md:order-none">
            © 2026 Historias AI Studio
          </span>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((l) =>
              l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  className="transition hover:text-cream"
                >
                  {l.label}
                </a>
              ) : (
                <span
                  key={l.label}
                  aria-disabled="true"
                  title="Coming soon"
                  className="opacity-60"
                >
                  {l.label}
                </span>
              ),
            )}
            <button
              onClick={backToTop}
              className="inline-flex min-h-11 items-center gap-2 transition hover:text-mint focus-visible:outline-none focus-visible:text-mint"
              aria-label="Back to top"
            >
              <ArrowUp size={12} aria-hidden />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
