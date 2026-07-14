export type NavItem = { label: string; href: string; id: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Studio", href: "#about", id: "about" },
  { label: "Process", href: "#process", id: "process" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

export const FOOTER_NAV: NavItem[] = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Studio", href: "#about", id: "about" },
  { label: "Process", href: "#process", id: "process" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

// Social + legal links live in one place. Empty `href` renders as a visible
// but non-interactive item — no fake destinations. Drop a real URL in when
// the brand accounts / policy pages are ready.
export type SocialLink = {
  label: string;
  href: string;
  handle?: string; // display text, e.g. "@historias.studio"
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "", handle: "Coming Soon" },
  { label: "YouTube", href: "", handle: "Coming Soon" },
  { label: "LinkedIn", href: "", handle: "Coming Soon" },
];

export const LEGAL_LINKS = [
  { label: "Privacy", href: "" },
  { label: "Terms", href: "" },
];
