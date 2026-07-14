import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  amount?: number;
  as?: "div" | "section" | "span";
};

export function ScrollReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  amount = 0.2,
  as = "div",
}: Props) {
  const Comp = motion[as];
  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}
