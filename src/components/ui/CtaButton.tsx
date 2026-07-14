import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
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
  const base =
    "group inline-flex items-center justify-center gap-3 font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-mint";
  const sizes: Record<Size, string> = {
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-[15px]",
  };
  const variants: Record<Variant, string> = {
    primary: "bg-cream text-obsidian hover:bg-mint",
    secondary:
      "bg-graphite text-cream border border-edge hover:border-mint hover:text-mint",
    ghost: "text-cream border border-cream/30 hover:border-mint hover:text-mint",
  };

  const cls = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      ) : null}
      {dot ? (
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "primary" ? "bg-obsidian group-hover:bg-obsidian" : "bg-mint",
          )}
        />
      ) : null}
    </>
  );

  if (as === "a") {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref} className={cls} {...rest}>
      {inner}
    </button>
  );
});
