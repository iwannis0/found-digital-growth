"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";

type Booking = { date: string; time: string };

const storageKey = "aura-dental-demo-bookings";
const timeSlots = ["09:00", "09:45", "10:30", "11:15", "12:00", "14:00", "14:45", "15:30", "16:15", "17:00"];
const reasons = ["First consultation", "Teeth whitening", "Dental implants", "Tooth fillings", "Tartar removal", "Something else"];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function clinicNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Nicosia", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";
  return { date: `${value("year")}-${value("month")}-${value("day")}`, minutes: Number(value("hour")) * 60 + Number(value("minute")) };
}

function dateKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function dateFromKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function displayDate(key: string) {
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(dateFromKey(key));
}

function demoUnavailable(date: string, index: number) {
  const day = dateFromKey(date);
  return (day.getUTCDate() * 3 + day.getUTCMonth() + index * 7) % 6 === 0 || (day.getUTCDate() + index * 3) % 11 === 0;
}

function readBookings(): Booking[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is Booking => typeof item?.date === "string" && typeof item?.time === "string") : [];
  } catch {
    return [];
  }
}

export function BookingModal({ onClose }: { onClose: () => void }) {
  const [today] = useState(clinicNow);
  const [month, setMonth] = useState(() => {
    const date = dateFromKey(today.date);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [bookings, setBookings] = useState<Booking[]>(readBookings);
  const [confirmed, setConfirmed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  const maxDate = dateKey(new Date(dateFromKey(today.date).getTime() + 90 * 24 * 60 * 60 * 1000));
  const lastMonth = new Date(Date.UTC(dateFromKey(maxDate).getUTCFullYear(), dateFromKey(maxDate).getUTCMonth(), 1));
  const monthTitle = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(month);
  const offset = (month.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
  const days = Array.from({ length: offset + daysInMonth }, (_, index) => index < offset ? null : new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), index - offset + 1)));
  const previousMonthDisabled = month.getTime() <= new Date(Date.UTC(dateFromKey(today.date).getUTCFullYear(), dateFromKey(today.date).getUTCMonth(), 1)).getTime();
  const nextMonthDisabled = month.getTime() >= lastMonth.getTime();

  function slotStatus(time: string, index: number) {
    if (!selectedDate) return "unavailable";
    const slotMinutes = Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
    if (selectedDate === clinicNow().date && slotMinutes <= clinicNow().minutes + 30) return "passed";
    if (demoUnavailable(selectedDate, index) || bookings.some((booking) => booking.date === selectedDate && booking.time === time)) return "booked";
    return "available";
  }

  function confirm() {
    if (!selectedDate || !selectedTime || !reason || slotStatus(selectedTime, timeSlots.indexOf(selectedTime)) !== "available") return;
    const nextBookings = [...bookings, { date: selectedDate, time: selectedTime }];
    setBookings(nextBookings);
    try { localStorage.setItem(storageKey, JSON.stringify(nextBookings)); } catch { /* The demo still confirms within this session. */ }
    setConfirmed(true);
  }

  function trapFocus(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return <div className="aura-booking-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section ref={panelRef} className="aura-booking-dialog" role="dialog" aria-modal="true" aria-labelledby="aura-booking-title" onKeyDown={trapFocus}>
      <button ref={closeRef} className="aura-booking-close" type="button" onClick={onClose} aria-label="Close booking window"><X size={20} /></button>
      {confirmed ? <div className="aura-booking-confirmation" role="status">
        <span className="aura-booking-check"><Check size={27} /></span>
        <p className="aura-eyebrow">DEMO BOOKING COMPLETE</p>
        <h2 id="aura-booking-title">Your time is saved.</h2>
        <p className="aura-booking-confirmation-lead">{displayDate(selectedDate)} at {selectedTime}<br />{reason}</p>
        <p>This is a portfolio demo. Your selection is saved only in this browser; no appointment has been sent to a clinic.</p>
        <button type="button" className="aura-booking-primary" onClick={onClose}>Back to the website <ArrowRight size={17} /></button>
      </div> : <>
        <div className="aura-booking-heading"><p className="aura-eyebrow">AURA DENTAL / BOOK A VISIT</p><h2 id="aura-booking-title">Find a time<br />that works for you.</h2><p>Choose a date, an available time and what brings you in.</p></div>
        <div className="aura-booking-layout">
          <div className="aura-booking-calendar" aria-label="Choose a date">
            <div className="aura-booking-month"><strong>{monthTitle}</strong><div><button type="button" onClick={() => setMonth(new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() - 1, 1)))} disabled={previousMonthDisabled} aria-label="Previous month"><ChevronLeft size={18} /></button><button type="button" onClick={() => setMonth(new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 1)))} disabled={nextMonthDisabled} aria-label="Next month"><ChevronRight size={18} /></button></div></div>
            <div className="aura-booking-days">{weekdays.map((day) => <span key={day}>{day}</span>)}{days.map((day, index) => {
              if (!day) return <span key={`empty-${index}`} />;
              const key = dateKey(day);
              const disabled = key < today.date || key > maxDate || day.getUTCDay() === 0 || day.getUTCDay() === 6;
              return <button key={key} type="button" disabled={disabled} aria-label={displayDate(key)} aria-pressed={selectedDate === key} className={selectedDate === key ? "is-selected" : ""} onClick={() => { setSelectedDate(key); setSelectedTime(""); }}>{day.getUTCDate()}</button>;
            })}</div>
            <p className="aura-booking-calendar-note">Sample availability · weekdays · Cyprus time</p>
          </div>
          <div className="aura-booking-times"><div className="aura-booking-times-heading"><Clock3 size={17} /><strong>{selectedDate ? displayDate(selectedDate) : "Select a date"}</strong></div>{selectedDate ? <div className="aura-booking-time-grid">{timeSlots.map((time, index) => { const status = slotStatus(time, index); return <button key={time} type="button" disabled={status !== "available"} className={selectedTime === time ? "is-selected" : ""} aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)}><span>{time}</span>{status !== "available" && <small>{status === "passed" ? "Passed" : "Booked"}</small>}</button>; })}</div> : <p className="aura-booking-empty">Available appointment times will appear here.</p>}</div>
        </div>
        {selectedTime && <fieldset className="aura-booking-reasons"><legend>What brings you in?</legend><div>{reasons.map((item) => <button key={item} type="button" aria-pressed={reason === item} className={reason === item ? "is-selected" : ""} onClick={() => setReason(item)}>{item}</button>)}</div></fieldset>}
        <div className="aura-booking-footer"><p>Concept booking preview. No real appointment will be made.</p><button type="button" className="aura-booking-primary" disabled={!selectedDate || !selectedTime || !reason} onClick={confirm}>Confirm demo booking <ArrowRight size={17} /></button></div>
      </>}
    </section>
  </div>;
}
