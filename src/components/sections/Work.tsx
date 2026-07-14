import { useState, useMemo } from "react";
import { ArrowRight, ArrowDown, Play } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { PROJECTS, FILTERS, type Project, type ProjectCategory } from "@/data/demo-projects";
import { DEMO_VIDEOS } from "@/data/videos";
import { VideoModal } from "@/components/ui/VideoModal";
import { CornerMarkers } from "@/components/layout/CornerMarkers";
import { HudFrame } from "@/components/layout/HudFrame";
import { cn } from "@/lib/utils";

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);

  const visibleAll = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  const featured = visibleAll.find((p) => p.featured) ?? visibleAll[0] ?? null;
  const others = featured ? visibleAll.filter((p) => p.id !== featured.id) : [];

  const openVideo = (p: Project) => setActiveVideo(p);
  const closeVideo = () => setActiveVideo(null);

  const filterIndex = Math.max(0, FILTERS.indexOf(filter));
  const progressPct = ((filterIndex + 1) / FILTERS.length) * 100;

  // Force AnimatePresence to remount cards when the filter changes so the
  // full entrance animation (staggered brackets + image reveal) plays again.
  const gridKey = filter;

  return (
    <section
      id="work"
      className="relative isolate w-full overflow-hidden bg-obsidian-depth text-cream"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />


      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 pb-20 sm:px-8 lg:px-16 lg:pt-28 lg:pb-24">
        {/* Header */}
        <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-12">
          <div className="md:pl-24 lg:pl-32">
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
          <div className="hidden md:block" />
          <div className="flex flex-col gap-6 md:items-end">
            <p className="max-w-[320px] text-body md:text-right">
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
        <div
          role="tablist"
          aria-label="Filter projects"
          className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-full border border-edge/70 bg-graphite/40 px-5 py-3 sm:gap-x-6"
        >
          {FILTERS.map((f, i) => {
            const isActive = f === filter;
            return (
              <div key={f} className="flex items-center gap-x-4 sm:gap-x-6">
                <button
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative min-h-11 text-eyebrow transition-colors focus-visible:outline-none focus-visible:text-mint",
                    isActive ? "text-mint" : "text-cream/60 hover:text-cream",
                  )}
                >
                  {f.toUpperCase()}
                  {isActive ? (
                    <motion.span
                      layoutId="work-filter"
                      className="absolute -bottom-2 left-0 h-0.5 w-full mint-line"
                      aria-hidden
                    />
                  ) : null}
                </button>
                {i < FILTERS.length - 1 ? (
                  <span aria-hidden className="h-3 w-px bg-cream/15" />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* HUD-framed grid */}
        <div className="relative mt-8 p-4 sm:p-6">
          <CornerMarkers className="!inset-0" color="cream" />

          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 translate-x-2 rotate-90 origin-center text-meta text-cream/40 lg:block"
          >
            PROJECT
          </div>

          <LayoutGroup>
            <AnimatePresence mode="wait">
              <motion.div
                key={gridKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5 lg:grid-cols-[1.55fr_auto_1fr]"
              >
                {featured ? (
                  <FeaturedCard project={featured} onPlay={() => openVideo(featured)} />
                ) : (
                  <div className="grid min-h-[320px] place-items-center border border-dashed border-edge p-10 text-meta text-cream/50">
                    No projects in this category yet.
                  </div>
                )}

                <div className="hidden lg:block">
                  <FeaturedPill />
                </div>

                <div className="flex flex-col gap-5">
                  {others.slice(0, 2).map((p, i) => (
                    <SmallCard
                      key={p.id}
                      project={p}
                      onPlay={() => openVideo(p)}
                      delay={0.2 + i * 0.12}
                    />
                  ))}
                  {others.length === 0 && featured ? (
                    <div className="grid place-items-center border border-dashed border-edge p-10 text-meta text-cream/50">
                      More projects in this category coming soon.
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
        </div>

        {/* Bottom timeline */}
        <div className="mt-10 flex items-center gap-6">
          <span className="whitespace-nowrap text-meta text-cream/50">Process</span>
          <div className="relative h-px flex-1">
            <div className="absolute inset-0 bg-cream/15" />
            <motion.div
              className="absolute inset-y-0 left-0 mint-line"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-between">
              {FILTERS.map((f, i) => (
                <motion.span
                  key={f}
                  aria-hidden
                  animate={{
                    scale: i === filterIndex ? 1.6 : 1,
                    backgroundColor:
                      i <= filterIndex ? "var(--color-mint)" : "transparent",
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full border",
                    i <= filterIndex ? "border-mint" : "border-cream/30",
                  )}
                />
              ))}
            </div>
          </div>
          <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_var(--color-mint)]" />
        </div>
      </div>

      <VideoModal
        open={activeVideo !== null}
        onClose={closeVideo}
        title={activeVideo ? `${activeVideo.brand} — ${activeVideo.title}` : ""}
        subtitle={activeVideo ? `${activeVideo.type} · ${activeVideo.year}` : undefined}
        poster={activeVideo?.image}
        source={
          activeVideo
            ? DEMO_VIDEOS[activeVideo.id] ?? { provider: "demo" }
            : { provider: "demo" }
        }
      />
    </section>
  );
}

function FeaturedPill() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.85 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      style={{ transformOrigin: "center" }}
      className="relative flex h-full min-h-[420px] w-[92px] flex-col items-center justify-between rounded-full bg-cream px-3 py-6 text-obsidian shadow-depth"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="h-px w-6 bg-mint" />
        <div className="text-center text-[10px] font-medium uppercase leading-tight tracking-[0.22em] text-obsidian/70">
          Featured
          <br />
          Project
        </div>
      </div>
      <div aria-hidden className="my-4 h-full w-px flex-1 bg-obsidian/10" />
      <div className="flex flex-col items-center gap-3 pb-2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-mint" />
        </motion.div>
        <div className="text-center text-[10px] font-medium uppercase leading-tight tracking-[0.22em] text-obsidian/70">
          Scroll to
          <br />
          Explore
          <br />
          More
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedCard({ project, onPlay }: { project: Project; onPlay: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* HUD chamfered frame with mint corner brackets */}
      <HudFrame color="mint" padding={6} bracketSize={16} radius={14} notch={10} />

      <div
        className="hud-clip-lg relative aspect-[16/10] w-full overflow-hidden bg-graphite shadow-depth"
      >
        <motion.img
          src={project.image}
          alt={`${project.brand} — ${project.title}`}
          width={1400}
          height={1000}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent"
        />

        {/* Faint HUD crosshair */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent calc(50% - 0.5px), color-mix(in oklab, var(--color-mint) 30%, transparent) 50%, transparent calc(50% + 0.5px)), linear-gradient(to bottom, transparent calc(50% - 0.5px), color-mix(in oklab, var(--color-mint) 30%, transparent) 50%, transparent calc(50% + 0.5px))",
          }}
        />

        <motion.button
          onClick={onPlay}
          aria-label={`Play ${project.brand} — ${project.title}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/60 bg-obsidian/40 backdrop-blur-md transition hover:border-mint hover:text-mint focus-visible:outline-none focus-visible:ring-mint"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-mint/60 animate-ping opacity-40"
          />
          <Play size={22} className="ml-1 text-cream" />
        </motion.button>

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
          <div className="max-w-[70%]">
            <h3 className="text-3xl font-semibold uppercase leading-none tracking-tight text-cream sm:text-5xl">
              {project.brand}
            </h3>
            <motion.div
              className="mt-3 h-px w-24 mint-line origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              aria-hidden
            />
            <div className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-cream/85">
              {project.title}
            </div>
            <div className="mt-1 text-meta text-cream/60">
              {project.type} · {project.year}
            </div>
          </div>
          <div className="flex items-center gap-2 text-meta text-cream/80">
            YouTube / Watch Film
            <Play size={12} className="text-mint" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SmallCard({
  project,
  onPlay,
  delay = 0,
}: {
  project: Project;
  onPlay: () => void;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className="group relative"
    >
      <HudFrame color="mint" padding={5} bracketSize={22} radius={16} notch={12} delay={delay} />

      <div className="hud-clip relative aspect-[16/9] w-full overflow-hidden bg-graphite shadow-depth">
        <motion.img
          src={project.image}
          alt={`${project.brand} — ${project.title}`}
          width={1200}
          height={700}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + 0.1 }}
          whileHover={{ scale: 1.05 }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent"
        />
        <motion.button
          onClick={onPlay}
          aria-label={`Play ${project.brand} — ${project.title}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/60 bg-obsidian/50 backdrop-blur-md transition hover:border-mint focus-visible:outline-none focus-visible:ring-mint"
        >
          <Play size={14} className="ml-0.5 text-cream" />
        </motion.button>
        <div className="absolute bottom-4 left-4 right-20 max-w-[75%]">
          <h4 className="text-lg font-semibold uppercase leading-none tracking-tight text-cream sm:text-xl">
            {project.brand}
          </h4>
          <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-cream/85">
            {project.title}
          </div>
          <div className="mt-1 text-meta text-cream/60">
            {project.type} · {project.year}
          </div>
        </div>
        <div className="absolute bottom-3 right-14 text-[10px] uppercase tracking-[0.16em] text-cream/70">
          YouTube / Watch Film
        </div>
      </div>
    </motion.article>
  );
}
