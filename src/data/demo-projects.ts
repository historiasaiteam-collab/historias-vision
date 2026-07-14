// DEMO CONTENT — Selected Work items. Placeholder brand names + titles per
// category so every filter tab renders a full featured + 2 side card layout.
// Swap `href` and eventually `image` with real deliverables when ready.

import commercial1 from "@/assets/work/commercial-1.jpg";
import commercial2 from "@/assets/work/commercial-2.jpg";
import commercial3 from "@/assets/work/commercial-3.jpg";
import digital1 from "@/assets/work/digital-1.jpg";
import digital2 from "@/assets/work/digital-2.jpg";
import digital3 from "@/assets/work/digital-3.jpg";
import social1 from "@/assets/work/social-1.jpg";
import social2 from "@/assets/work/social-2.jpg";
import social3 from "@/assets/work/social-3.jpg";
import short1 from "@/assets/work/short-1.jpg";
import short2 from "@/assets/work/short-2.jpg";
import short3 from "@/assets/work/short-3.jpg";
import ai1 from "@/assets/work/ai-1.jpg";
import ai2 from "@/assets/work/ai-2.jpg";
import ai3 from "@/assets/work/ai-3.jpg";
import hybrid1 from "@/assets/work/hybrid-1.jpg";
import hybrid2 from "@/assets/work/hybrid-2.jpg";
import hybrid3 from "@/assets/work/hybrid-3.jpg";

export type ProjectCategory =
  | "Commercial"
  | "Digital Ads"
  | "Social Content"
  | "Short Film"
  | "AI UGC"
  | "Hybrid Production";

export type Project = {
  id: string;
  brand: string;
  title: string;
  type: string;
  year: string;
  category: ProjectCategory;
  image: string;
  href: string;
  featured?: boolean;
};

export const FILTERS: (ProjectCategory | "All")[] = [
  "All",
  "Commercial",
  "Digital Ads",
  "Social Content",
  "Short Film",
  "AI UGC",
  "Hybrid Production",
];

const IMAGES = [flimty, dua, dremina];

type Seed = {
  brand: string;
  title: string;
  type: string;
  year: string;
  featured?: boolean;
};

// Three placeholder items per category so the composition stays consistent.
const CATEGORY_SEEDS: Record<ProjectCategory, Seed[]> = {
  Commercial: [
    { brand: "FLIMTY", title: "Unstoppable / Brand Campaign", type: "Commercial", year: "2026", featured: true },
    { brand: "AURION", title: "Kinetic Territory", type: "Brand Film", year: "2026" },
    { brand: "NORDVEIL", title: "Silent Machines", type: "Brand Film", year: "2025" },
  ],
  "Digital Ads": [
    { brand: "DUA BELIBIS", title: "The Heat Within", type: "Product Film", year: "2026", featured: true },
    { brand: "DREMINA AI", title: "Intelligence, Made Human", type: "Digital Campaign", year: "2026" },
    { brand: "LUMEN CO", title: "Signal in the Noise", type: "Digital Spot", year: "2026" },
  ],
  "Social Content": [
    { brand: "OKTA STUDIO", title: "Everyday Motion", type: "Series", year: "2026", featured: true },
    { brand: "NOVA LABS", title: "Between Frames", type: "Reels", year: "2026" },
    { brand: "GRAVITAS", title: "Ambient Feed", type: "Vertical Set", year: "2025" },
  ],
  "Short Film": [
    { brand: "HISTORIAS", title: "Obsidian / A Short Film", type: "Short Film", year: "2026", featured: true },
    { brand: "MERIDIAN", title: "Cold Light", type: "Short Film", year: "2025" },
    { brand: "AXIS PROJECT", title: "The Long Now", type: "Short Film", year: "2025" },
  ],
  "AI UGC": [
    { brand: "AVA COLLECTIVE", title: "Synthetic Diaries", type: "AI UGC", year: "2026", featured: true },
    { brand: "HELIX", title: "Prompt / Response", type: "AI UGC", year: "2026" },
    { brand: "MIRRA", title: "Voices of the Model", type: "AI UGC", year: "2026" },
  ],
  "Hybrid Production": [
    { brand: "KAIROS", title: "Live Action × Generative", type: "Hybrid Production", year: "2026", featured: true },
    { brand: "BLACKFRAME", title: "Between the Cuts", type: "Hybrid Production", year: "2026" },
    { brand: "SEED / STORY", title: "Composite Reality", type: "Hybrid Production", year: "2025" },
  ],
};

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const PROJECTS: Project[] = (Object.keys(CATEGORY_SEEDS) as ProjectCategory[]).flatMap(
  (category) =>
    CATEGORY_SEEDS[category].map((seed, i) => ({
      id: `${slug(category)}-${slug(seed.brand)}`,
      brand: seed.brand,
      title: seed.title,
      type: seed.type,
      year: seed.year,
      category,
      image: IMAGES[i % IMAGES.length],
      href: "#",
      featured: seed.featured,
    })),
);
