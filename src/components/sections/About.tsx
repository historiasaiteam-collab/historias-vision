import { ArrowRight } from "lucide-react";
import bts from "@/assets/about-bts.jpg";
import vertical from "@/assets/about-vertical.jpg";
import { CornerMarkers } from "@/components/layout/CornerMarkers";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function About() {
  return (
    <section
      id="about"
      className="relative isolate w-full overflow-hidden bg-obsidian"
    >
      {/* Split background: cream left, obsidian right */}
      <div
        aria-hidden
        className="absolute inset-0 grid grid-cols-1 lg:grid-cols-[55%_45%]"
      >
        <div className="bg-cream" />
        <div className="bg-obsidian-depth" />
      </div>


      {/* Giant outlined section number */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-24 z-10 hidden select-none lg:block"
      >
        <span
          className="block font-semibold leading-none text-transparent"
          style={{
            fontSize: "220px",
            WebkitTextStroke: "1px rgba(10,10,10,0.18)",
          }}
        >
          02
        </span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-16 px-6 pt-28 pb-24 sm:px-8 lg:grid-cols-[55%_45%] lg:gap-10 lg:px-14 lg:pt-32 lg:pb-32">
        {/* LEFT (cream) */}
        <ScrollReveal className="text-obsidian">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-mint" />
            <span className="text-eyebrow text-mint">About Historias</span>
          </div>
          <h2 className="text-h1 text-obsidian">
            We direct technology.
            <br />
            We don't let it
            <br />
            direct the <span className="italic-serif">story.</span>
          </h2>

          <p className="mt-8 max-w-[520px] text-[0.98rem] leading-relaxed text-obsidian/80">
            Historias AI Studio brings together creative direction, live-action
            production, and generative technology to create cinematic work that
            feels real, original, and unmistakably human.
          </p>

          <p className="mt-6 max-w-[520px] font-medium text-obsidian">
            Built for corporate brands that refuse to look ordinary.
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-start gap-x-8 gap-y-6 border-t border-obsidian/15 pt-8">
            <Stat label="Crafting stories" value="6 Years" />
            <Divider />
            <Stat label="One production pipeline" value="Live + AI" />
            <Divider />
            <Stat label="Built around the brief" value="Same Day—30 Days" />
          </div>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-10 inline-flex items-center gap-3 border-b border-obsidian/30 pb-1 text-sm font-medium text-obsidian transition hover:border-mint hover:text-mint"
          >
            Discover Our Studio
            <ArrowRight size={16} />
          </a>
        </ScrollReveal>

        {/* RIGHT (obsidian, layered images) */}
        <div className="relative min-h-[420px] lg:min-h-[620px]">
          <ScrollReveal className="relative h-full">
            {/* Outer device-style frame */}
            <div className="relative w-full max-w-[600px] rounded-2xl border border-cream/15 bg-cream/[0.03] p-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
              <div className="hud-corners relative aspect-square w-full overflow-hidden rounded-lg border border-edge/70 cut-corners">
                <img
                  src={bts}
                  alt="Historias production crew on set"
                  width={1200}
                  height={1200}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                {/* mint connector line */}
                <span
                  aria-hidden
                  className="absolute -right-6 top-1/2 hidden h-px w-24 mint-line lg:block"
                />
              </div>
            </div>

            {/* overlapping vertical frame */}
            <div className="absolute -right-2 -bottom-16 w-[42%] max-w-[240px] sm:-bottom-20 lg:-right-8 lg:-bottom-24 lg:w-[42%] lg:max-w-[300px]">
              <div className="relative rounded-2xl border border-cream/15 bg-cream/[0.03] p-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
                <div className="relative overflow-hidden rounded-lg border border-mint/40 cut-corners">
                  <img
                    src={vertical}
                    alt="Cinematic still — futuristic neon corridor"
                    width={720}
                    height={1280}
                    loading="lazy"
                    className="h-auto w-full object-cover"
                  />
                  <CornerMarkers color="mint" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom marker */}
      <div className="relative z-10 mx-auto flex max-w-[1500px] items-center gap-3 px-6 pb-6 text-meta text-cream/60 sm:px-8 lg:px-14">
        <span className="tracking-[0.22em]">03 / SERVICES</span>
        <span className="h-px flex-1 bg-cream/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-lg font-semibold uppercase tracking-wide text-obsidian">
        {value}
      </div>
      <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-obsidian/60">
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return <span aria-hidden className="mt-1 hidden h-8 w-px bg-obsidian/25 sm:block" />;
}
