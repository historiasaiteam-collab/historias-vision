import ebay from "@/assets/logos/ebay.png.asset.json";
import flimty from "@/assets/logos/flimty.png.asset.json";
import duaBelibis from "@/assets/logos/dua-belibis.png.asset.json";
import ekraf from "@/assets/logos/ekraf.png.asset.json";
import dremina from "@/assets/logos/dremina.png.asset.json";

const LOGOS: { src: string; alt: string }[] = [
  { src: ebay.url, alt: "eBay" },
  { src: flimty.url, alt: "Flimty" },
  { src: duaBelibis.url, alt: "Dua Belibis" },
  { src: ekraf.url, alt: "Kementerian Ekonomi Kreatif" },
  { src: dremina.url, alt: "Dremina AI" },
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
        className="flex w-max items-center gap-10 motion-reduce:animate-none sm:gap-14"
        style={{ animation: "marquee-right 40s linear infinite" }}
      >
        {row.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="h-10 w-auto shrink-0 object-contain transition-transform hover:scale-[1.03] sm:h-12 md:h-14"
          />
        ))}
      </div>
    </div>
  );
}
