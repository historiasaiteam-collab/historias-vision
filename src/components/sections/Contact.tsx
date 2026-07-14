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
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 left-2 sm:left-4 lg:left-6"
      >
        <span className="section-number text-cream/15">09</span>
      </div>

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
