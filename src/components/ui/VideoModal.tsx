import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { getVideoEmbedUrl, type VideoSource } from "@/data/videos";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  poster?: string;
  source: VideoSource;
};

export function VideoModal({ open, onClose, title, subtitle, poster, source }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap(dialogRef, open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const embedUrl = getVideoEmbedUrl(source);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-obsidian/90 px-4 py-6 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1100px] overflow-hidden border border-edge bg-graphite text-cream cut-corners-lg"
          >
            <div className="flex items-center justify-between gap-4 border-b border-edge px-5 py-3 sm:px-6">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-mint">
                  <span className="h-px w-3 bg-mint" />
                  Now Playing
                </div>
                <h3
                  id="video-modal-title"
                  className="mt-1 truncate text-sm font-semibold uppercase tracking-[0.14em] text-cream sm:text-base"
                >
                  {title}
                </h3>
                {subtitle ? (
                  <div className="text-meta text-cream/60 truncate">{subtitle}</div>
                ) : null}
              </div>
              <button
                onClick={onClose}
                aria-label="Close video"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge text-cream transition hover:border-mint hover:text-mint focus-visible:ring-mint focus-visible:outline-none"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-obsidian">
              {source.provider === "mp4" && source.url ? (
                <video
                  src={source.url}
                  controls
                  autoPlay
                  playsInline
                  poster={poster}
                  className="h-full w-full object-cover"
                />
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="relative h-full w-full">
                  {poster ? (
                    <img
                      src={poster}
                      alt=""
                      className="h-full w-full object-cover opacity-60"
                    />
                  ) : null}
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="grid h-16 w-16 place-items-center rounded-full border border-mint/60 bg-obsidian/60">
                        <Play size={22} className="ml-1 text-mint" />
                      </div>
                      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-mint">
                        Demo Preview
                      </div>
                      <p className="max-w-[420px] px-6 text-sm text-cream/70">
                        Full film reel arrives with the live launch. Reach out
                        to request a private screening link.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
