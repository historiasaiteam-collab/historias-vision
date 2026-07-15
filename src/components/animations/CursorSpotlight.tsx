import { useEffect, useRef, useState } from "react";

/**
 * Fixed cursor-following mint spotlight. Pure DOM/rAF so it never causes
 * React re-renders. Hidden on touch devices and when the user prefers
 * reduced motion.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -1000, y: -1000 });
  const current = useRef({ x: -1000, y: -1000 });
  const raf = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.14;
      current.current.y += (target.current.y - current.current.y) * 0.14;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x - 260}px, ${current.current.y - 260}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[520px] w-[520px] rounded-full opacity-70 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--color-mint) 22%, transparent) 0%, color-mix(in oklab, var(--color-mint) 6%, transparent) 35%, transparent 70%)",
        filter: "blur(10px)",
        willChange: "transform",
      }}
    />
  );
}
