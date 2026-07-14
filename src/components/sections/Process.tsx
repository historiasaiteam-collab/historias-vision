import { ArrowRight, Calendar, Clock, MapPin, Sliders } from "lucide-react";
import { PROCESS_STEPS } from "@/data/faq";
import { CtaButton } from "@/components/ui/CtaButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CornerMarkers } from "@/components/layout/CornerMarkers";

const CARDS = [
  { title: "Treatment", tag: "Untamed Drive" },
  { title: "Storyboard", tag: "Shot Frames" },
  { title: "Generative", tag: "Previs Quality" },
  { title: "Live Action", tag: "Active Production" },
  { title: "Edit", tag: "Assembly" },
  { title: "Master", tag: "16:9 · 4K" },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative isolate w-full overflow-hidden bg-cream text-obsidian"
    >
      {/* diagonal wash cream -> obsidian */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(112deg, #F8EEE3 0%, #F8EEE3 55%, #0f1413 66%, #050807 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-16 left-2 sm:left-4 lg:left-6"
      >
        <span className="section-number text-obsidian/20">05</span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 pb-24 sm:px-8 lg:px-14 lg:pt-28 lg:pb-28">
        <ScrollReveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-mint" />
            <span className="text-eyebrow text-obsidian/80">
              Process · #25FFC4
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <h2 className="text-h1 text-obsidian">
              From first thought
              <br />
              to <span className="italic-serif">final frame.</span>
            </h2>
            <p className="max-w-[440px] text-[0.98rem] leading-relaxed text-obsidian/80">
              One integrated workflow—creative direction, real production,
              generative technology, and post.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="mt-16">
          {/* Desktop horizontal */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-6">
              {PROCESS_STEPS.map((s, i) => (
                <div
                  key={s.number}
                  className={i >= 2 ? "text-cream" : "text-obsidian"}
                >
                  <div className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]">
                    <span
                      className={
                        i >= 2 ? "text-cream/70" : "text-obsidian/60"
                      }
                    >
                      {s.number}
                    </span>
                    <span className={i >= 2 ? "text-cream" : "text-obsidian"}>
                      {s.title}
                    </span>
                  </div>
                  <p
                    className={
                      "max-w-[220px] text-[13px] leading-relaxed " +
                      (i >= 2 ? "text-cream/80" : "text-obsidian/75")
                    }
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative mt-10 h-3">
              <span className="absolute inset-x-0 top-1/2 h-px bg-obsidian/25" />
              <span
                className="absolute inset-y-0 left-0 h-px mint-line"
                style={{ width: "48%", top: "50%" }}
              />
              {PROCESS_STEPS.map((_, i) => {
                const left = `${(i / (PROCESS_STEPS.length - 1)) * 100}%`;
                const active = i === 2;
                return (
                  <span
                    key={i}
                    className={
                      "absolute -translate-x-1/2 -translate-y-1/2 " +
                      (active
                        ? "top-1/2 h-4 w-4 rounded-full border-2 border-mint bg-obsidian shadow-[0_0_10px_rgba(37,255,196,0.6)]"
                        : "top-1/2 h-3 w-3 rounded-full border border-mint/60 bg-cream")
                    }
                    style={{ left }}
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
            {PROCESS_STEPS.map((s, i) => (
              <li key={s.number} className="relative pl-8">
                <span
                  className={
                    "absolute left-1.5 top-1 h-3 w-3 rounded-full " +
                    (i === 2
                      ? "border-2 border-mint bg-obsidian shadow-[0_0_10px_rgba(37,255,196,0.6)]"
                      : "border border-mint/60 bg-cream")
                  }
                />
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-obsidian/60">
                  {s.number} · {s.title}
                </div>
                <p className="mt-1 text-sm text-obsidian/80">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Layered production cards */}
        <div className="mt-14 hidden gap-3 lg:flex lg:overflow-x-auto lg:pb-4">
          {CARDS.map((c, i) => (
            <div
              key={c.title}
              className={
                "relative flex min-w-[190px] flex-col overflow-hidden rounded-md border border-edge/70 bg-graphite p-4 text-cream cut-corners" +
                (i === 3 ? " shadow-[0_0_0_1px_var(--color-mint)]" : "")
              }
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-cream/60">
                {c.title}
              </div>
              <div className="mt-2 text-sm font-medium text-cream">{c.tag}</div>
              <div className="mt-6 aspect-[4/3] w-full rounded-sm bg-obsidian/60" />
              <CornerMarkers color={i === 3 ? "mint" : "edge"} />
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-full border border-edge bg-obsidian px-6 py-4 text-cream">
            <Feature icon={<Sliders size={14} />} label="Flexible by Design" />
            <Divider />
            <Feature icon={<Clock size={14} />} label="Same-Day Content" />
            <Divider />
            <Feature icon={<Calendar size={14} />} label="3–7 Day Campaigns" />
            <Divider />
            <Feature icon={<MapPin size={14} />} label="Full-Scale Productions up to 30 Days" />
          </div>
          <CtaButton
            size="lg"
            variant="primary"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            icon={<ArrowRight size={16} />}
          >
            Start a Project
          </CtaButton>
        </div>

        <div className="mt-14 flex items-center gap-3 text-meta text-cream/60">
          <span>06 / Why Historias</span>
          <span className="h-px flex-1 bg-cream/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
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
