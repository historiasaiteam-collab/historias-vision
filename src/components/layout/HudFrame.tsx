import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * HUD frame overlay: chamfered/notched rounded rectangle drawn with SVG so it
 * can animate its stroke on mount. Sits absolutely inside a positioned parent.
 *
 * The frame shape: rounded top-left corner, small 45° notches on top-right and
 * bottom-left, rounded bottom-right corner. Mint L-brackets are drawn at every
 * corner and stroke-in on mount.
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
      {/* Chamfered rounded frame path — non-scaling stroke keeps it crisp. */}
      <motion.path
        d={framePath(radius, notch)}
        fill="none"
        stroke={stroke}
        strokeOpacity={0.35}
        strokeWidth={0.35}
        vectorEffect="non-scaling-stroke"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      />
      {/* Solid mint corner brackets on top of the faint frame line. */}
      {cornerBrackets(bracketSize).map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={0.9}
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
 * Build the outline path in a 0..100 coordinate space:
 *   TL: rounded (radius)
 *   TR: 45° notch (size = notch)
 *   BR: rounded (radius)
 *   BL: 45° notch
 */
function framePath(r: number, n: number): string {
  // Coord space is 0..100 in both axes; treat r / n as percentages.
  return [
    `M 0 ${r}`,
    `Q 0 0 ${r} 0`, // top-left rounded
    `L ${100 - n} 0`,
    `L 100 ${n}`, // top-right notch
    `L 100 ${100 - r}`,
    `Q 100 100 ${100 - r} 100`, // bottom-right rounded
    `L ${n} 100`,
    `L 0 ${100 - n}`, // bottom-left notch
    `Z`,
  ].join(" ");
}

/** L-shape brackets at each corner, ~bracketSize % of the box. */
function cornerBrackets(s: number): string[] {
  const S = s;
  return [
    // top-left
    `M 0 ${S} L 0 0 L ${S} 0`,
    // top-right
    `M ${100 - S} 0 L 100 0 L 100 ${S}`,
    // bottom-right
    `M 100 ${100 - S} L 100 100 L ${100 - S} 100`,
    // bottom-left
    `M ${S} 100 L 0 100 L 0 ${100 - S}`,
  ];
}
