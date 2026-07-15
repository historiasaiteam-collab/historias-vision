// Selected Work items. Each project links to a real YouTube video played
// via the VideoModal (see src/data/videos.ts for id → provider mapping).

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

const CATEGORY_IMAGES: Record<ProjectCategory, string[]> = {
  Commercial: [commercial1, commercial2, commercial3],
  "Digital Ads": [digital1, digital2, digital3],
  "Social Content": [social1, social2, social3],
  "Short Film": [short1, short2, short3],
  "AI UGC": [ai1, ai2, ai3],
  "Hybrid Production": [hybrid1, hybrid2, hybrid3],
};

type Seed = {
  id: string;
  brand: string;
  title: string;
  type: string;
  year: string;
  href: string;
  featured?: boolean;
};

const CATEGORY_SEEDS: Record<ProjectCategory, Seed[]> = {
  Commercial: [
    {
      id: "commercial-dua-belibis",
      brand: "DUA BELIBIS",
      title: "Commercial Film",
      type: "Commercial",
      year: "2025",
      href: "https://youtu.be/gkhJrp13jYw",
      featured: true,
    },
    {
      id: "commercial-sunpride",
      brand: "SUNPRIDE",
      title: "Commercial Film",
      type: "Commercial",
      year: "2025",
      href: "https://youtu.be/VrMel_6tR-s",
    },
    {
      id: "commercial-sanqing",
      brand: "SANQING",
      title: "Commercial Film",
      type: "Commercial",
      year: "2025",
      href: "https://youtu.be/nRMczp-ZUdw",
    },
  ],
  "Digital Ads": [
    {
      id: "digital-pegadaian-pd-aja",
      brand: "PEGADAIAN",
      title: "PD Aja!",
      type: "Digital Ad",
      year: "2025",
      href: "https://youtu.be/Cbzu5JnBA9Q",
      featured: true,
    },
    {
      id: "digital-pegadaian-tabungan",
      brand: "PEGADAIAN",
      title: "Tabungan",
      type: "Digital Ad",
      year: "2025",
      href: "https://youtu.be/jPIyN0_LCbw",
    },
    {
      id: "digital-grand-mercure",
      brand: "GRAND MERCURE",
      title: "Digital Short",
      type: "Digital Ad",
      year: "2025",
      href: "https://www.youtube.com/shorts/fngy479UACo",
    },
  ],
  "Social Content": [
    {
      id: "social-adrielle-kumar",
      brand: "ADRIELLE IMAN",
      title: "Kumar",
      type: "Social Content",
      year: "2025",
      href: "https://www.youtube.com/shorts/uJEMWnOtyZY",
      featured: true,
    },
    {
      id: "social-desa-presiden-pildun",
      brand: "DESA PRESIDEN",
      title: "Pildun",
      type: "Social Content",
      year: "2025",
      href: "https://www.youtube.com/shorts/rvlaqxyXWoc",
    },
    {
      id: "social-desa-presiden-damai",
      brand: "DESA PRESIDEN",
      title: "Damai",
      type: "Social Content",
      year: "2025",
      href: "https://youtube.com/shorts/Kw32BLFBWD8",
    },
  ],
  "Short Film": [
    {
      id: "short-waaqimusholah",
      brand: "WAAQIMUSHOLAH",
      title: "Short Film",
      type: "Short Film",
      year: "2025",
      href: "https://youtu.be/XsvQMInsQxQ",
      featured: true,
    },
    {
      id: "short-katanya-mau-berangkat-bareng",
      brand: "KATANYA MAU BERANGKAT BARENG",
      title: "Short Film",
      type: "Short Film",
      year: "2025",
      href: "https://youtu.be/KLqbiSWDcW4",
    },
    {
      id: "short-puskurjar-telaah-makna",
      brand: "PUSKURJAR",
      title: "Telaah Makna",
      type: "Short Film",
      year: "2025",
      href: "https://youtu.be/-qo2qCqNA4Y",
    },
  ],
  "AI UGC": [
    {
      id: "ai-adrielle-kumar",
      brand: "ADRIELLE IMAN",
      title: "Kumar",
      type: "AI UGC",
      year: "2025",
      href: "https://www.youtube.com/shorts/uJEMWnOtyZY",
      featured: true,
    },
    {
      id: "ai-desa-presiden-pildun",
      brand: "DESA PRESIDEN",
      title: "Pildun",
      type: "AI UGC",
      year: "2025",
      href: "https://www.youtube.com/shorts/rvlaqxyXWoc",
    },
    {
      id: "ai-desa-presiden-damai",
      brand: "DESA PRESIDEN",
      title: "Damai",
      type: "AI UGC",
      year: "2025",
      href: "https://youtube.com/shorts/Kw32BLFBWD8",
    },
  ],
  "Hybrid Production": [
    {
      id: "hybrid-pt-kasa",
      brand: "PT KASA",
      title: "Company Profile",
      type: "Hybrid Production",
      year: "2025",
      href: "https://www.youtube.com/watch?v=XyTHYhBslFw",
      featured: true,
    },
    {
      id: "hybrid-bukit-asam",
      brand: "BUKIT ASAM",
      title: "Company Profile",
      type: "Hybrid Production",
      year: "2025",
      href: "https://youtu.be/SfElh23O7hs",
    },
    {
      id: "hybrid-rewind-indonesia-2025",
      brand: "REWIND INDONESIA",
      title: "Rewind Indonesia 2025",
      type: "Hybrid Production",
      year: "2025",
      href: "https://youtu.be/opNv7BMKleE",
    },
  ],
};

export const PROJECTS: Project[] = (Object.keys(CATEGORY_SEEDS) as ProjectCategory[]).flatMap(
  (category) =>
    CATEGORY_SEEDS[category].map((seed, i) => ({
      id: seed.id,
      brand: seed.brand,
      title: seed.title,
      type: seed.type,
      year: seed.year,
      category,
      image: CATEGORY_IMAGES[category][i % CATEGORY_IMAGES[category].length],
      href: seed.href,
      featured: seed.featured,
    })),
);
