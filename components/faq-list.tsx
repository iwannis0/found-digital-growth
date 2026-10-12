"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/faqs";

export function FAQList({ limit, list = faqs }: { limit?: number; list?: readonly (readonly [string, string])[] }) {
  const items = typeof limit === "number" ? list.slice(0, limit) : list;
  return (
    <Accordion className="faq-list" type="single" collapsible>
      {items.map(([question, answer], index) => (
        <AccordionItem key={question} value={`faq-${index}`} data-motion="rise">
          <AccordionTrigger><span><small>{String(index + 1).padStart(2, "0")}</small>{question}</span></AccordionTrigger>
          <AccordionContent><p>{answer}</p></AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
