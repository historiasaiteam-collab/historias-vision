import { Shield, Zap, Clock, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/forms/ContactForm";
import { CornerMarkers } from "@/components/layout/CornerMarkers";
import { Parallax } from "@/components/animations/Parallax";
import { Particles } from "@/components/animations/Particles";
import monolith from "@/assets/contact-monolith.jpg";
import logo from "@/assets/logo-h.png.asset.json";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate w-full overflow-hidden bg-obsidian-depth text-cream"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />
      <Parallax
        offset={-30}
        as="div"
        className="pointer-events-none absolute top-20 left-2 sm:left-4 lg:left-6"
      >
        <span className="section-number text-cream/15">09</span>
      </Parallax>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 pb-16 sm:px-8 lg:px-14 lg:pt-28 lg:pb-20">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-6 bg-mint" />
          <span className="text-eyebrow text-mint">Start a Project</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-h1 text-cream">
              Your next story <span className="italic-serif">starts here.</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-body">
              Tell us what you are building, launching, or imagining. We'll
              shape the right production approach around your brief.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          {/* Monumental H logo scene — layered depth, no WebGL */}
          <MonumentalScene />
        </div>

        {/* Bottom feature bar */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-full border border-edge bg-graphite/60 px-6 py-4">
          <FeatureItem icon={<Sparkles size={14} />} label="Corporate & Brand Projects" />
          <Divider />
          <FeatureItem icon={<Zap size={14} />} label="Live Action + AI" />
          <Divider />
          <FeatureItem icon={<Clock size={14} />} label="Flexible Timelines" />
          <Divider />
          <FeatureItem icon={<Shield size={14} />} label="Confidential Briefs Welcome" />
        </div>
      </div>
    </section>
  );
}

/**
 * Layered monumental scene composed entirely in CSS + framer-motion:
 *  - Obsidian environment (bg image + gradients)
 *  - Soft cream backlight (radial glow behind logo)
 *  - Architectural midground (blurred monolith image)
 *  - Official H logo in the foreground (untouched)
 *  - Human silhouette for scale
 *  - Baked ground reflection + atmospheric dust
 *  - Slow camera push-in (subtle scale) while in view
 */
function MonumentalScene() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative min-h-[420px] overflow-hidden rounded-md border border-edge cut-corners-lg shadow-depth hud-corners lg:min-h-[560px]"
      style={{ perspective: "1600px" }}
    >
      {/* Obsidian environment */}
      <div aria-hidden className="absolute inset-0 bg-obsidian" />

      {/* Architectural midground — the monolith image, blurred + darkened */}
      <motion.img
        src={monolith}
        alt=""
        aria-hidden
        width={1400}
        height={1400}
        loading="lazy"
        initial={reduce ? { opacity: 0.7 } : { scale: 1.08, opacity: 0.7 }}
        whileInView={reduce ? { opacity: 0.7 } : { scale: 1.14, opacity: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        style={{ filter: "blur(2px) brightness(0.6)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,7,0.55) 0%, rgba(5,8,7,0.25) 40%, rgba(5,8,7,0.85) 100%)",
        }}
      />

      {/* Soft cream backlight behind logo */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[46%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-cream) 22%, transparent) 0%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      {/* Atmospheric particles */}
      <Particles count={14} color="cream" />

      {/* Foreground: official H logo — untouched, slow push-in only */}
      <motion.img
        src={logo.url}
        alt=""
        aria-hidden
        width={520}
        height={520}
        loading="lazy"
        initial={reduce ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.94, y: 12 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[44%] w-[58%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.95)] motion-safe:[animation:float-slow_9s_ease-in-out_infinite]"
      />

      {/* Human silhouette for scale — pure SVG, sits at ground plane */}
      <svg
        aria-hidden
        viewBox="0 0 40 90"
        className="absolute bottom-[14%] left-[16%] h-[10%] w-auto opacity-70"
        preserveAspectRatio="xMidYEnd meet"
      >
        <path
          fill="#050807"
          d="M20 8c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6zm-4 4c-3 0-6 2-6 6v22c0 1.5 1 3 3 3h1v33c0 2 2 4 4 4s4-2 4-4V45h4v33c0 2 2 4 4 4s4-2 4-4V45h1c2 0 3-1.5 3-3V18c0-4-3-6-6-6H16z"
        />
      </svg>

      {/* Ground reflection band + hard ground line */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[26%] ground-reflection"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[26%] h-px bg-cream/10"
      />

      {/* Subtle metallic vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <CornerMarkers color="mint" />
    </div>
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
