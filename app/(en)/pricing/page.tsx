import { PricingView, pricingMetadata } from "@/views/pricing";

export const metadata = pricingMetadata("en");

export default function PricingPage() {
  return <PricingView locale="en" />;
}
