import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Users, Cpu, Film, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/data/testimonials";
import { CtaButton } from "@/components/ui/CtaButton";
import { CornerMarkers } from "@/components/layout/CornerMarkers";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SplitText } from "@/components/animations/SplitText";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];
  const total = TESTIMONIALS.length;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only respond when this section is roughly in view.
      const section = document.getElementById("testimonials");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 100 || rect.top > window.innerHeight - 100) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <section
      id="testimonials"
      className="relative isolate w-full overflow-hidden bg-obsidian-depth text-cream"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 pb-24 sm:px-8 lg:px-14 lg:pt-28 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* LEFT header + testimonial */}
          <div>
            <ScrollReveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-6 bg-mint" />
                <span className="text-eyebrow text-mint">Client Stories</span>
              </div>
              <SplitText as="h2" className="text-h1 text-cream" stagger={0.07}>
                {"Trusted with "}
                <span className="italic-serif">ambitious stories.</span>
              </SplitText>
              <p className="mt-6 max-w-[520px] text-body">
                We collaborate with brands and institutions to turn complex ideas
                into films people remember.
              </p>
            </ScrollReveal>

            {/* Featured testimonial + image — perspective depth stack */}
            <div
              className="mt-10 grid gap-4 md:grid-cols-[1.05fr_1fr]"
              aria-live="polite"
              aria-atomic="true"
            >
              <div
                className="relative"
                style={{ perspective: "1400px" }}
              >
                {/* Next slide sits farther back */}
                <motion.div
                  key={`ghost-${active.id}`}
                  aria-hidden
                  initial={{ opacity: 0, z: -80, y: 14, scale: 0.94 }}
                  animate={{ opacity: 0.35, z: -80, y: 14, scale: 0.94 }}
                  transition={{ duration: 0.5 }}
                  className="pointer-events-none absolute inset-0 bg-cream/70 cut-corners-lg shadow-depth"
                  style={{ transformStyle: "preserve-3d" }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 20, rotateX: 8, z: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                    exit={{ opacity: 0, y: -12, rotateX: -6, z: -20 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60 || info.velocity.x < -400) go(1);
                      else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
                    }}
                    className="relative touch-pan-y bg-cream p-6 text-obsidian cut-corners-lg select-none sm:p-8 shadow-depth"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-mint">
                      <span className="h-px w-4 bg-mint" /> Client Testimonial
                    </div>
                    <p className="text-lg leading-relaxed text-obsidian sm:text-xl">
                      &ldquo;{active.quote}&rdquo;
                    </p>
                    <div className="mt-6 h-px w-10 mint-line" />
                    <div className="mt-4 text-sm font-semibold text-obsidian">
                      {active.client}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-obsidian/60">
                      {active.role}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="hud-corners relative overflow-hidden rounded-md border border-edge cut-corners-lg shadow-depth">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={`${active.client} — cinematic still`}
                    width={1400}
                    height={1000}
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full min-h-[260px] w-full object-cover"
                  />
                </AnimatePresence>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent"
                />
                <CornerMarkers color="mint" />
              </div>
            </div>

            {/* controls */}
            <div className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-edge text-cream transition hover:border-mint hover:text-mint"
                  aria-label="Previous"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => go(1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-edge text-cream transition hover:border-mint hover:text-mint"
                  aria-label="Next"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative h-px flex-1 bg-cream/15">
                  <motion.span
                    className="absolute inset-y-0 left-0 mint-line"
                    animate={{ width: `${((index + 1) / total) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
              <span className="text-meta text-cream/50 sm:justify-self-end">
                Drag to explore
              </span>
            </div>
          </div>

          {/* RIGHT client list */}
          <ScrollReveal as="div" delay={0.15}>
            <div className="mb-6 text-eyebrow text-mint">Selected Collaborations</div>
            <ul className="flex flex-col gap-3">
              {TESTIMONIALS.map((t, i) => {
                const active = i === index;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => setIndex(i)}
                      className={cn(
                        "group relative flex w-full items-center gap-4 border px-5 py-4 text-left transition cut-corners",
                        active
                          ? "border-mint bg-graphite/60 text-cream"
                          : "border-edge bg-transparent text-cream/70 hover:border-cream/40 hover:text-cream",
                      )}
                    >
                      <span className="flex-1 text-sm font-semibold uppercase tracking-[0.14em]">
                        {t.client}
                      </span>
                      <span
                        className={cn(
                          "h-px w-6 transition",
                          active ? "bg-mint" : "bg-cream/30",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </div>

        {/* Bottom feature bar */}
        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-full border border-edge bg-graphite/60 px-6 py-4">
            <FeatureItem icon={<Users size={14} />} label="Built for Corporate Brands" />
            <Divider />
            <FeatureItem icon={<Cpu size={14} />} label="Live-Action + AI" />
            <Divider />
            <FeatureItem icon={<Film size={14} />} label="End-to-End Production" />
            <Divider />
            <FeatureItem icon={<Zap size={14} />} label="Fast, Flexible Delivery" />
          </div>
          <CtaButton
            variant="primary"
            size="lg"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            dot
          >
            Work With Us
          </CtaButton>
        </div>

        <div className="mt-14 flex items-center gap-3 text-meta text-cream/60">
          <span>FAQ</span>
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
