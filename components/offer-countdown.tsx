"use client";

import { useEffect, useState } from "react";

type Labels = { title: string; days: string; hours: string; minutes: string; seconds: string };

/** Live countdown to the end of an offer. Renders placeholders on the server, ticks on the client and hides once the offer has ended. */
export function OfferCountdown({ endsAt, labels }: { endsAt: string; labels: Labels }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(endsAt).getTime();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  if (left === 0) return null;

  const s = left === null ? null : Math.floor(left / 1000);
  const parts: [string, number | null][] = [
    [labels.days, s === null ? null : Math.floor(s / 86400)],
    [labels.hours, s === null ? null : Math.floor((s % 86400) / 3600)],
    [labels.minutes, s === null ? null : Math.floor((s % 3600) / 60)],
    [labels.seconds, s === null ? null : s % 60],
  ];

  return (
    <div className="offer-countdown" role="timer" aria-live="off">
      <p>{labels.title}</p>
      <ol>
        {parts.map(([label, value]) => (
          <li key={label}>
            <strong>{value === null ? "--" : String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
