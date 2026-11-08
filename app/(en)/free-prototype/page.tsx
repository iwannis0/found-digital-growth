import { FreePrototypeView, freePrototypeMetadata } from "@/views/free-prototype";

export const metadata = freePrototypeMetadata("en");

export default function FreePrototypePage() {
  return <FreePrototypeView locale="en" />;
}
