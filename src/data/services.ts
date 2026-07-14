export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
};

export const SERVICES: Service[] = [
  {
    id: "commercial",
    number: "01",
    title: "AI Commercial Production",
    description:
      "Cinematic campaigns built from concept to final delivery — combining creative direction, live action, and generative production.",
    capabilities: ["Creative Direction", "Film Production", "Generative Visuals", "Post-Production"],
  },
  {
    id: "product",
    number: "02",
    title: "AI Product Films",
    description:
      "Product-first films that turn hero SKUs into cinematic stories, with photoreal environments and precision lighting.",
    capabilities: ["Concept Development", "Set & Environment", "Product Cinematography", "Color & Finishing"],
  },
  {
    id: "hybrid",
    number: "03",
    title: "Hybrid & Live-Action Production",
    description:
      "Live-action shooting merged with generative extensions — one unified pipeline from set to screen.",
    capabilities: ["Live-Action Crew", "Virtual Production", "AI Extension", "Full Post Pipeline"],
  },
  {
    id: "post",
    number: "04",
    title: "AI Post-Production & Editing",
    description:
      "Editing, compositing, color, and sound built around AI-assisted workflows without the artificial AI look.",
    capabilities: ["Editing", "VFX & Compositing", "Color Grading", "Sound Design"],
  },
  {
    id: "ugc",
    number: "05",
    title: "AI UGC Videos",
    description:
      "High-volume, on-brand social content that feels authentic — produced fast without sacrificing brand quality.",
    capabilities: ["Talent Direction", "Scripted Scenarios", "Multi-Format Delivery", "Platform Optimization"],
  },
  {
    id: "content",
    number: "06",
    title: "AI Content Creation",
    description:
      "Always-on content systems for brands that need cinematic quality at the pace of the feed.",
    capabilities: ["Content Strategy", "Series Production", "Rapid Iteration", "Ongoing Delivery"],
  },
];
