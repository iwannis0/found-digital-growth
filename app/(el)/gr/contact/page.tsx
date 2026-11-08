import { ContactView, contactMetadata, type ContactSearchParams } from "@/views/contact";

export const metadata = contactMetadata("el");

export default function GreekContactPage({ searchParams }: { searchParams: ContactSearchParams }) {
  return <ContactView locale="el" searchParams={searchParams} />;
}
