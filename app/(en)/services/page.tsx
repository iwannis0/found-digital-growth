import { ServicesView, servicesMetadata } from "@/views/services";

export const metadata = servicesMetadata("en");

export default function ServicesPage() {
  return <ServicesView locale="en" />;
}
