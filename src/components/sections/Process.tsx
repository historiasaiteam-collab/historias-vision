import { useRef } from "react";
import { ArrowRight, Calendar, Clock, Clapperboard, MapPin } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PROCESS_STEPS } from "@/data/faq";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import bts from "@/assets/about-bts.jpg";
import servicePost from "@/assets/service-post.jpg";
import serviceProduct from "@/assets/service-product.jpg";
import serviceCar from "@/assets/service-car.jpg";
import serviceHybrid from "@/assets/service-hybrid.jpg";

type CardKind = "text" | "sketch" | "image";
type CardDef = {
  label: string;
  kind: CardKind;
  image?: string;
  logline?: string;
  caption?: string;
  active?: boolean;
  footer?: { format?: string; audio?: string; deliverables?: string };
};

const CARDS: CardDef[] = [
  { label: "Treatment", kind: "text", logline: "UNTAMED DRIVE" },
  { label: "Storyboard", kind: "sketch" },
  { label: "Generative", kind: "image", image: serviceProduct, caption: "PREVIS QUALITY CONCEPT" },
  { label: "Live Action", kind: "image", image: bts, caption: "ACTIVE PRODUCTION STILL", active: true },
  { label: "Edit", kind: "image", image: servicePost },
  {
    label: "Master",
    kind: "image",
    image: serviceCar,
    footer: { format: "16:9 / 4K", audio: "5.1 MIX", deliverables: "FINAL MASTER" },
  },
];

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 30%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const lineWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative isolate w-full overflow-hidden bg-cream text-obsidian"
    >
      {/* Diagonal wash cream -> obsidian (matches reference split) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(112deg, #F8EEE3 0%, #F8EEE3 55%, #0f1413 66%, #050807 100%)",
        }}
      />

      {/* Giant outlined section number "05" */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-2 top-16 z-10 hidden select-none lg:block"
      >
        <span
          className="block font-semibold leading-none text-transparent"
          style={{
            fontSize: "220px",
            WebkitTextStroke: "1px rgba(10,10,10,0.22)",
          }}
        >
          05
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 pb-16 sm:px-8 lg:px-14 lg:pt-28 lg:pb-20">
        <ScrollReveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-mint" />
            <span className="text-eyebrow text-obsidian/80">
              Process · <span className="text-mint">#25FFC4</span>
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <h2 className="text-h1 text-obsidian">
              From first thought
              <br />
              to <span className="italic-serif">final frame.</span>
            </h2>
            <p className="max-w-[440px] pt-3 text-[0.98rem] leading-relaxed text-cream/90 lg:pt-6">
              One integrated workflow—creative direction, real production,
              generative technology, and post.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="mt-16" ref={timelineRef}>
          {/* Desktop */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-6">
              {PROCESS_STEPS.map((s, i) => {
                const dark = i >= 2;
                return (
                  <div key={s.number} className={dark ? "text-cream" : "text-obsidian"}>
                    <div className="mb-2 text-[13px] font-medium tracking-[0.14em]">
                      <span className={dark ? "text-cream/70" : "text-obsidian/60"}>
                        {s.number}
                      </span>{" "}
                      <span className="uppercase">{s.title}</span>
                    </div>
                    <p
                      className={
                        "max-w-[220px] text-[13px] leading-relaxed " +
                        (dark ? "text-cream/75" : "text-obsidian/75")
                      }
                    >
                      {s.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Line + concentric nodes */}
            <div className="relative mt-8 h-6">
              <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-obsidian/25" />
              <motion.span
                aria-hidden
                className="absolute left-0 h-px mint-line"
                style={{ width: lineWidth, top: "50%" }}
              />
              {PROCESS_STEPS.map((_, i) => {
                const left = `${(i / (PROCESS_STEPS.length - 1)) * 100}%`;
                const stepThreshold = i / (PROCESS_STEPS.length - 1);
                return (
                  <ProcessNode
                    key={i}
                    left={left}
                    threshold={stepThreshold}
                    progress={progress}
                    active={i === 3}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile vertical */}
          <ol className="relative flex flex-col gap-8 lg:hidden">
            <span
              aria-hidden
              className="absolute top-0 bottom-0 left-2 w-px bg-obsidian/25"
            />
            <motion.span
              aria-hidden
              className="absolute left-2 top-0 w-px mint-line"
              style={{ height: lineHeight }}
            />
            {PROCESS_STEPS.map((s, i) => {
              const stepThreshold = i / Math.max(PROCESS_STEPS.length - 1, 1);
              return (
                <li key={s.number} className="relative pl-8">
                  <ProcessNode
                    left="8px"
                    top="4px"
                    threshold={stepThreshold}
                    progress={progress}
                    mobile
                  />
                  <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-obsidian/60">
                    {s.number} · {s.title}
                  </div>
                  <p className="mt-1 text-sm text-obsidian/80">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Layered production cards */}
        <div className="mt-14 hidden lg:block">
          <div className="flex items-start -space-x-6">
            {CARDS.map((c, i) => (
              <div
                key={c.label}
                className="relative"
                style={{
                  zIndex: c.active ? 40 : 10 + i,
                  transform: c.active ? "translateY(-16px)" : "translateY(0)",
                }}
              >
                <ProductionCard card={c} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-full border border-cream/15 bg-obsidian px-6 py-4 text-cream">
            <Feature icon={<Clapperboard size={14} />} label="Flexible by Design" />
            <Divider />
            <Feature icon={<Clock size={14} />} label="Same-Day Content" />
            <Divider />
            <Feature icon={<Calendar size={14} />} label="3–7 Day Campaigns" />
            <Divider />
            <Feature icon={<MapPin size={14} />} label="Full-Scale Productions up to 30 Days" />
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-medium text-obsidian transition hover:bg-cream/90"
          >
            Start a Project
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </button>
        </div>

        {/* Caption */}
        <div className="mt-6 flex items-center gap-3 text-sm text-obsidian">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          <span>Every timeline is built around the brief.</span>
        </div>

        {/* Bottom marker */}
        <div className="mt-14 flex items-center gap-3 text-meta text-cream/60">
          <span className="tracking-[0.22em]">06 / WHY HISTORIAS</span>
          <span className="h-px flex-1 bg-cream/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </div>
      </div>
    </section>
  );
}

function ProductionCard({ card }: { card: CardDef }) {
  const w = "w-[220px]";
  const activeRing = card.active
    ? "shadow-[0_0_0_1px_var(--color-mint),0_20px_60px_-20px_rgba(0,0,0,0.6)]"
    : "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]";

  if (card.kind === "text") {
    return (
      <div
        className={`${w} overflow-hidden rounded-md border border-obsidian/15 bg-cream p-4 ${activeRing}`}
      >
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-obsidian/60">
          {card.label}
        </div>
        <div className="mt-2 text-[13px] font-semibold uppercase tracking-wide text-obsidian">
          {card.logline}
        </div>
        <div className="mt-3 space-y-1.5">
          <span className="block h-1 w-full rounded bg-obsidian/15" />
          <span className="block h-1 w-11/12 rounded bg-obsidian/15" />
          <span className="block h-1 w-10/12 rounded bg-obsidian/15" />
        </div>
        <div className="mt-4 flex gap-4">
          <div>
            <div className="text-[8px] font-medium uppercase tracking-[0.22em] text-obsidian/50">
              Logline
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-obsidian">
              Untamed Drive
            </div>
          </div>
          <div>
            <div className="text-[8px] font-medium uppercase tracking-[0.22em] text-obsidian/50">
              Mood
            </div>
            <div className="mt-1 space-y-1">
              <span className="block h-1 w-14 rounded bg-obsidian/15" />
              <span className="block h-1 w-12 rounded bg-obsidian/15" />
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <span className="block h-1 w-full rounded bg-obsidian/10" />
          <span className="block h-1 w-9/12 rounded bg-obsidian/10" />
        </div>
        <CardCornerMarkers tone="dark" />
      </div>
    );
  }

  if (card.kind === "sketch") {
    return (
      <div
        className={`${w} overflow-hidden rounded-md border border-obsidian/15 bg-cream p-3 ${activeRing}`}
      >
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-obsidian/60">
          {card.label}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="aspect-[4/3] rounded-[3px] border border-obsidian/40 bg-cream"
            >
              <svg viewBox="0 0 40 30" className="h-full w-full text-obsidian/60">
                <path
                  d="M2 22 L14 10 L22 18 L30 8 L38 20"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  fill="none"
                />
                <circle cx="30" cy="8" r="1.4" fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>
        <div className="mt-3 h-2 w-2/3 rounded bg-obsidian/10" />
        <CardCornerMarkers tone="dark" />
      </div>
    );
  }

  // image card
  const isMaster = !!card.footer;
  return (
    <div
      className={`${w} overflow-hidden rounded-md border border-cream/15 bg-graphite ${activeRing}`}
    >
      <div className="relative">
        <img
          src={card.image}
          alt={card.label}
          className={
            (isMaster ? "aspect-[4/3]" : "aspect-[4/3]") +
            " w-full object-cover"
          }
          loading="lazy"
        />
        <div className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-[0.22em] text-cream">
          {card.label}
        </div>
        {card.caption && (
          <div className="absolute left-3 bottom-3 text-[9px] font-medium uppercase tracking-[0.22em] text-cream/85">
            {card.caption}
          </div>
        )}
      </div>
      {isMaster && (
        <div className="grid grid-cols-3 gap-2 bg-obsidian p-3 text-cream">
          <FooterCell label="Format" value={card.footer!.format!} />
          <FooterCell label="Audio" value={card.footer!.audio!} />
          <FooterCell label="Deliverables" value={card.footer!.deliverables!} />
        </div>
      )}
      <CardCornerMarkers tone={card.active ? "mint" : "cream"} />
    </div>
  );
}

function FooterCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[8px] font-medium uppercase tracking-[0.22em] text-cream/50">
        {label}
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-cream">
        {value}
      </div>
    </div>
  );
}

function CardCornerMarkers({ tone }: { tone: "mint" | "cream" | "dark" }) {
  const color =
    tone === "mint"
      ? "border-mint"
      : tone === "cream"
        ? "border-cream/60"
        : "border-obsidian/50";
  return (
    <>
      <span aria-hidden className={`pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t ${color}`} />
      <span aria-hidden className={`pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t ${color}`} />
      <span aria-hidden className={`pointer-events-none absolute left-0 bottom-0 h-2 w-2 border-l border-b ${color}`} />
      <span aria-hidden className={`pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-r border-b ${color}`} />
    </>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-cream">
      <span className="text-cream/70">{icon}</span>
      {label}
    </span>
  );
}

function Divider() {
  return <span aria-hidden className="hidden h-4 w-px bg-cream/20 sm:block" />;
}

function ProcessNode({
  left,
  top = "50%",
  threshold,
  progress,
  mobile = false,
  active = false,
}: {
  left: string;
  top?: string;
  threshold: number;
  progress: ReturnType<typeof useSpring>;
  mobile?: boolean;
  active?: boolean;
}) {
  const scale = useTransform(progress, (v) => (v >= threshold - 0.02 ? 1.1 : 1));
  const bg = useTransform(progress, (v) =>
    v >= threshold - 0.02 ? "var(--color-mint)" : "var(--color-cream)",
  );
  const boxShadow = useTransform(progress, (v) =>
    v >= threshold - 0.02
      ? "0 0 14px rgba(37,255,196,0.75)"
      : "0 0 0 rgba(0,0,0,0)",
  );

  if (mobile) {
    return (
      <motion.span
        aria-hidden
        style={{ left, top, scale, backgroundColor: bg, boxShadow }}
        className="absolute h-3 w-3 -translate-x-1/2 rounded-full border-2 border-mint"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
    >
      {/* Outer ring — larger for active */}
      <span
        className={
          "block rounded-full border " +
          (active
            ? "h-8 w-8 border-mint/70"
            : "h-6 w-6 border-obsidian/25")
        }
      />
      {/* Middle ring */}
      <span
        className={
          "absolute inset-0 m-auto rounded-full border " +
          (active ? "h-5 w-5 border-mint/60" : "h-4 w-4 border-obsidian/30")
        }
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {/* Core dot */}
      <motion.span
        style={{ backgroundColor: bg, boxShadow, scale }}
        className={
          "absolute inset-0 m-auto rounded-full " +
          (active ? "h-2.5 w-2.5" : "h-2 w-2")
        }
      />
    </span>
  );
}
