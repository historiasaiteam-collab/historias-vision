import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * HUD frame overlay: chamfered/notched rounded rectangle drawn with SVG so it
 * can animate its stroke on mount. Sits absolutely inside a positioned parent.
 *
 * The frame and its bright corner accents share the same four chamfers, so the
 * accent never drifts away from the clipped card below it.
 */
export function HudFrame({
  className,
  color = "mint",
  radius = 22,
  notch = 18,
  bracketSize = 22,
  padding = 4,
  animate = true,
  delay = 0,
}: {
  className?: string;
  color?: "mint" | "cream";
  radius?: number;
  notch?: number;
  bracketSize?: number;
  /** how far outside the rect the brackets float, in px */
  padding?: number;
  animate?: boolean;
  delay?: number;
}) {
  const stroke = color === "mint" ? "var(--color-mint)" : "var(--color-cream)";
  const glow =
    color === "mint"
      ? "drop-shadow(0 0 6px color-mix(in oklab, var(--color-mint) 55%, transparent))"
      : "drop-shadow(0 0 4px color-mix(in oklab, var(--color-cream) 40%, transparent))";

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute z-20", className)}
      style={{ inset: -padding, filter: glow }}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {/* Chamfered frame path — non-scaling stroke keeps it crisp. */}
      <motion.path
        d={framePath(radius, notch)}
        fill="none"
        stroke={stroke}
        strokeOpacity={0.5}
        strokeWidth={0.55}
        vectorEffect="non-scaling-stroke"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      />
      {/* Bright accents trace the exact same corner geometry. */}
      {cornerBrackets(bracketSize, notch).map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={1.05}
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + 0.15 + i * 0.08,
          }}
        />
      ))}
    </svg>
  );
}

/**
 * Build a four-corner chamfer in a 0..100 coordinate space.
 */
function framePath(_r: number, n: number): string {
  return [
    `M ${n} 0`,
    `L ${100 - n} 0`,
    `L 100 ${n}`,
    `L 100 ${100 - n}`,
    `L ${100 - n} 100`,
    `L ${n} 100`,
    `L 0 ${100 - n}`,
    `L 0 ${n}`,
    `Z`,
  ].join(" ");
}

/** Accents that follow the top/diagonal/side run of each chamfer. */
function cornerBrackets(s: number, n: number): string[] {
  return [
    `M 0 ${s} L 0 ${n} L ${n} 0 L ${s} 0`,
    `M ${100 - s} 0 L ${100 - n} 0 L 100 ${n} L 100 ${s}`,
    `M 100 ${100 - s} L 100 ${100 - n} L ${100 - n} 100 L ${100 - s} 100`,
    `M ${s} 100 L ${n} 100 L 0 ${100 - n} L 0 ${100 - s}`,
  ];
}
