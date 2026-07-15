import { useRef, useState } from "react";
import { ArrowRight, Calendar, Clock, Clapperboard, MapPin } from "lucide-react";
import { animate, motion, useMotionValue, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { PROCESS_STEPS } from "@/data/faq";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import step01 from "@/assets/process-01-discover.jpg";
import step02 from "@/assets/process-02-concept.jpg";
import step03 from "@/assets/process-03-production.jpg";
import step04 from "@/assets/process-04-post.jpg";
import step05 from "@/assets/process-05-delivery.jpg";

const STEP_IMAGES = [
  { src: step01, caption: "ALIGNMENT · BRIEF & OBJECTIVE" },
  { src: step02, caption: "TREATMENT · REFERENCES & PLAN" },
  { src: step03, caption: "ACTIVE PRODUCTION STILL" },
  { src: step04, caption: "EDIT · COLOR · SOUND" },
  { src: step05, caption: "MULTI-FORMAT MASTERS" },
];

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 30%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const [activeStep, setActiveStep] = useState(0);
  const clickProgress = useMotionValue(0);
  const combined = useTransform([progress, clickProgress] as MotionValue<number>[], (values) => {
    const [p, c] = values as number[];
    return Math.max(p, c);
  });
  const lineWidth = useTransform(combined, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(combined, [0, 1], ["0%", "100%"]);

  const selectStep = (i: number) => {
    setActiveStep(i);
    const target = i / Math.max(PROCESS_STEPS.length - 1, 1);
    animate(clickProgress, target, {
      duration: 0.9 + Math.abs(target - clickProgress.get()) * 0.6,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  return (
    <section
      id="process"
      className="relative isolate w-full overflow-hidden bg-cream text-obsidian"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #F8EEE3 0%, #F8EEE3 62%, #0f1413 78%, #050807 100%)",
        }}
      />


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
            <p className="max-w-[440px] pt-3 text-[0.98rem] leading-relaxed text-obsidian/80 lg:pt-6">
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
                const isActive = i === activeStep;
                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => selectStep(i)}
                    className={
                      "group text-left transition " +
                      (isActive ? "text-obsidian" : "text-obsidian hover:opacity-90")
                    }
                  >
                    <div className="mb-2 text-[13px] font-medium tracking-[0.14em]">
                      <span className="uppercase">{s.title}</span>
                    </div>
                    <p className="max-w-[220px] text-[13px] leading-relaxed text-obsidian/75">
                      {s.body}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-8 h-6">
              <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-obsidian/25" />
              <motion.span
                aria-hidden
                className="absolute left-0 h-px mint-line"
                style={{ width: lineWidth, top: "50%" }}
              />
              {PROCESS_STEPS.map((s, i) => {
                const left = `${(i / (PROCESS_STEPS.length - 1)) * 100}%`;
                const stepThreshold = i / (PROCESS_STEPS.length - 1);
                return (
                  <ProcessNode
                    key={i}
                    left={left}
                    threshold={stepThreshold}
                    progress={combined}
                    active={i === activeStep}
                    onClick={() => selectStep(i)}
                    label={s.title}
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
              const isActive = i === activeStep;
              return (
                <li key={s.number} className="relative pl-8">
                  <button
                    type="button"
                    onClick={() => selectStep(i)}
                    className="block text-left"
                  >
                    <ProcessNode
                      left="8px"
                      top="4px"
                      threshold={stepThreshold}
                      progress={combined}
                      mobile
                      active={isActive}
                      label={s.title}
                    />
                    <div
                      className={
                        "text-[11px] font-medium uppercase tracking-[0.22em] " +
                        (isActive ? "text-mint" : "text-obsidian/60")
                      }
                    >
                      {s.title}
                    </div>
                    <p className="mt-1 text-sm text-obsidian/80">{s.body}</p>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Active step image */}
        <div className="mt-14">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mx-auto max-w-[960px] overflow-hidden rounded-md border border-cream/15 bg-graphite shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            <img
              src={STEP_IMAGES[activeStep].src}
              alt={`${PROCESS_STEPS[activeStep].number} — ${PROCESS_STEPS[activeStep].title}`}
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="absolute left-4 top-4 text-[10px] font-medium uppercase tracking-[0.22em] text-cream">
              {PROCESS_STEPS[activeStep].title}
            </div>
            <div className="absolute left-4 bottom-4 text-[9px] font-medium uppercase tracking-[0.22em] text-cream/85">
              {STEP_IMAGES[activeStep].caption}
            </div>
            <CardCornerMarkers tone="mint" />
          </motion.div>

          {/* Thumbnail strip */}
          <div className="mt-6 grid grid-cols-5 gap-3">
            {STEP_IMAGES.map((img, i) => {
              const isActive = i === activeStep;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectStep(i)}
                  aria-label={`Show ${PROCESS_STEPS[i].number} ${PROCESS_STEPS[i].title}`}
                  className={
                    "group relative overflow-hidden rounded-sm border transition " +
                    (isActive
                      ? "border-mint shadow-[0_0_0_1px_var(--color-mint)]"
                      : "border-cream/20 hover:border-cream/50")
                  }
                >
                  <img
                    src={img.src}
                    alt=""
                    className={
                      "aspect-[16/10] w-full object-cover transition " +
                      (isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")
                    }
                    loading="lazy"
                  />
                  <span className="absolute left-1.5 top-1.5 text-[9px] font-medium tracking-[0.2em] text-cream">
                    {PROCESS_STEPS[i].number}
                  </span>
                </button>
              );
            })}
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

        <div className="mt-6 flex items-center gap-3 text-sm text-obsidian">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          <span>Every timeline is built around the brief.</span>
        </div>

        <div className="mt-14 flex items-center gap-3 text-meta text-cream/60">
          <span className="tracking-[0.22em]">WHY HISTORIAS</span>
          <span className="h-px flex-1 bg-cream/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </div>
      </div>
    </section>
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
  onClick,
  label,
}: {
  left: string;
  top?: string;
  threshold: number;
  progress: MotionValue<number>;
  mobile?: boolean;
  active?: boolean;
  onClick?: () => void;
  label?: string;
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

  const node = (
    <span
      aria-hidden
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: "50%", top: "50%" }}
    >
      <span
        className={
          "block rounded-full border " +
          (active ? "h-8 w-8 border-mint/70" : "h-6 w-6 border-obsidian/25")
        }
      />
      <span
        className={
          "absolute inset-0 m-auto rounded-full border " +
          (active ? "h-5 w-5 border-mint/60" : "h-4 w-4 border-obsidian/30")
        }
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <motion.span
        style={{ backgroundColor: bg, boxShadow, scale }}
        className={
          "absolute inset-0 m-auto rounded-full " +
          (active ? "h-2.5 w-2.5" : "h-2 w-2")
        }
      />
    </span>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ left, top }}
    >
      {node}
    </button>
  );
}
