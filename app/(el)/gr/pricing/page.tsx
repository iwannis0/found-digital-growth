import { PricingView, pricingMetadata } from "@/views/pricing";

export const metadata = pricingMetadata("el");

export default function GreekPricingPage() {
  return <PricingView locale="el" />;
}
