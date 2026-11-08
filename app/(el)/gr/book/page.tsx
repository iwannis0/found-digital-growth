import { BookView, bookMetadata } from "@/views/book";

export const metadata = bookMetadata("el");

export default function GreekBookPage() {
  return <BookView locale="el" />;
}
