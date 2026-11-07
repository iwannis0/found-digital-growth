import { WorkView, workMetadata } from "@/views/work";

export const metadata = workMetadata("en");

export default function WorkPage() {
  return <WorkView locale="en" />;
}
