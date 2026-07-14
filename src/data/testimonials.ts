// DEMO CONTENT — testimonials and collaboration list. Replace with real
// approved quotes and client names before publishing.

export type Testimonial = {
  id: string;
  client: string;
  quote: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "ebay",
    client: "eBay",
    role: "Client Testimonial",
    quote:
      "Historias consistently delivers every project on time, with visuals that always feel realistic and cinematic.",
  },
  {
    id: "ekraf",
    client: "Kementerian Ekraf",
    role: "Public Sector Partner",
    quote:
      "A production partner that understands storytelling at a national scale — the craft never gets lost in the technology.",
  },
  {
    id: "flimty",
    client: "FLIMTY",
    role: "Brand Campaign",
    quote:
      "They turned a fast-moving brief into a hero campaign that outperformed every internal benchmark we set.",
  },
  {
    id: "adrielle",
    client: "Adrielle Iman",
    role: "Talent Collaboration",
    quote:
      "The team treats every frame like it matters. That's rare, and it shows on screen from the first cut.",
  },
  {
    id: "aputure",
    client: "Aputure Amaran",
    role: "Product Story",
    quote:
      "Precision, taste, and speed in one team — the exact combination this category asks for.",
  },
];
