export const treatmentDetails = [
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    image: "/images/aura-demo/whitening-before-after.png",
    eyebrow: "01 / COSMETIC CARE",
    headline: "A brighter smile, on your terms.",
    intro: "Explore a whitening plan shaped around your goals, your natural shade and the questions you want answered first.",
    includes: ["A conversation about the result you have in mind", "An assessment of your starting point", "A personalised explanation of suitable options and aftercare"],
    expectation: "Your visit begins with a conversation and an assessment. A dentist would explain which options are appropriate for you, the likely steps and the cost before any treatment begins.",
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    image: "/images/aura-demo/implants-before-after.png",
    eyebrow: "02 / RESTORATIVE CARE",
    headline: "A considered path to replacing a tooth.",
    intro: "Implant care starts with understanding your needs and whether this approach is suitable for you.",
    includes: ["An initial conversation about your goals and concerns", "An individual assessment and discussion of options", "A proposed plan that explains stages, timing and cost"],
    expectation: "An implant journey may involve several stages. A dentist would assess your individual situation and explain the options, timeframe and follow-up before you decide how to proceed.",
  },
  {
    slug: "tooth-fillings",
    name: "Tooth Fillings",
    image: "/images/aura-demo/fillings-before-after.png",
    eyebrow: "03 / EVERYDAY CARE",
    headline: "Care for the details that matter.",
    intro: "A straightforward conversation about repairing a tooth, with time to understand the recommendation and the visit ahead.",
    includes: ["An assessment of the tooth and your symptoms", "An explanation of the proposed repair and material", "A chance to discuss comfort, care and follow-up"],
    expectation: "The dentist would examine the tooth, talk you through the available approach and explain what the appointment involves before proceeding.",
  },
  {
    slug: "tartar-removal",
    name: "Tartar Removal",
    image: "/images/aura-demo/tartar-before-after.png",
    eyebrow: "04 / PREVENTIVE CARE",
    headline: "A fresh start for everyday care.",
    intro: "An appointment focused on oral hygiene, your questions and an ongoing routine that makes sense for you.",
    includes: ["A conversation about your current care routine", "An individual oral health assessment", "Guidance on suitable next steps and follow-up"],
    expectation: "A clinician would assess your oral health, explain whether cleaning is appropriate and discuss how to maintain your routine afterwards.",
  },
] as const;

export type TreatmentDetail = (typeof treatmentDetails)[number];
