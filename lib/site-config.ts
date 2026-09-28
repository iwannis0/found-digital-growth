export const siteConfig = {
  name: "VISION.",
  tagline: "Designed for what’s next.",
  title: "VISION. Local Digital Growth Company",
  description:
    "Website design, local SEO and digital growth for ambitious Cyprus businesses.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "onboarding@vision.cy",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+357 99900853",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "35722000000",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vision.cy",
  address: "Cyprus",
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  },
} as const;

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export const leadStatuses = [
  "NEW",
  "QUALIFIED",
  "CONTACTED",
  "AUDIT_SENT",
  "MEETING_BOOKED",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
  "NURTURE",
] as const;
