import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** px translated across the full scroll range. Negative = moves up (foreground feel). */
  offset?: number;
  className?: string;
  as?: "div" | "span" | "section";
};

/**
 * Lightweight scroll parallax. Wraps children with a translateY driven by the
 * element's own viewport progress. Respects prefers-reduced-motion (returns
 * static content) and never blocks pointer events on children.
 */
export function Parallax({ children, offset = -40, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  const Comp = motion[as];

  return (
    <Comp
      ref={ref as never}
      style={reduce ? undefined : { y }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
