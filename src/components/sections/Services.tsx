import { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import serviceCommercial from "@/assets/service-commercial.png.asset.json";
import serviceProduct from "@/assets/service-product.png.asset.json";
import serviceHybrid from "@/assets/service-hybrid.png.asset.json";
import servicePost from "@/assets/service-post.png.asset.json";
import serviceUgc from "@/assets/service-ugc.png.asset.json";
import serviceContent from "@/assets/service-content.png.asset.json";

const SERVICE_IMAGES: Record<string, string> = {
  commercial: serviceCommercial.url,
  product: serviceProduct.url,
  hybrid: serviceHybrid.url,
  post: servicePost.url,
  ugc: serviceUgc.url,
  content: serviceContent.url,
};
import { SERVICES } from "@/data/services";
import { CornerMarkers } from "@/components/layout/CornerMarkers";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

import { cn } from "@/lib/utils";

export function Services() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <section
      id="services"
      className="relative isolate w-full overflow-hidden bg-obsidian-depth text-cream"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />

      {/* HUD label right */}
      <div className="absolute top-24 right-6 hidden text-meta text-cream/50 lg:block">
        Active Service
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 pb-28 sm:px-8 lg:px-14 lg:pt-28 lg:pb-32">
        <div>
          <ScrollReveal className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-mint" />
            <span className="text-eyebrow text-mint">Services</span>
          </ScrollReveal>

          <h2 className="max-w-[900px] text-h1 text-cream">
            One studio. Every way to <span className="italic-serif">bring a story to life.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Service list */}
          <ScrollReveal as="div" delay={0.1}>
          <ul className="divide-y divide-edge/70 border-y border-edge/70">
            {SERVICES.map((s) => {
              const isActive = s.id === activeId;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setActiveId(s.id)}
                    className="group flex w-full items-center gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "relative flex-1 text-sm font-medium uppercase tracking-[0.14em] transition-colors sm:text-base",
                        isActive ? "text-cream" : "text-cream/60 group-hover:text-cream",
                      )}
                    >
                      {s.title}
                      {isActive ? (
                        <motion.span
                          layoutId="service-underline"
                          className="absolute -bottom-2 left-0 h-px w-full mint-line"
                        />
                      ) : null}
                    </span>
                    <span className="text-cream/50 transition group-hover:text-mint">
                      {isActive ? <ArrowRight size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          </ScrollReveal>

          {/* Right: image + active card */}
          <ScrollReveal as="div" delay={0.2} className="relative">
            <div className="hud-corners relative overflow-hidden rounded-md border border-edge cut-corners-lg">
              <img
                src={SERVICE_IMAGES[active.id] ?? serviceCommercial.url}
                alt={`Cinematic still — ${active.title}`}
                width={1400}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <CornerMarkers color="mint" />
            </div>

            {/* Floating active card */}
            <div className="relative mt-6 lg:mt-0 lg:absolute lg:-left-16 lg:top-1/2 lg:w-[320px] lg:-translate-y-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="relative bg-cream p-6 text-obsidian cut-corners-lg"
                >
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-obsidian/60">
                    <span>Service</span>
                  </div>
                  <h3 className="text-xl font-semibold uppercase leading-tight tracking-wide text-obsidian">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-obsidian/80">
                    {active.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {active.capabilities.map((c) => (
                      <li
                        key={c}
                        className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-obsidian"
                      >
                        <span className="h-px w-3 bg-mint" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-6 inline-flex items-center gap-2 border-b border-obsidian pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-obsidian transition hover:border-mint hover:text-mint"
                  >
                    Explore Our Services
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>

        {/* Inactive services collapse indicator (mobile helper) */}
        <div className="mt-16 flex items-center gap-3 text-meta text-cream/50">
          <span>Selected Work</span>
          <span className="h-px flex-1 bg-cream/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </div>
      </div>
    </section>
  );
}

// keep icon import in use (silences unused warning if refactored later)
void Minus;
