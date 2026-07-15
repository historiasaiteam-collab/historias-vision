import { useState } from "react";
import { ArrowRight, Plus, Minus, Users, Cpu, Film, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WHY_REASONS } from "@/data/faq";
import { CtaButton } from "@/components/ui/CtaButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-h.png.asset.json";

export function Why() {
  const [openId, setOpenId] = useState(WHY_REASONS[0].number);

  return (
    <section
      id="why"
      className="relative isolate w-full overflow-hidden bg-obsidian-depth text-cream grain"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />

      {/* left mint wash */}
      <div
        aria-hidden
        className="absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(248,238,227,0.10) 0%, transparent 60%)",
        }}
      />


      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 pb-24 sm:px-8 lg:px-14 lg:pt-28 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr_1fr] lg:gap-10">
          {/* LEFT: headline */}
          <ScrollReveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-mint" />
              <span className="text-eyebrow text-mint">Why Historias</span>
            </div>
            <h2 className="text-h1 text-cream">
              Cinematic quality.
              <br />
              <span className="italic-serif">Built differently.</span>
            </h2>
            <p className="mt-8 max-w-[400px] text-body">
              Technology moves fast. Our standard stays the same: every frame
              must feel intentional, believable, and worth watching.
            </p>
          </ScrollReveal>

          {/* CENTER: monumental H logo */}
          <ScrollReveal delay={0.15} className="relative grid min-h-[380px] place-items-center">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 55%, rgba(248,238,227,0.10) 0%, transparent 55%)",
              }}
            />
            <img
              src={logo.url}
              alt="Historias H mark"
              width={520}
              height={520}
              loading="lazy"
              className="relative w-[70%] max-w-[420px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            />
          </ScrollReveal>

          {/* RIGHT: accordion */}
          <ScrollReveal delay={0.25} className="rounded-lg border border-edge bg-graphite/40 p-4 sm:p-6 cut-corners-lg">
            <ul className="divide-y divide-edge/70">
              {WHY_REASONS.map((r) => {
                const open = openId === r.number;
                const panelId = `why-panel-${r.number}`;
                const btnId = `why-btn-${r.number}`;
                return (
                  <li key={r.number}>
                    <button
                      id={btnId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? "" : r.number)}
                      className="flex w-full items-center gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-mint"
                    >
                      <span
                        className={cn(
                          "flex-1 text-sm font-medium uppercase tracking-[0.14em]",
                          open ? "text-cream" : "text-cream/70",
                        )}
                      >
                        {r.title}
                      </span>
                      {open ? (
                        <motion.span
                          layoutId="why-active-line"
                          className="h-px w-6 mint-line"
                          aria-hidden
                        />
                      ) : null}
                      <span aria-hidden className={open ? "text-mint" : "text-cream/60"}>
                        {open ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 pl-10 pr-2">
                            <div className="mb-3 h-px mint-line" />
                            <p className="max-w-[380px] text-[13px] leading-relaxed text-cream/80">
                              {r.body}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </div>

        {/* Bottom feature bar */}
        <ScrollReveal className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-full border border-edge bg-graphite/60 px-6 py-4">
            <FeatureItem icon={<Users size={14} />} label="Live-Action Crew" />
            <Divider />
            <FeatureItem icon={<Cpu size={14} />} label="AI-Native Pipeline" />
            <Divider />
            <FeatureItem icon={<Film size={14} />} label="Cinematic Post" />
            <Divider />
            <FeatureItem
              icon={<Sparkles size={14} />}
              label="Storytelling at the Core"
            />
          </div>
          <CtaButton
            variant="primary"
            size="lg"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            icon={<ArrowRight size={16} />}
          >
            Meet Historias
          </CtaButton>
        </ScrollReveal>

        <div className="mt-14 flex items-center gap-3 text-meta text-cream/60">
          <span>Client Stories</span>
          <span className="h-px flex-1 bg-cream/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-cream">
      <span className="text-mint">{icon}</span>
      {label}
    </span>
  );
}

function Divider() {
  return <span aria-hidden className="hidden h-4 w-px bg-cream/20 sm:block" />;
}
