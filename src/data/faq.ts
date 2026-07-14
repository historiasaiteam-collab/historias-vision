export type FaqItem = { number: string; question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "What types of projects can Historias produce?",
    answer:
      "Commercials, product films, digital campaigns, social content, short films, AI UGC, and hybrid live-action productions.",
  },
  {
    number: "02",
    question: "Does every project use AI?",
    answer:
      "No. We choose the right mix of live action, generative tools, and traditional post for the brief.",
  },
  {
    number: "03",
    question: "Can you combine AI with live-action production?",
    answer:
      "Yes. Historias operates an integrated live-action and AI production pipeline.",
  },
  {
    number: "04",
    question: "How fast can you deliver?",
    answer:
      "From same-day content to full productions delivered across several weeks.",
  },
  {
    number: "05",
    question: "Do you handle concept, script, and creative direction?",
    answer:
      "Yes. We can lead the process from the first idea through final delivery.",
  },
  {
    number: "06",
    question: "Can the final work be used commercially?",
    answer:
      "Usage, licensing, and deliverables are agreed clearly before production begins.",
  },
  {
    number: "07",
    question: "Do you work with agencies?",
    answer:
      "Yes. We can collaborate directly, as a production partner, or in a white-label workflow.",
  },
];

export type WhyReason = { number: string; title: string; body: string };

export const WHY_REASONS: WhyReason[] = [
  {
    number: "01",
    title: "Story First",
    body: "AI expands what is possible. Creative direction gives every image a reason to exist.",
  },
  {
    number: "02",
    title: "Cinematic Realism",
    body: "Photoreal worlds without the artificial AI look.",
  },
  {
    number: "03",
    title: "Cost-Efficient Production",
    body: "Cinematic results with a leaner budget than conventional production.",
  },
  {
    number: "04",
    title: "Faster, Smarter Production",
    body: "Premium output in days or weeks — not months.",
  },
];

export type ProcessStep = { number: string; title: string; body: string };

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    body: "We align on the audience, objective, format, and ambition.",
  },
  {
    number: "02",
    title: "Concept & Treatment",
    body: "Script, visual direction, references, and production plan.",
  },
  {
    number: "03",
    title: "Production",
    body: "Live-action shooting, asset creation, and generative development.",
  },
  {
    number: "04",
    title: "Post-Production",
    body: "Editing, compositing, color, sound, and refinement.",
  },
  {
    number: "05",
    title: "Delivery",
    body: "Final masters, cutdowns, and platform-ready versions.",
  },
];
