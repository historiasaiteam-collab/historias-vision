import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
  dot?: boolean;
  icon?: ReactNode;
};

export const CtaButton = forwardRef<HTMLButtonElement, Props>(function CtaButton(
  { className, variant = "primary", size = "md", as = "button", href, dot, icon, children, ...rest },
  ref,
) {
  const reduce = useReducedMotion();
  const localRef = useRef<HTMLElement | null>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(mvY, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent) => {
    if (reduce || !localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    mvX.set(relX * 0.25);
    mvY.set(relY * 0.35);
  };
  const handleLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-mint";
  const sizes: Record<Size, string> = {
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-[15px]",
  };
  const variants: Record<Variant, string> = {
    primary: "bg-cream text-obsidian hover:text-obsidian",
    secondary: "bg-graphite text-cream border border-edge hover:border-mint hover:text-mint",
    ghost: "text-cream border border-cream/30 hover:border-mint hover:text-mint",
  };

  const cls = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      {/* Sliding mint wash on hover for premium feel */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full bg-mint transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0",
          variant === "primary" ? "opacity-100" : "opacity-30",
        )}
      />
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      ) : null}
      {dot ? (
        <span
          aria-hidden
          className={cn(
            "relative z-10 h-1.5 w-1.5 rounded-full",
            variant === "primary" ? "bg-obsidian" : "bg-mint",
          )}
        />
      ) : null}
    </>
  );

  const motionStyle = reduce ? undefined : { x, y };

  if (as === "a") {
    return (
      <motion.a
        ref={(el) => {
          localRef.current = el;
        }}
        href={href}
        className={cls}
        style={motionStyle}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={(el) => {
        localRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
      }}
      className={cls}
      style={motionStyle}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {inner}
    </motion.button>
  );
});
