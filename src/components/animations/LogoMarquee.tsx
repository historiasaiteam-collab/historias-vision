import ebay from "@/assets/logos/ebay.png";
import flimty from "@/assets/logos/flimty.png";
import duaBelibis from "@/assets/logos/dua-belibis.png";
import kemenekraf from "@/assets/logos/kemenekraf.png";
import dreminaAi from "@/assets/logos/dremina-ai.png";

const LOGOS: { src: string; alt: string }[] = [
  { src: ebay, alt: "eBay" },
  { src: flimty, alt: "Flimty" },
  { src: duaBelibis, alt: "Dua Belibis" },
  { src: kemenekraf, alt: "Kementerian Ekonomi Kreatif" },
  { src: dreminaAi, alt: "Dremina AI" },
];

export function LogoMarquee() {
  // Duplicate the list so the -50% translate creates a seamless loop.
  const row = [...LOGOS, ...LOGOS];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="flex w-max items-center gap-16 motion-reduce:animate-none"
        style={{ animation: "marquee-right 40s linear infinite" }}
      >
        {row.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="h-10 w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100 sm:h-12 md:h-14"
          />
        ))}
      </div>
    </div>
  );
}
