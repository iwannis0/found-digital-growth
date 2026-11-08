export type NovaProperty = {
  slug: string; title: string; location: string; type: string; intent: "sale" | "rent" | "holiday" | "development";
  price: number; priceLabel: string; beds: number; baths: number; area: number; image: string; images: string[];
  summary: string; description: string; features: string[]; reference: string;
};

const assets = [
  "/images/nova-demo/nova-hero.png", "/images/nova-demo/azure-cliff.png", "/images/nova-demo/horizon-penthouse.png",
  "/images/nova-demo/olive-grove.png", "/images/nova-demo/cove-residences.png", "/images/nova-demo/astra-house.png",
];

const galleries = {
  azure: [assets[1], "/images/nova-demo/azure-cliff-exterior.png", "/images/nova-demo/azure-cliff-interior.png"],
  horizon: [assets[2], "/images/nova-demo/horizon-penthouse-exterior.png", "/images/nova-demo/horizon-penthouse-interior.png"],
  olive: [assets[3], "/images/nova-demo/olive-grove-exterior.png", "/images/nova-demo/olive-grove-interior.png"],
  cove: [assets[4], "/images/nova-demo/cove-residences-exterior.png", "/images/nova-demo/cove-residences-interior.png"],
  astra: [assets[5], "/images/nova-demo/astra-house-exterior.png", "/images/nova-demo/astra-house-interior.png"],
  nocturne: [assets[0], "/images/nova-demo/nocturne-hillside-exterior.png", "/images/nova-demo/nocturne-hillside-interior.png"],
};

export const novaProperties: NovaProperty[] = [
  { slug:"azure-cliff-villa", title:"Azure Cliff Villa", location:"Protaras", type:"Villa", intent:"sale", price:2450000, priceLabel:"€2,450,000", beds:4, baths:5, area:410, image:assets[1], images:[assets[1],assets[5],assets[0]], reference:"NV-101", summary:"A quiet coastal residence shaped around sea views and effortless indoor-outdoor living.", description:"Set above the clear waters of Protaras, Azure Cliff Villa pairs warm limestone with open, light-filled rooms. A long terrace, infinity pool and sheltered outdoor dining spaces make the home equally suited to private weekends and extended summer stays.", features:["Uninterrupted sea view","Infinity pool","Four en-suite bedrooms","Private landscaped garden","Covered parking","Smart-home preparation"] },
  { slug:"horizon-marina-penthouse", title:"Horizon Marina Penthouse", location:"Limassol", type:"Penthouse", intent:"sale", price:1890000, priceLabel:"€1,890,000", beds:3, baths:3, area:265, image:assets[2], images:[assets[2],assets[0],assets[5]], reference:"NV-114", summary:"A refined duplex terrace home above Limassol Marina.", description:"Horizon balances privacy with immediate access to the marina. Its generous entertaining terrace, calm material palette and uninterrupted water outlook create an understated city retreat.", features:["Marina frontage","Private roof terrace","Concierge access","Three bedrooms","Two parking spaces","Storage room"] },
  { slug:"olive-grove-retreat", title:"Olive Grove Retreat", location:"Paphos", type:"Villa", intent:"holiday", price:9500, priceLabel:"€9,500 / month", beds:5, baths:5, area:520, image:assets[3], images:[assets[3],assets[1],assets[5]], reference:"NV-208", summary:"A private stone retreat woven into an established Mediterranean garden.", description:"Designed for slow days and long evenings, the retreat connects every room to shaded courtyards, water and mature olive trees. The home is available for considered seasonal stays.", features:["Five suites","Heated pool","Outdoor kitchen","Housekeeping available","Sea-view terrace","Gated grounds"] },
  { slug:"cove-residences", title:"Cove Residences", location:"Ayia Napa", type:"Development", intent:"development", price:780000, priceLabel:"From €780,000", beds:3, baths:3, area:190, image:assets[4], images:[assets[4],assets[1],assets[2]], reference:"NV-301", summary:"A limited collection of coastal residences arranged around water and gardens.", description:"Cove Residences brings together generous terraces, limestone architecture and shared landscape moments. Each home is positioned for privacy while remaining connected to the coast.", features:["New development","Communal pool","Private terraces","Energy class A","Optional furniture package","Completion Q3 2027"] },
  { slug:"astra-beach-house", title:"Astra Beach House", location:"Larnaca", type:"House", intent:"rent", price:6200, priceLabel:"€6,200 / month", beds:3, baths:3, area:230, image:assets[5], images:[assets[5],assets[3],assets[2]], reference:"NV-176", summary:"A serene beachfront house with a sheltered courtyard and direct sea outlook.", description:"Astra is an understated coastal home where limestone, oak and filtered morning light set the tone. The compact pool and protected courtyard make year-round living comfortable.", features:["Beachfront setting","Private pool","Three bedrooms","Fully furnished","Solar energy","Long-term rental"] },
  { slug:"nocturne-hillside-villa", title:"Nocturne Hillside Villa", location:"Peyia", type:"Villa", intent:"sale", price:3150000, priceLabel:"€3,150,000", beds:5, baths:6, area:610, image:assets[0], images:[assets[0],assets[3],assets[1]], reference:"NV-125", summary:"A dramatic hillside villa with cinematic sunset views over the coast.", description:"Nocturne is designed as a sequence of calm, expansive spaces. Full-height glazing opens the main living rooms to the pool terrace, while private suites sit within quieter stone volumes.", features:["Panoramic sea view","Five suites","Infinity pool","Cinema room","Lift","Three-car garage"] },
];

novaProperties[0].images = galleries.azure;
novaProperties[1].images = galleries.horizon;
novaProperties[2].images = galleries.olive;
novaProperties[3].images = galleries.cove;
novaProperties[4].images = galleries.astra;
novaProperties[5].images = galleries.nocturne;

export const novaLocations = ["All locations", ...Array.from(new Set(novaProperties.map(p=>p.location)))];
export const novaTypes = ["All types", ...Array.from(new Set(novaProperties.map(p=>p.type)))];
