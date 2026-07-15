import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  amount?: number;
  once?: boolean;
};

/**
 * Splits text nodes into words that reveal with a blur+rise stagger on
 * viewport enter. Non-string children (JSX like <br />, <span>) pass through
 * unchanged so existing markup keeps working.
 */
export function SplitText({
  children,
  className,
  as = "span",
  delay = 0,
  stagger = 0.045,
  amount = 0.4,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  };
  const word: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: "0.6em", filter: "blur(12px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const nodes = Array.isArray(children) ? children : [children];

  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={container}
    >
      {nodes.map((node, i) => {
        if (typeof node === "string") {
          return (
            <Fragment key={i}>
              {node.split(/(\s+)/).map((chunk, j) => {
                if (/^\s+$/.test(chunk)) return <Fragment key={j}>{chunk}</Fragment>;
                if (chunk === "") return null;
                return (
                  <span
                    key={j}
                    className="inline-block overflow-hidden align-baseline"
                    style={{ paddingBottom: "0.08em" }}
                  >
                    <motion.span variants={word} className="inline-block will-change-transform">
                      {chunk}
                    </motion.span>
                  </span>
                );
              })}
            </Fragment>
          );
        }
        return (
          <motion.span key={i} variants={word} className="inline-block will-change-transform">
            {node}
          </motion.span>
        );
      })}
    </Comp>
  );
}
