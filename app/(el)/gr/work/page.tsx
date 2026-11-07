import { WorkView, workMetadata } from "@/views/work";

export const metadata = workMetadata("el");

export default function GreekWorkPage() {
  return <WorkView locale="el" />;
}
