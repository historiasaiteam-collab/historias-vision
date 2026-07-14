import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  /** Coords in a 100x100 viewBox — line is stretched by preserveAspectRatio="none". */
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  className?: string;
  /** Attach the scroll target to a parent (e.g. wrap both sections 08–09). Defaults to self. */
  targetRef?: React.RefObject<HTMLElement>;
};

/**
 * Diagonal connecting line whose length + brightness are driven by the
 * viewport scroll progress of `targetRef` (or the line's own container).
 * SVG is rendered at 100x100 with non-scaling stroke so the same component
 * spans full-width regardless of section size. Respects reduced motion.
 */
export function ScrollDiagonalLine({
  x1 = 0,
  y1 = 78,
  x2 = 100,
  y2 = 22,
  className,
  targetRef,
}: Props) {
  const reduce = useReducedMotion();
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef ?? localRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.4,
  });

  // Interpolate the visible endpoint from (x1,y1) toward (x2,y2).
  const dx = x2 - x1;
  const dy = y2 - y1;
  const endX = useTransform(progress, (v) => x1 + dx * (reduce ? 1 : v));
  const endY = useTransform(progress, (v) => y1 + dy * (reduce ? 1 : v));
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0.15, 0.55, 0.55, 0.2]);

  return (
    <div
      ref={localRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <motion.svg
        style={{ opacity }}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* faint full track */}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="color-mix(in oklab, var(--color-cream) 20%, transparent)"
          strokeWidth="0.06"
          strokeDasharray="0.6 0.9"
          vectorEffect="non-scaling-stroke"
        />
        {/* mint progress head */}
        <motion.line
          x1={x1}
          y1={y1}
          x2={endX}
          y2={endY}
          stroke="var(--color-mint)"
          strokeWidth="0.12"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{
            filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--color-mint) 60%, transparent))",
          }}
        />
        {/* traveling endpoint dot */}
        <motion.circle
          cx={endX}
          cy={endY}
          r="0.6"
          fill="var(--color-mint)"
          vectorEffect="non-scaling-stroke"
          style={{
            filter: "drop-shadow(0 0 4px var(--color-mint))",
          }}
        />
      </motion.svg>
    </div>
  );
}
