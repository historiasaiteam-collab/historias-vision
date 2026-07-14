import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Props = {
  count?: number;
  className?: string;
  /** color token, e.g. "cream" | "mint" */
  color?: "cream" | "mint";
};

/**
 * Minimal atmospheric dust — pure CSS, no canvas, no WebGL.
 * Dots drift slowly on the vertical axis via a keyframe animation defined
 * in styles.css (`@keyframes drift`). Hidden on mobile via a media query
 * and disabled entirely when the user prefers reduced motion.
 */
export function Particles({ count = 18, className, color = "cream" }: Props) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Deterministic pseudo-random so SSR/CSR match.
        const seed = (i + 1) * 9301;
        const rnd = (n: number) => ((Math.sin(seed * n) + 1) / 2);
        return {
          left: `${rnd(1.1) * 100}%`,
          top: `${rnd(2.3) * 100}%`,
          size: 1 + rnd(3.7) * 2, // 1-3 px
          delay: rnd(4.9) * -18,
          duration: 14 + rnd(5.5) * 12, // 14-26s
          opacity: 0.15 + rnd(6.7) * 0.35,
        };
      }),
    [count],
  );

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden hidden md:block motion-reduce:hidden",
        className,
      )}
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background:
              color === "mint"
                ? "color-mix(in oklab, var(--color-mint) 70%, transparent)"
                : "color-mix(in oklab, var(--color-cream) 70%, transparent)",
            opacity: d.opacity,
            filter: "blur(0.4px)",
            animation: `drift ${d.duration}s ease-in-out ${d.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
