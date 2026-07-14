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
          <div
            key={`${logo.alt}-${i}`}
            className="flex h-14 shrink-0 items-center justify-center rounded-lg bg-cream/95 px-5 py-2 shadow-sm ring-1 ring-cream/10 transition-transform hover:scale-[1.03] sm:h-16 sm:px-6"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-full max-h-10 w-auto object-contain sm:max-h-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
