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
      { property: "og:title", content: "Historias AI Studio — Cinematic AI Video Production" },
      {
        property: "og:description",
        content:
          "Cinematic, photorealistic visuals — without the artificial AI look. Creative direction, live action, generative production, and post.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Historias AI Studio" },
      {
        name: "twitter:description",
        content:
          "AI Video Production House — cinematic realism, story-first direction.",
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
              logo: "/favicon.ico",
              sameAs: [],
            },
            {
              "@type": "ProfessionalService",
              "@id": "#service",
              name: "Historias AI Studio",
              image: "/favicon.ico",
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
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
