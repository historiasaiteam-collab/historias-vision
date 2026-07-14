import { cn } from "@/lib/utils";

/** HUD-style corner brackets sized to any container (position: absolute). */
export function CornerMarkers({
  className,
  color = "cream",
}: {
  className?: string;
  color?: "cream" | "mint" | "edge";
}) {
  const stroke =
    color === "mint" ? "border-mint" : color === "edge" ? "border-edge" : "border-cream/40";
  const size = "h-4 w-4";
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <span className={cn("absolute top-0 left-0 border-t border-l", stroke, size)} />
      <span className={cn("absolute top-0 right-0 border-t border-r", stroke, size)} />
      <span className={cn("absolute bottom-0 left-0 border-b border-l", stroke, size)} />
      <span className={cn("absolute bottom-0 right-0 border-b border-r", stroke, size)} />
    </div>
  );
}
