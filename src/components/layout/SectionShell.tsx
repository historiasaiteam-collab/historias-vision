import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light" | "split";

type Props = {
  id: string;
  number: string;
  eyebrow: string;
  next?: { number: string; label: string };
  tone?: Tone;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
  fullBleed?: boolean;
};

export function SectionShell({
  id,
  number,
  eyebrow,
  next,
  tone = "dark",
  className,
  contentClassName,
  children,
  fullBleed = false,
}: Props) {
  const bg =
    tone === "light"
      ? "bg-cream text-obsidian"
      : tone === "split"
        ? "bg-obsidian-depth text-cream"
        : "bg-obsidian-depth text-cream";

  return (
    <section
      id={id}
      className={cn(
        "relative isolate w-full overflow-hidden",
        bg,
        className,
      )}
    >
      {/* Giant outlined section number, sitting on the left rail */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-6 left-2 sm:left-4 lg:left-6 select-none",
          tone === "light" ? "text-obsidian/25" : "text-cream/20",
        )}
      >
        <span className="section-number">{number}</span>
      </div>

      {/* Bottom next-section marker */}
      {next ? (
        <div
          className={cn(
            "pointer-events-none absolute bottom-4 left-6 right-6 z-[2] flex items-center gap-3 text-meta",
            tone === "light" ? "text-obsidian/70" : "text-cream/60",
          )}
        >
          <span>
            {next.number} / {next.label}
          </span>
          <span
            className={cn(
              "h-px flex-1",
              tone === "light" ? "bg-obsidian/20" : "bg-cream/20",
            )}
          />
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </div>
      ) : null}

      <div
        className={cn(
          "relative z-[1] mx-auto w-full",
          fullBleed ? "" : "max-w-[1500px] px-6 sm:px-8 lg:px-14",
          "pt-24 pb-24 lg:pt-28 lg:pb-32",
          contentClassName,
        )}
      >
        <div className="mb-6 flex items-center gap-3">
          <span
            className={cn(
              "h-px w-6",
              tone === "light" ? "bg-obsidian/60" : "bg-mint",
            )}
          />
          <span
            className={cn(
              "text-eyebrow",
              tone === "light" ? "text-obsidian/70" : "text-mint",
            )}
          >
            {eyebrow}
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}
