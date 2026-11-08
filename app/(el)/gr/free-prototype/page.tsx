import { FreePrototypeView, freePrototypeMetadata } from "@/views/free-prototype";

export const metadata = freePrototypeMetadata("el");

export default function GreekFreePrototypePage() {
  return <FreePrototypeView locale="el" />;
}
