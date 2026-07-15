import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero.jpg";
import { CtaButton } from "@/components/ui/CtaButton";
import { Parallax } from "@/components/animations/Parallax";
import { Particles } from "@/components/animations/Particles";
import { LogoMarquee } from "@/components/animations/LogoMarquee";
import { SkyBackground } from "@/components/animations/SkyBackground";
import { SplitText } from "@/components/animations/SplitText";



export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen w-full overflow-hidden bg-obsidian text-cream"
    >
      {/* Background image — slower parallax than foreground */}
      <Parallax offset={-30} className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          aria-hidden
          width={1920}
          height={1280}
          className="h-full w-full object-cover object-center opacity-90"
        />
      </Parallax>
      {/* 3D sky layer */}
      <SkyBackground />

      {/* Left dark overlay + subtle wash */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,7,0.96)_0%,rgba(5,8,7,0.82)_38%,rgba(5,8,7,0.35)_65%,rgba(5,8,7,0)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden className="absolute inset-0 bg-fog opacity-60" />
      
      <Particles count={16} color="cream" />

      {/* Left vertical rail label */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 hidden -translate-y-1/2 rotate-180 lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        <div className="flex items-center gap-4 text-meta text-cream/60">
          <span>Historias AI Studio</span>
          <span className="h-6 w-px bg-cream/40" />
          <span>Sequence</span>
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </div>
      </div>


      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col justify-end px-6 pt-32 pb-32 sm:px-8 lg:px-14 lg:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[820px]"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-mint" />
            <span className="text-eyebrow text-mint">
              AI Video Production House
            </span>
          </div>

          <SplitText as="h1" className="text-display text-cream" stagger={0.08} delay={0.15}>
            {"We make impossible stories "}
            <span className="italic-serif text-cream">visible.</span>
          </SplitText>

          <p className="mt-8 max-w-[520px] text-body">
            Cinematic, photorealistic visuals—without the artificial AI look.
            From creative direction and live action to generative production
            and post.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CtaButton
              size="lg"
              variant="primary"
              onClick={() => scrollTo("work")}
              icon={<ArrowRight size={16} />}
            >
              View Our Portfolio
            </CtaButton>
            <CtaButton
              size="lg"
              variant="secondary"
              dot
              onClick={() => scrollTo("contact")}
            >
              Get Free Consultation
            </CtaButton>
          </div>
        </motion.div>

        {/* Client strip */}
        <div className="mt-16 lg:mt-24">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-meta text-cream/60">Trusted by leading brands</span>
            <span className="h-px flex-1 bg-cream/20" />
          </div>
          <LogoMarquee />

        </div>
      </div>
    </section>
  );
}
