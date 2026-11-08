import { ContactView, contactMetadata, type ContactSearchParams } from "@/views/contact";

export const metadata = contactMetadata("en");

export default function ContactPage({ searchParams }: { searchParams: ContactSearchParams }) {
  return <ContactView locale="en" searchParams={searchParams} />;
}
