// DEMO CONTENT — Selected Work items. Replace with real client projects once
// deliverables are approved. Categories are used by the filter chips.

import flimty from "@/assets/work-flimty.jpg";
import dua from "@/assets/work-dua.jpg";
import dremina from "@/assets/work-dremina.jpg";

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

export const PROJECTS: Project[] = [
  {
    id: "flimty-unstoppable",
    brand: "FLIMTY",
    title: "Unstoppable / Brand Campaign",
    type: "Commercial",
    year: "2026",
    category: "Commercial",
    image: flimty,
    href: "#",
    featured: true,
  },
  {
    id: "dua-belibis-heat",
    brand: "DUA BELIBIS",
    title: "The Heat Within",
    type: "Product Film",
    year: "2026",
    category: "Digital Ads",
    image: dua,
    href: "#",
  },
  {
    id: "dremina-intelligence",
    brand: "DREMINA AI",
    title: "Intelligence, Made Human",
    type: "Digital Campaign",
    year: "2026",
    category: "Digital Ads",
    image: dremina,
    href: "#",
  },
];
