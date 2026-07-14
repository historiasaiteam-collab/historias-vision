import { useState, useMemo } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS, FILTERS, type ProjectCategory } from "@/data/demo-projects";
import { CornerMarkers } from "@/components/layout/CornerMarkers";
import { cn } from "@/lib/utils";

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
  const others = PROJECTS.filter((p) => p.id !== featured.id);

  const visible = useMemo(
    () => (filter === "All" ? others : others.filter((p) => p.category === filter)),
    [filter, others],
  );

  return (
    <section
      id="work"
      className="relative isolate w-full overflow-hidden bg-obsidian-depth text-cream"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 left-2 sm:left-4 lg:left-6"
      >
        <span className="section-number text-cream/15">04</span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 pb-24 sm:px-8 lg:px-14 lg:pt-28 lg:pb-32">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-14">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-mint" />
              <span className="text-eyebrow text-mint">Selected Work</span>
            </div>
            <h2 className="text-h1 text-cream">
              Stories worth
              <br />
              <span className="italic-serif">stopping for.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <p className="max-w-[380px] text-body md:text-right">
              A selection of commercial films, digital campaigns, social
              content, and AI-native stories.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 border-b border-cream/30 pb-1 text-sm font-medium text-cream transition hover:border-mint hover:text-mint"
            >
              View All Work
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-full border border-edge/70 bg-graphite/40 px-4 py-3">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative text-eyebrow transition-colors",
                  active ? "text-mint" : "text-cream/60 hover:text-cream",
                )}
              >
                {f.toUpperCase()}
                {active ? (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute -bottom-2 left-0 h-0.5 w-full mint-line"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.55fr_auto_1fr]">
          {/* Featured */}
          <FeaturedCard project={featured} />

          {/* Divider column */}
          <div className="hidden flex-col items-center justify-between py-4 lg:flex">
            <div className="text-center text-meta text-cream/60">
              Featured
              <br />
              Project
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="h-24 w-px bg-cream/20" />
              <ArrowRight size={14} className="rotate-90 text-mint" />
              <span className="text-meta text-cream/60">
                Scroll to
                <br />
                Explore
                <br />
                More
              </span>
            </div>
          </div>

          {/* Two stacked */}
          <div className="flex flex-col gap-6">
            {visible.slice(0, 2).map((p) => (
              <SmallCard key={p.id} project={p} />
            ))}
            {visible.length === 0 ? (
              <div className="grid place-items-center border border-dashed border-edge p-10 text-meta text-cream/50">
                No projects in this category yet.
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-16 flex items-center gap-3 text-meta text-cream/50">
          <span>05 / Process</span>
          <span className="h-px flex-1 bg-cream/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <article className="relative overflow-hidden rounded-md border border-edge/80 cut-corners-lg">
      <div className="hud-corners relative aspect-[16/10] w-full overflow-hidden bg-graphite">
        <img
          src={project.image}
          alt={`${project.brand} — ${project.title}`}
          width={1400}
          height={1000}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent"
        />
        <button
          aria-label={`Play ${project.brand} — ${project.title}`}
          className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/60 bg-obsidian/40 backdrop-blur-md transition hover:border-mint hover:text-mint"
        >
          <Play size={22} className="ml-1 text-cream" />
        </button>
        <CornerMarkers color="mint" />

        <div className="absolute right-6 bottom-6 flex items-center gap-2 text-meta text-cream/80">
          Youtube / Watch Film
          <Play size={12} className="text-mint" />
        </div>

        <div className="absolute bottom-6 left-6 max-w-[70%]">
          <h3 className="text-3xl font-semibold uppercase leading-none tracking-tight text-cream sm:text-4xl">
            {project.brand}
          </h3>
          <div className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-cream/80">
            {project.title}
          </div>
          <div className="mt-1 text-meta text-cream/60">
            {project.type} · {project.year}
          </div>
        </div>
      </div>
    </article>
  );
}

function SmallCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <article className="group relative overflow-hidden rounded-md border border-edge/80 cut-corners">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite">
        <img
          src={project.image}
          alt={`${project.brand} — ${project.title}`}
          width={1200}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent"
        />
        <button
          aria-label={`Play ${project.brand}`}
          className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full border border-cream/60 bg-obsidian/50 backdrop-blur-md transition hover:border-mint"
        >
          <Play size={14} className="ml-0.5 text-cream" />
        </button>
        <div className="absolute bottom-4 left-4 max-w-[70%]">
          <h4 className="text-lg font-semibold uppercase leading-none tracking-tight text-cream">
            {project.brand}
          </h4>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-cream/80">
            {project.title}
          </div>
          <div className="mt-1 text-meta text-cream/60">
            {project.type} · {project.year}
          </div>
        </div>
      </div>
    </article>
  );
}
