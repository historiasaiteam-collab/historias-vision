import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/logo-h.png";

const SESSION_KEY = "historias:loading:shown";

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const shown = sessionStorage.getItem(SESSION_KEY);
      if (!shown) {
        setVisible(true);
        // Prevent background scroll during the intro.
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const t = setTimeout(() => {
          sessionStorage.setItem(SESSION_KEY, "1");
          setVisible(false);
          document.body.style.overflow = prev;
        }, reduce ? 700 : 1800);
        return () => {
          clearTimeout(t);
          document.body.style.overflow = prev;
        };
      }
    } catch {
      // sessionStorage unavailable — skip loader.
    }
  }, [reduce]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-obsidian"
          aria-hidden
        >
          <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(37,255,196,0.08) 0%, transparent 55%)",
            }}
          />
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.3 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <img
              src={logo}
              alt="Historias AI Studio"
              width={220}
              height={220}
              className="h-40 w-40 object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)] sm:h-48 sm:w-48"
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-eyebrow text-mint">Historias AI Studio</div>
              <div className="relative h-px w-32 overflow-hidden bg-cream/15">
                <motion.span
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: reduce ? 0.5 : 1.4,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-mint"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
