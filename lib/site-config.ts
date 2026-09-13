export const siteConfig = {
  name: "FOUND.",
  tagline: "Get found. Get chosen.",
  title: "FOUND. Local Digital Growth Company",
  description:
    "Premium websites and the digital foundations that help ambitious Cyprus businesses get found, trusted and chosen.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@found.cy",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+357 22 000000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "35722000000",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://found.cy",
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
