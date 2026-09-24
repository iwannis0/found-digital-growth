import type { ReactNode } from "react";
import { AuraCover } from "@/components/aura-cover";
import { NovaCover } from "@/components/nova-cover";

const covers: Record<string, () => ReactNode> = {
  "aura-dental": AuraCover,
  "nova-estates": NovaCover,
};

export function hasProjectCover(slug: string) { return slug in covers; }

export function ProjectCover({ slug, fallback = null }: { slug: string; fallback?: ReactNode }) {
  const Cover = covers[slug];
  return Cover ? <Cover /> : fallback;
}
