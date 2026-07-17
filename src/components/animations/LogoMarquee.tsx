const logoModules = {
  ...import.meta.glob(
    "/src/assets/logos/*.{png,jpg,jpeg,webp,svg}",
    {
      eager: true,
      import: "default",
      query: "?url",
    },
  ),
  ...import.meta.glob(
    "/src/assets/??-*.{png,jpg,jpeg,webp,svg}",
    {
      eager: true,
      import: "default",
      query: "?url",
    },
  ),
} as Record<string, string>;

function filenameToAlt(path: string) {
  const filename =
    path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Brand";

  return filename
    .replace(/^\d+-/, "")
    .replace(
      /-(hd|logo|old|raster|source|watermarked)/gi,
      "",
    )
    .split("-")
    .map((word) =>
      word.length <= 3
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

const LOGOS = Object.entries(logoModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, src]) => ({
    src,
    alt: filenameToAlt(path),
  }));

export function LogoMarquee() {
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
        style={{ animation: "marquee-right 70s linear infinite" }}
      >
        {row.map((logo, index) => (
          <img
            key={`${logo.alt}-${index}`}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="h-10 max-w-[140px] shrink-0 object-contain transition-transform hover:scale-[1.03] sm:h-12 sm:max-w-[170px] md:h-14 md:max-w-[190px]"
          />
        ))}
      </div>
    </div>
  );
}