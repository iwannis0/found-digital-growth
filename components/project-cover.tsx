import type { ReactNode } from "react";
import { AuraCover } from "@/components/aura-cover";

const covers: Record<string, (() => ReactNode) | null> = {
  "aura-dental": AuraCover,
  "nova-estates": null,
};

export function hasProjectCover(slug: string) { return slug in covers; }

export function ProjectCover({ slug, fallback = null }: { slug: string; fallback?: ReactNode }) {
  if (!(slug in covers)) return fallback;
  const Cover = covers[slug];
  return Cover ? <Cover /> : null;
}
