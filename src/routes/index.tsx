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

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-obsidian text-cream">
      <Nav />
      <main>
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
