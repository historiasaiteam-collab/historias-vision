import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Why } from "@/components/sections/Why";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { LoadingScreen } from "@/components/animations/LoadingScreen";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Historias AI Studio — Cinematic AI Video Production House",
      },
      {
        name: "description",
        content:
          "Historias AI Studio produces cinematic, photorealistic commercials, product films, and brand stories — a unified live-action and generative AI pipeline for corporate brands.",
      },
      { property: "og:title", content: "Historias AI Studio — Cinematic AI Video Production House" },
      {
        property: "og:description",
        content:
          "Historias AI Studio produces cinematic, photorealistic commercials, product films, and brand stories — a unified live-action and generative AI pipeline for corporate brands.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Historias AI Studio — Cinematic AI Video Production House" },
      {
        name: "twitter:description",
        content:
          "Historias AI Studio produces cinematic, photorealistic commercials, product films, and brand stories — a unified live-action and generative AI pipeline for corporate brands.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "#organization",
              name: "Historias AI Studio",
              description:
                "AI Video Production House — creative direction, live action, generative production, and post.",
              url: "/",
              logo: "/favicon.png",
              sameAs: [],
            },
            {
              "@type": "ProfessionalService",
              "@id": "#service",
              name: "Historias AI Studio",
             image: "/favicon.png",
              url: "/",
              serviceType: "AI Video Production",
              areaServed: "Worldwide",
              provider: { "@id": "#organization" },
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  const faqContactRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative min-h-screen bg-obsidian text-cream">
      <LoadingScreen />
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Work />
        <Process />
        <Why />
        <Testimonials />
        {/* Sections 08–09 share a scroll target so the diagonal connecting
            line can be driven by their combined scroll progress. */}
        <div ref={faqContactRef} className="relative">
          <Faq scrollRef={faqContactRef} />
          <Contact scrollRef={faqContactRef} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
