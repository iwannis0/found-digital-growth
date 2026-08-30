import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, body, light = false, className }: { eyebrow: string; title: string; body?: string; light?: boolean; className?: string }) {
  return (
    <div className={cn("section-heading", light && "section-heading-light", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p className="section-body">{body}</p>}
    </div>
  );
}
