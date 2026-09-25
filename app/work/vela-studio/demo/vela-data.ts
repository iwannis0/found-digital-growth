export type VelaFaq = { question: string; answer: string };

export type VelaService = {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  duration: string;
  summary: string;
  description: string;
  benefits: string[];
  faq: VelaFaq[];
  image: string;
  secondaryImage: string;
};

const image = (name: string) => `/images/vela-demo/${name}`;

export const velaServices: VelaService[] = [
  {
    slug: "facial-rituals",
    name: "Facial Rituals",
    shortName: "Facial Ritual",
    price: "€95",
    duration: "60 minutes",
    summary: "A considered facial shaped around what your skin needs today.",
    description: "A slow, restorative facial that combines careful skin analysis, layered hydration and sculpting touch. Each ritual is adjusted to your skin condition, so the result feels fresh, balanced and entirely personal.",
    benefits: ["Deeply hydrates and comforts", "Supports the natural skin barrier", "Promotes clarity and brightness", "Personalised to your skin condition"],
    faq: [
      { question: "How is the ritual personalised?", answer: "We begin with a short consultation and skin assessment, then adapt the cleanse, exfoliation, massage and finishing products to your skin on the day." },
      { question: "Is there any downtime?", answer: "No. The ritual is designed to leave skin calm and luminous, making it suitable before an event or as regular skin maintenance." },
      { question: "How often should I book?", answer: "For sustained results, we usually suggest every four to six weeks, with a simple home routine between visits." },
      { question: "Is it suitable for sensitive skin?", answer: "Yes. Pressure, products and exfoliation are carefully adjusted for reactive and sensitive skin." },
    ],
    image: image("yuvqgqe0od9qpw1ca1lm1tedwk.png"),
    secondaryImage: image("biv4ccr6e3dv0rpbwvkaa5vwnaq.png"),
  },
  {
    slug: "sculpting-massage",
    name: "Sculpting Massage",
    shortName: "Sculpting Massage",
    price: "€110",
    duration: "75 minutes",
    summary: "Focused bodywork that releases tension and restores a sense of lightness.",
    description: "This tailored massage blends flowing movements with focused sculpting techniques. We work deliberately through areas of tension while supporting circulation and a calmer nervous system.",
    benefits: ["Releases held muscular tension", "Supports circulation", "Encourages ease of movement", "Pressure adapted throughout"],
    faq: [
      { question: "Is this a deep-tissue massage?", answer: "It can include deeper work, but the pressure is always tailored. The aim is effective release without making the treatment feel clinical." },
      { question: "What should I wear?", answer: "Wear whatever feels comfortable. Professional draping is used throughout the treatment." },
      { question: "Can I book while pregnant?", answer: "Please contact the studio first so we can recommend an appropriate treatment and confirm suitability." },
      { question: "How will I feel afterwards?", answer: "Most guests feel lighter and deeply relaxed. Hydration and a quiet evening are recommended." },
    ],
    image: image("a0nwnab0vaw0krya8nnwmdgdkny.png"),
    secondaryImage: image("ymbmhc5bksobaxvabcvgrzuatma.png"),
  },
  {
    slug: "body-therapy",
    name: "Body Therapy",
    shortName: "Body Therapy",
    price: "€125",
    duration: "90 minutes",
    summary: "A full-body reset combining exfoliation, nourishment and rest.",
    description: "An enveloping treatment created for tired skin and busy minds. Gentle exfoliation is followed by warm botanical oils and unhurried bodywork, leaving the skin soft and the body grounded.",
    benefits: ["Smooths and nourishes the skin", "Encourages deep relaxation", "Restores tired, dry skin", "Creates a full-body sense of calm"],
    faq: [
      { question: "What does the treatment include?", answer: "The ritual includes body exfoliation, a warm oil application and a relaxing massage sequence." },
      { question: "Should I shower beforehand?", answer: "A shower earlier in the day is ideal. Avoid applying heavy body products immediately before your visit." },
      { question: "Can it be adapted for sensitive skin?", answer: "Yes. We can soften or remove exfoliation and select gentler products after consultation." },
      { question: "How long do the results last?", answer: "Skin feels softer immediately, while the sense of rest often carries into the following days." },
    ],
    image: image("c9a3jckhldxcvgygqayglfofwq.png"),
    secondaryImage: image("g80djakgowmm1vzbnemnorhmo.png"),
  },
  {
    slug: "skin-renewal",
    name: "Skin Renewal",
    shortName: "Skin Renewal",
    price: "€105",
    duration: "60 minutes",
    summary: "Modern resurfacing and restorative care for clearer, brighter skin.",
    description: "A measured renewal treatment that combines gentle resurfacing with barrier-supporting hydration. Designed to refine texture and revive dull skin without an aggressive approach.",
    benefits: ["Refines uneven texture", "Revives tired-looking skin", "Supports visible brightness", "Includes calming recovery care"],
    faq: [
      { question: "Will my skin peel?", answer: "The treatment is designed for gentle renewal. Mild dryness is possible, but visible peeling is not expected for most guests." },
      { question: "Can I wear makeup afterwards?", answer: "We recommend leaving the skin bare for the remainder of the day where possible." },
      { question: "When will I see results?", answer: "Skin usually looks refreshed immediately, with texture and brightness continuing to improve over several days." },
      { question: "What should I avoid before visiting?", answer: "Pause strong exfoliants and retinoids for several days before your appointment unless your therapist advises otherwise." },
    ],
    image: image("gxtqdjvnbwl7jsjjsz1u2bueu.png"),
    secondaryImage: image("qzd7azpclccerkm1tsflp843wjq.png"),
  },
  {
    slug: "lymphatic-treatment",
    name: "Lymphatic Treatment",
    shortName: "Lymphatic Treatment",
    price: "€100",
    duration: "60 minutes",
    summary: "Light, rhythmic touch to support circulation and reduce heaviness.",
    description: "A gentle treatment using precise rhythmic movements to support the body's natural lymphatic flow. The pace is quiet and restorative, ideal when you feel heavy, puffy or depleted.",
    benefits: ["Supports natural lymphatic flow", "Helps reduce the feeling of puffiness", "Encourages lightness", "Calms an overstimulated system"],
    faq: [
      { question: "Is the pressure firm?", answer: "No. Lymphatic work uses very light, specific pressure because the lymphatic system sits close to the skin." },
      { question: "Who is this treatment for?", answer: "It is often chosen by guests experiencing puffiness, travel fatigue or a general sense of heaviness." },
      { question: "How should I prepare?", answer: "Arrive well hydrated and avoid a large meal immediately before the session." },
      { question: "Are there reasons I should not book?", answer: "Some medical conditions require clearance. Contact us before booking if you are under medical care or recently had surgery." },
    ],
    image: image("sk79jfst0apwjmasuoulvnvliq.png"),
    secondaryImage: image("x8ndmc4uah5l7gfxgex3r56n8e.png"),
  },
  {
    slug: "signature-vela-ritual",
    name: "Signature VELA Ritual",
    shortName: "The VELA Ritual",
    price: "€165",
    duration: "120 minutes",
    summary: "Our complete face and body ritual, created as a true pause from everything else.",
    description: "The VELA signature brings together restorative bodywork, a personalised facial and small sensory details chosen around you. Two unhurried hours to release, replenish and return to yourself.",
    benefits: ["Combines face and body care", "Fully personalised on arrival", "Restorative two-hour experience", "Includes a quiet tea ritual"],
    faq: [
      { question: "What is included?", answer: "A tailored body treatment, personalised facial ritual, scalp work and a quiet tea service after your treatment." },
      { question: "Can I choose the focus?", answer: "Yes. Your therapist will shape the balance of face and body work around what would benefit you most." },
      { question: "Is this suitable as a gift?", answer: "Yes. The Signature VELA Ritual is available as a beautifully presented digital or printed gift card." },
      { question: "How much time should I allow?", answer: "Allow around two and a half hours at the studio so your arrival and departure never feel rushed." },
    ],
    image: image("jwmfd7euiucwzbpjgrdoc4vqv0i.png"),
    secondaryImage: image("brldxnq9o8hmoeyircepy7pd4yk.png"),
  },
];

export const velaTeam = [
  { name: "Elena Markou", role: "Founder / Skin Therapist", image: image("team-elena.png") },
  { name: "Imani Washington", role: "Body & Massage Therapist", image: image("team-maya.png") },
  { name: "Li Jing", role: "Wellness Practitioner", image: image("team-sofia.png") },
];
