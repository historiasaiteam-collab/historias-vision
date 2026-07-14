import { ArrowUp } from "lucide-react";
import { FOOTER_NAV, SOCIAL_LINKS, LEGAL_LINKS } from "@/data/nav";
import logo from "@/assets/logo-h.png.asset.json";

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const backToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

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
            aria-label="Historias AI Studio home"
            className="justify-self-start"
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

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 md:justify-center">
            {FOOTER_NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-eyebrow text-cream/70 transition hover:text-mint"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:justify-end">
            {SOCIAL_LINKS.map((s) =>
              s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-eyebrow text-cream/70 transition hover:text-mint"
                >
                  {s.label}
                </a>
              ) : (
                <span key={s.label} className="text-eyebrow text-cream/40">
                  {s.label}
                </span>
              ),
            )}
          </div>
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
                <span key={l.label} className="opacity-60">
                  {l.label}
                </span>
              ),
            )}
            <button
              onClick={backToTop}
              className="inline-flex items-center gap-2 transition hover:text-mint"
              aria-label="Back to top"
            >
              <ArrowUp size={12} />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
