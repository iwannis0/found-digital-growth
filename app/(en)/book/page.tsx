import { BookView, bookMetadata } from "@/views/book";

export const metadata = bookMetadata("en");

export default function BookPage() {
  return <BookView locale="en" />;
}
