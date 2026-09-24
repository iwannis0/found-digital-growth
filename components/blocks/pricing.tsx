"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  short: string;
  setup: string;
  monthly: string;
  best: string;
  minutes: string;
  popular: boolean;
  items: readonly string[];
}

const confettiColors = ["#3F35B5", "#6A5FE0", "#2E2690", "#EFEDFF"];
const toAmount = (value: string) => Number(value.replace(/[^\d]/g, ""));

export function Pricing({ plans }: { plans: readonly PricingPlan[] }) {
  const [showCare, setShowCare] = useState(false);
  // Phones show one plan at a time, picked from the tab bar; desktop shows all three.
  const [activePlan, setActivePlan] = useState(() => Math.max(0, plans.findIndex((plan) => plan.popular)));
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useReducedMotion();
  const switchRef = useRef<HTMLButtonElement>(null);

  async function handleToggle(checked: boolean) {
    setShowCare(checked);
    if (!checked || reduceMotion || !switchRef.current) return;
    const rect = switchRef.current.getBoundingClientRect();
    const { default: confetti } = await import("canvas-confetti");
    // The default instance spawns a blob worker, which the site's CSP (correctly) blocks.
    const fire = confetti.create(undefined, { resize: true, useWorker: false });
    fire({
      particleCount: 50,
      spread: 60,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: confettiColors,
      ticks: 200,
      gravity: 1.2,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["circle"],
    });
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap md:mb-12 items-center justify-center gap-3 text-sm font-semibold">
        <span className={cn("transition-colors", !showCare ? "text-foreground" : "text-muted-foreground")}>One-off setup</span>
        <Label className="cursor-pointer">
          <Switch
            ref={switchRef}
            checked={showCare}
            onCheckedChange={handleToggle}
            aria-label="Show monthly Website Care pricing"
            className="data-[size=default]:h-7 data-[size=default]:w-12 data-[state=unchecked]:bg-[#bdb9ae] data-[state=checked]:bg-[var(--acid)] [&_[data-slot=switch-thumb]]:!size-6 data-[state=checked]:[&_[data-slot=switch-thumb]]:!translate-x-[calc(100%-2px)]"
          />
        </Label>
        <span className={cn("transition-colors", showCare ? "text-foreground" : "text-muted-foreground")}>
          Website Care <span className="text-[var(--acid)] max-md:hidden">(optional, monthly)</span>
        </span>
      </div>

      <div className="pricing-tabs md:hidden" aria-label="Choose a plan">
        {plans.map((plan, index) => (
          <button
            key={plan.name}
            type="button"
            aria-pressed={index === activePlan}
            aria-controls={`plan-${index}`}
            onClick={() => setActivePlan(index)}
          >
            <span>{plan.short}{plan.popular && <i aria-label="Most popular" />}</span>
            <NumberFlow
              value={toAmount(showCare ? plan.monthly : plan.setup)}
              locales="en-GB"
              format={{ style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }}
              className="tabular-nums"
            />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            id={`plan-${index}`}
            initial={reduceMotion ? false : { y: 40, opacity: 1 }}
            whileInView={reduceMotion ? undefined : { y: isDesktop && plan.popular ? -18 : 0, opacity: 1, scale: isDesktop && !plan.popular ? 0.97 : 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 26, delay: 0.12 + index * 0.08 }}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-white p-6 text-center shadow-sm md:p-7",
              index !== activePlan && "max-md:hidden",
              plan.popular ? "z-10 border-2 border-[var(--acid)] shadow-xl shadow-[color:var(--acid)]/10" : "border-[var(--line)]",
            )}
          >
            {plan.popular && (
              <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-2xl bg-[var(--acid)] px-3 py-1 text-white">
                <Star className="size-4 fill-current" aria-hidden="true" />
                <span className="ml-1 text-xs font-bold tracking-wide">Most Popular</span>
              </div>
            )}

            <p className="mx-auto max-w-[16em] md:min-h-[2.6em] text-xs font-extrabold uppercase leading-snug tracking-[.16em] text-muted-foreground">{plan.name}</p>

            <div className="mt-4 flex items-baseline md:mt-5 justify-center gap-x-2">
              <NumberFlow
                value={toAmount(showCare ? plan.monthly : plan.setup)}
                locales="en-GB"
                format={{ style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                transformTiming={{ duration: 500, easing: "ease-out" }}
                willChange
                className="text-4xl font-bold tracking-tight text-foreground tabular-nums md:text-5xl"
              />
              <span className="text-sm font-semibold tracking-wide text-muted-foreground">{showCare ? "/ month" : "setup"}</span>
            </div>
            <p className="mt-1 text-xs md:min-h-[3.75em] leading-5 text-muted-foreground">
              {showCare ? "Optional Website Care after launch. 3-month minimum term, then month-to-month." : `One-off. 50% deposit to begin, 50% before launch. Optional Website Care after launch: ${plan.monthly} / month.`}
            </p>

            <p className="mx-auto mt-3 max-w-[24em] text-sm md:mt-4 md:min-h-[6.5em] leading-relaxed text-muted-foreground">{plan.best}</p>

            <hr className="my-5 w-full border-[var(--line)]" />

            <ul className="flex flex-1 flex-col gap-2.5 text-left">
              {plan.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-snug">
                  <Check className="mt-0.5 size-4 flex-shrink-0 text-[var(--acid)]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm leading-snug">
                <Check className="mt-0.5 size-4 flex-shrink-0 text-[var(--acid)]" aria-hidden="true" />
                <span>Up to {plan.minutes} minor updates/month</span>
              </li>
            </ul>

            <Link
              className={cn("button button-large mt-7 w-full", plan.popular ? "button-accent" : "button-dark")}
              href={`/contact?package=${encodeURIComponent(plan.name)}`}
              data-track="pricing_cta_click"
              data-track-label={plan.name}
            >
              Choose this package
              <ArrowRight aria-hidden="true" />
            </Link>
          </motion.article>
        ))}
      </div>
    </>
  );
}
