import { ServicesView, servicesMetadata } from "@/views/services";

export const metadata = servicesMetadata("el");

export default function GreekServicesPage() {
  return <ServicesView locale="el" />;
}
