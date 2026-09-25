import {
  BarChart3,
  Bot,
  Crosshair,
  Globe2,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";

export const services = [
  {
    slug: "web-design",
    title: "Website Design & Development",
    short: "Modern websites designed and developed around the business goals that matter: enquiries, bookings, calls and sales.",
    icon: Globe2,
    eyebrow: "Design & development",
    headline: "A website built to earn attention and turn it into business.",
    intro:
      "We combine strategy, UX, sharp visual design and reliable development into a fast, clear website that makes your business feel established from the first click.",
    benefits: [
      "Business and competitor discovery",
      "Customer journey and conversion strategy",
      "Tailored responsive design",
      "Fast, secure development and deployment",
      "WhatsApp, click-to-call and booking journeys",
      "Google Maps and contact integrations",
      "Copywriting guidance and content structure",
      "Analytics, Search Console and SEO foundations",
      "Launch support and an ongoing care plan",
      "Speed and performance optimisation",
    ],
    result: "A professional digital home that is easy to trust, easy to use and ready to grow.",
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    short: "Search visibility shaped around your services, locations and the demand nearby customers show.",
    icon: Search,
    eyebrow: "Organic visibility",
    headline: "Be present when local customers are actively searching.",
    intro:
      "Local SEO connects your services with the searches people make in Nicosia, Limassol, Larnaca, Paphos and across Cyprus. We map local demand, service areas and the website signals search engines need to understand over time.",
    benefits: [
      "Local keyword and competitor research",
      "Service and location content planning",
      "Technical SEO and metadata",
      "Structured data and internal linking",
      "Search Console configuration",
      "Indexing and visibility checks",
      "Post-launch search health checks",
      "Search performance tracking",
    ],
    result: "Stronger search visibility without unrealistic promises or guaranteed rankings.",
  },
  {
    slug: "google-business",
    title: "Google Business",
    short: "A complete and credible Google Business Profile that connects customers with the right information, website, services and actions.",
    icon: MapPin,
    eyebrow: "Local presence",
    headline: "Make the most important local search result work harder.",
    intro:
      "We audit and refine your Google Business Profile so customers can quickly understand what you do, where you operate and how to take the next step.",
    benefits: [
      "Primary and secondary category optimisation",
      "Accurate business information and opening hours",
      "Services, descriptions and website links",
      "Profile completeness review",
      "Photo and content recommendations",
      "Ethical review request strategy",
      "Local visibility and website alignment",
      "Posts and updates guidance",
    ],
    result: "A clearer, more complete profile that supports discovery and trust.",
  },
  {
    slug: "website-care",
    title: "Website Care",
    short: "Hosting, monitoring, backups and routine updates that keep the website dependable after launch.",
    icon: ShieldCheck,
    eyebrow: "Ongoing care",
    headline: "Your website should stay fast, secure and up to date.",
    intro:
      "Launch is the beginning. Our care plans keep technical health in good order and make routine monthly changes easy to manage.",
    benefits: [
      "Managed hosting, SSL and backups",
      "Security and uptime monitoring",
      "Technical and dependency updates",
      "Form and performance checks",
      "Analytics health checks",
      "Text, image, contact detail and opening-hour changes",
      "Support when a routine change needs attention",
      "Post-launch technical health checks",
    ],
    result:
      "A dependable website with routine changes handled and larger improvements scoped separately.",
  },
  {
    slug: "analytics",
    title: "Analytics & Tracking",
    short: "Measure calls, messages, bookings and forms so decisions are based on real customer signals.",
    icon: BarChart3,
    eyebrow: "Measurement",
    headline: "Visitors are useful. Actions are more useful.",
    intro:
      "We configure privacy-aware measurement around the actions that show commercial intent, giving you evidence for what generates interest.",
    benefits: [
      "Phone and WhatsApp click tracking",
      "Email and booking click tracking",
      "Contact and audit form submissions",
      "Pricing and service engagement",
      "Google Analytics 4 configuration",
      "Campaign and UTM attribution",
      "Conversion and engagement reporting",
      "Search Console performance insights",
    ],
    result: "A measurement setup that turns customer signals into better marketing decisions.",
  },
  {
    slug: "conversion-design",
    title: "Conversion-Focused Design",
    short: "Decision paths shaped around trust, reassurance and the action customers are ready to take.",
    icon: Crosshair,
    eyebrow: "Decision paths",
    headline: "Help customers move from interest to action.",
    intro:
      "We shape page structure, content hierarchy and calls to action around how people decide to call, message, book, enquire or buy.",
    benefits: [
      "Message and offer clarity",
      "Action-led call-to-action strategy",
      "Enquiry and booking paths",
      "WhatsApp and click-to-call actions",
      "Trust signals, reviews and reassurance",
      "Simplified forms and mobile usability",
      "Evidence-led journey improvements",
      "Conversion tracking setup",
    ],
    result: "A confident route from first impression to the action that matters to the business.",
  },
] as const;

export const customCapabilities = [
  {
    slug: "automation",
    title: "Lead & Booking Automation",
    short: "Practical workflows added when a project genuinely benefits from them.",
    icon: Bot,
    eyebrow: "Custom capability",
    headline: "Useful workflows, where they make sense.",
    intro:
      "Automation is an optional layer for projects that need it, connecting simple business workflows without turning the website into an enterprise system.",
    benefits: [
      "Website form to email notification",
      "Enquiry to CRM webhook",
      "Booking confirmation flows",
      "Simple lead follow-up",
      "Newsletter signup to email platform",
      "Contact form to internal pipeline",
    ],
    result: "A practical workflow that removes a repetitive step while keeping the business in control.",
  },
] as const;

export const legacyServiceAliases = {
  maintenance: "website-care",
  "conversion-optimisation": "conversion-design",
} as const;

export const projects = [
  {
    slug: "aura-dental",
    image: "/images/aura-demo/treatment-hero.png",
    name: "AURA Dental",
    industry: "Dental Clinic",
    tone: "aura",
    statement: "Calm care. Clear choices.",
    problem: "An outdated dental website can make a modern clinic feel outdated.",
    concept: "A calm, premium and conversion-focused dental experience.",
    features: ["Appointment booking", "Treatment pages", "Doctors", "Reviews section", "Google Maps", "WhatsApp", "Click-to-call", "Gallery", "FAQ"],
  },
  {
    slug: "nova-estates",
    image: "/images/nova-demo/nova-hero.png",
    name: "NOVA Estates",
    industry: "Luxury Real Estate",
    tone: "nova",
    statement: "Cyprus properties, precisely presented.",
    problem: "Premium listings lose impact when search, imagery and enquiry journeys feel ordinary.",
    concept: "A dark editorial property platform with immersive detail and effortless lead capture.",
    features: ["Property listings", "Search and filters", "Property detail", "Gallery", "Agent profile", "WhatsApp", "Enquiry", "Map"],
  },
  {
    slug: "vela-studio",
    image: "/images/work/vela-studio-cover.webp",
    name: "VELA Studio",
    industry: "Beauty / Wellness",
    tone: "vela",
    statement: "A quieter kind of confidence.",
    problem: "A beautiful studio can still lose appointments when services, availability and trust are hard to understand online.",
    concept: "A warm, appointment-led beauty experience that makes choosing a treatment feel calm and personal.",
    features: ["Service menu", "Appointment booking", "Team profiles", "Treatment gallery", "Reviews section", "WhatsApp", "Instagram integration", "Location and hours", "FAQ"],
  },
] as const;

/** Finished builds that are live in production. Cards link straight to the deployment. */
export const deployedProjects = [
  {
    slug: "mavrikios-jewellery",
    image: "/images/work/mavrikios-jewellery-cover.webp",
    name: "Mavrikios Jewellery",
    industry: "Retail / E-commerce",
    url: "https://mavrikios-jewellery.vercel.app/",
    summary: "A premium jewellery boutique store with engagement guidance, bespoke commissions, wishlist and secure checkout.",
  },
  {
    slug: "super-discount",
    image: "/images/work/super-discount-cover.webp",
    name: "Super Discount",
    industry: "Retail / Loyalty Platform",
    url: "https://superdiscount-platform.vercel.app/",
    summary: "A clearance retail platform running four connected apps: public store, customer loyalty app, admin dashboard and cashier till.",
  },
] as const;

export const processSteps = [
  ["01", "Discover", "We understand the business, audience, competitors, services and goals."],
  ["02", "Strategy & Design", "We define the visual direction, message and customer journey."],
  ["03", "Build", "We develop the website and implement the agreed integrations, SEO foundations and tracking."],
  ["04", "Launch", "We complete QA, deployment, indexing and analytics checks."],
  ["05", "Grow", "After launch, we support the website and improve SEO, analytics and other agreed areas as the business grows."],
] as const;
