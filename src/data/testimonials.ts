// DEMO CONTENT — testimonials and collaboration list. Replace with real
// approved quotes and client names before publishing.

import ebayImg from "@/assets/collabs/ebay.jpeg.asset.json";
import ekrafImg from "@/assets/collabs/ekraf.jpeg.asset.json";
import flimtyImg from "@/assets/collabs/flimty.jpeg.asset.json";
import adrielleImg from "@/assets/collabs/adrielle.jpeg.asset.json";
import sunprideImg from "@/assets/collabs/sunpride.jpeg.asset.json";
import pegadaianImg from "@/assets/collabs/pegadaian.jpeg.asset.json";
import bukitAsamImg from "@/assets/collabs/bukit-asam.jpeg.asset.json";

export type Testimonial = {
  id: string;
  client: string;
  quote: string;
  role: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "ebay",
    client: "eBay",
    role: "Client Testimonial",
    quote:
      "Historias consistently delivers every project on time, with visuals that always feel realistic and cinematic.",
    image: ebayImg.url,
  },
  {
    id: "ekraf",
    client: "Kementerian Ekraf",
    role: "Public Sector Partner",
    quote:
      "A production partner that understands storytelling at a national scale — the craft never gets lost in the technology.",
    image: ekrafImg.url,
  },
  {
    id: "flimty",
    client: "FLIMTY",
    role: "Brand Campaign",
    quote:
      "They turned a fast-moving brief into a hero campaign that outperformed every internal benchmark we set.",
    image: flimtyImg.url,
  },
  {
    id: "adrielle",
    client: "Adrielle Iman",
    role: "Talent Collaboration",
    quote:
      "The team treats every frame like it matters. That's rare, and it shows on screen from the first cut.",
    image: adrielleImg.url,
  },
  {
    id: "sunpride",
    client: "Sunpride",
    role: "Product Story",
    quote:
      "Precision, taste, and speed in one team — the exact combination this category asks for.",
    image: sunprideImg.url,
  },
  {
    id: "pegadaian",
    client: "Pegadaian",
    role: "Brand Campaign",
    quote:
      "Historias brought our brand story to life with a level of craft and clarity that felt genuinely cinematic.",
    image: pegadaianImg.url,
  },
  {
    id: "bukit-asam",
    client: "Bukit Asam",
    role: "Corporate Story",
    quote:
      "A rare team that pairs technical precision with real storytelling — every frame felt intentional.",
    image: bukitAsamImg.url,
  },
];
