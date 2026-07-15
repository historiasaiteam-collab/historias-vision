// Video sources for the portfolio modal. Each key matches a Project `id`
// from src/data/demo-projects.ts.

export type VideoProvider = "youtube" | "vimeo" | "mp4" | "demo";

export type VideoSource = {
  provider: VideoProvider;
  // For youtube / vimeo: the raw video ID.
  // For mp4: a full URL to the file.
  // For demo: no playback; the modal renders a poster + coming-soon note.
  id?: string;
  url?: string;
};

export const DEMO_VIDEOS: Record<string, VideoSource> = {
  // Commercial
  "commercial-dua-belibis": { provider: "youtube", id: "gkhJrp13jYw" },
  "commercial-sunpride": { provider: "youtube", id: "VrMel_6tR-s" },
  "commercial-sanqing": { provider: "youtube", id: "nRMczp-ZUdw" },

  // Digital Ads
  "digital-pegadaian-pd-aja": { provider: "youtube", id: "Cbzu5JnBA9Q" },
  "digital-pegadaian-tabungan": { provider: "youtube", id: "jPIyN0_LCbw" },
  "digital-grand-mercure": { provider: "youtube", id: "fngy479UACo" },

  // Social Content
  "social-adrielle-kumar": { provider: "youtube", id: "uJEMWnOtyZY" },
  "social-desa-presiden-pildun": { provider: "youtube", id: "rvlaqxyXWoc" },
  "social-desa-presiden-damai": { provider: "youtube", id: "Kw32BLFBWD8" },

  // Short Film
  "short-waaqimusholah": { provider: "youtube", id: "XsvQMInsQxQ" },
  "short-katanya-mau-berangkat-bareng": { provider: "youtube", id: "KLqbiSWDcW4" },
  "short-puskurjar-telaah-makna": { provider: "youtube", id: "-qo2qCqNA4Y" },

  // AI UGC
  "ai-adrielle-kumar": { provider: "youtube", id: "uJEMWnOtyZY" },
  "ai-desa-presiden-pildun": { provider: "youtube", id: "rvlaqxyXWoc" },
  "ai-desa-presiden-damai": { provider: "youtube", id: "Kw32BLFBWD8" },

  // Hybrid Production
  "hybrid-pt-kasa": { provider: "youtube", id: "XyTHYhBslFw" },
  "hybrid-bukit-asam": { provider: "youtube", id: "SfElh23O7hs" },
  "hybrid-rewind-indonesia-2025": { provider: "youtube", id: "opNv7BMKleE" },
};

export function getVideoEmbedUrl(src: VideoSource): string | null {
  if (src.provider === "youtube" && src.id) {
    return `https://www.youtube-nocookie.com/embed/${src.id}?autoplay=1&rel=0&modestbranding=1`;
  }
  if (src.provider === "vimeo" && src.id) {
    return `https://player.vimeo.com/video/${src.id}?autoplay=1&title=0&byline=0&portrait=0`;
  }
  return null;
}
