// DEMO CONTENT — placeholder video sources for the portfolio modal.
// Real project cuts drop in here without touching any component.
// Supported provider strings: "youtube" | "vimeo" | "mp4".

export type VideoProvider = "youtube" | "vimeo" | "mp4" | "demo";

export type VideoSource = {
  provider: VideoProvider;
  // For youtube / vimeo: the raw video ID.
  // For mp4: a full URL to the file.
  // For demo: no playback; the modal renders a poster + coming-soon note.
  id?: string;
  url?: string;
};

// All portfolio items currently point to `demo` — no external stock videos.
// Swap a project's entry to { provider: "youtube", id: "..." } when live.
export const DEMO_VIDEOS: Record<string, VideoSource> = {
  "flimty-unstoppable": { provider: "demo" },
  "dua-belibis-heat": { provider: "demo" },
  "dremina-intelligence": { provider: "demo" },
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
