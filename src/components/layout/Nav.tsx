import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/nav";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-h.png.asset.json";

const IDS = NAV_ITEMS.map((n) => n.id).concat("contact");

export function Nav() {
  const scrolled = useScrolled(80);
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);
  useFocusTrap(menuRef, open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    // Defer to next tick so scroll-lock unlock has a chance to restore
    // body positioning before we scroll into view.
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded focus:bg-cream focus:px-3 focus:py-2 focus:text-obsidian"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "backdrop-blur-xl bg-obsidian/75 border-b border-edge/60"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("hero");
            }}
            className="flex items-center focus-visible:outline-none focus-visible:ring-mint rounded"
            aria-label="Historias AI Studio home"
          >
            <img
              src={logo.url}
              alt="Historias AI Studio"
              width={44}
              height={44}
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            />
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-10 lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative text-eyebrow transition-colors focus-visible:outline-none focus-visible:text-mint",
                  active === item.id ? "text-cream" : "text-cream/60 hover:text-cream",
                )}
              >
                {item.label}
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-mint"
                    aria-hidden
                  />
                ) : null}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden items-center gap-2 border border-cream/40 px-4 py-2 text-eyebrow text-cream transition hover:border-mint hover:text-mint sm:inline-flex focus-visible:outline-none focus-visible:ring-mint"
            >
              Start a Project
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-mint" />
            </button>
            <button
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center border border-edge text-cream lg:hidden focus-visible:outline-none focus-visible:ring-mint"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex h-full max-w-[1500px] flex-col px-6 pt-24 pb-10">
              <nav aria-label="Mobile" className="flex flex-col gap-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4 }}
                    onClick={() => scrollTo(item.id)}
                    className="text-left text-h1 font-medium text-cream focus-visible:outline-none focus-visible:text-mint"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex min-h-11 items-center justify-between border border-cream/40 px-5 py-4 text-eyebrow text-cream focus-visible:outline-none focus-visible:border-mint"
                >
                  Start a Project
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-mint" />
                </button>
                <span className="text-meta text-smoke">AI Video Production House</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
