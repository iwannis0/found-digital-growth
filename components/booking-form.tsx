"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { addDays, addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isAfter, isSameMonth, isWeekend, startOfMonth, startOfWeek, type Locale as DateLocale } from "date-fns";
import { el as greekDates } from "date-fns/locale/el";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Phone, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAttribution } from "@/lib/client-attribution";
import { trackEvent } from "@/components/analytics";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { callRequestService } from "@/lib/validation";

const meetingTypes = [["Microsoft Teams", Video], ["Zoom", Video], ["Google Meet", Video], ["Phone call", Phone]] as const;
const times = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"];
// Requests open from tomorrow, on weekdays, up to six weeks ahead.
const bookingWindowDays = 42;

// The page is prerendered, so "today" must come from the visitor's browser, never the build.
const subscribe = () => () => {};
const browserToday = () => format(new Date(), "yyyy-MM-dd");
const serverToday = () => "";

function localizeFields(fields: Record<string, string[]>, messages: Record<string, string>) {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, messages[key] ? [messages[key]] : value]));
}

export function BookingForm({ locale, copy, formCopy }: { locale: Locale; copy: Dictionary["bookingForm"]; formCopy: Dictionary["forms"] }) {
  const dateLocale = locale === "el" ? greekDates : undefined;
  const today = useSyncExternalStore(subscribe, browserToday, serverToday);
  const [monthOffset, setMonthOffset] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [requested, setRequested] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});

  function clearError(key: string) {
    setFields((current) => Object.fromEntries(Object.entries(current).filter(([name]) => name !== key)));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setFields({});
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    const missing: Record<string, string[]> = {};
    if (!date) missing.meetingDate = [copy.chooseDay];
    if (!time) missing.meetingTime = [copy.chooseTime];
    if (!meetingType) missing.meetingType = [copy.chooseMeeting];
    if (meetingType === "Phone call" && !text("phone")) missing.phone = [copy.addPhone];
    if (Object.keys(missing).length) {
      setFields(missing);
      setStatus("error");
      setMessage(copy.checkFields);
      return;
    }

    // In the visitor's language: this exact text appears in their confirmation email.
    const when = copy.when.replace("{date}", format(new Date(`${date}T00:00`), "EEEE d MMMM yyyy", { locale: dateLocale })).replace("{time}", time);

    const summary = [
      "Call request",
      `Requested time: ${when}`,
      `Meeting type: ${meetingType}`,
      text("notes") ? `\nWhat they would like to discuss:\n${text("notes")}` : "",
    ].filter(Boolean).join("\n");

    const payload = {
      name: text("name"),
      businessName: text("businessName"),
      email: text("email"),
      phone: text("phone"),
      service: callRequestService,
      requestedTime: when,
      meetingType,
      message: summary,
      companyWebsite: data.get("companyWebsite"),
      locale,
      ...getAttribution(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; message?: string; fields?: Record<string, string[]> };

      if (!response.ok) {
        setFields(localizeFields(result.fields ?? {}, formCopy.fieldErrors));
        throw new Error((result.error && formCopy.errors[result.error]) ?? result.message ?? copy.failed);
      }

      form.reset();
      setStatus("success");
      setRequested(when);

      trackEvent("generate_lead", { lead_type: "call_request" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : formCopy.retry);
    }
  }

  if (status === "success") {
    return (
      <div className="form-success booking-success" role="status">
        <CheckCircle2 />
        <p className="eyebrow">{copy.successEyebrow}</p>
        <h2>{copy.successTitle}</h2>
        <p>{copy.successBody.replace("{meeting}", meetingType === "Phone call" ? copy.phoneCall : copy.videoCall.replace("{type}", meetingType)).replace("{when}", requested)}</p>
        <button className="text-link" onClick={() => { setStatus("idle"); setDate(""); setTime(""); setMeetingType(""); setRequested(""); }}>
          {copy.again}
        </button>
      </div>
    );
  }

  return (
    <form className="site-form booking-form" onSubmit={submit} noValidate>
      <fieldset className="form-step">
        <legend><span>01</span> {copy.stepWhen}</legend>
        <div className="booking-when">
          {today ? <MonthGrid copy={copy} dateLocale={dateLocale} today={today} offset={monthOffset} onOffset={setMonthOffset} selected={date} onSelect={(day) => { setDate(day); clearError("meetingDate"); }} /> : <div className="booking-calendar booking-calendar-loading" aria-hidden="true" />}
          <div className="booking-times">
            <p>{date ? format(new Date(`${date}T00:00`), "EEEE d MMMM", { locale: dateLocale }) : copy.chooseDayFirst}</p>
            <div role="group" aria-label={copy.availableTimes}>
              {times.map((slot) => (
                <button type="button" key={slot} className="booking-chip" aria-pressed={time === slot} disabled={!date} onClick={() => { setTime(slot); clearError("meetingTime"); }}>
                  {slot}
                </button>
              ))}
            </div>
            <small>{copy.timeNote}</small>
          </div>
        </div>
        <FieldError value={fields.meetingDate?.[0] ?? fields.meetingTime?.[0]} />
      </fieldset>

      <fieldset className="form-step">
        <legend><span>02</span> {copy.stepHow}</legend>
        <div className="booking-types" role="group" aria-label={copy.meetingTypeLabel}>
          {meetingTypes.map(([label, Icon]) => (
            <button type="button" key={label} className="booking-type" aria-pressed={meetingType === label} onClick={() => { setMeetingType(label); clearError("meetingType"); }}>
              <Icon aria-hidden="true" />
              {copy.optionLabels[label] ?? label}
            </button>
          ))}
        </div>
        <FieldError value={fields.meetingType?.[0]} />
      </fieldset>

      <fieldset className="form-step">
        <legend><span>03</span> {copy.stepDetails}</legend>
        <p className="form-required-note">
          {formCopy.requiredBefore} <strong>*</strong> {formCopy.requiredAfter}
        </p>
        <div className="form-row">
          <Field label={copy.name} name="name" required autoComplete="name" error={fields.name?.[0]} />
          <Field label={copy.business} name="businessName" required autoComplete="organization" error={fields.businessName?.[0]} />
        </div>
        <div className="form-row">
          <Field label={copy.email} name="email" type="email" required autoComplete="email" error={fields.email?.[0]} />
          <Field label={copy.phone} name="phone" type="tel" required={meetingType === "Phone call"} autoComplete="tel" error={fields.phone?.[0]} />
        </div>
        <div className="form-field">
          <Label htmlFor="booking-notes">{copy.notes}</Label>
          <Textarea id="booking-notes" name="notes" rows={4} placeholder={copy.notesPlaceholder} />
        </div>
      </fieldset>

      <div className="honeypot" aria-hidden="true">
        <label>
          Company website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p className="form-error-banner" role="alert">
          {message}
        </p>
      )}

      <button className="button button-accent button-large form-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? copy.sending : <>{copy.submit} <ArrowRight /></>}
      </button>
    </form>
  );
}

function MonthGrid({ copy, dateLocale, today, offset, onOffset, selected, onSelect }: { copy: Dictionary["bookingForm"]; dateLocale?: DateLocale; today: string; offset: number; onOffset: (offset: number) => void; selected: string; onSelect: (day: string) => void }) {
  const first = addDays(new Date(`${today}T00:00`), 1);
  const last = addDays(first, bookingWindowDays - 1);
  const month = addMonths(startOfMonth(first), offset);
  const canGoBack = offset > 0;
  const canGoForward = isAfter(startOfMonth(last), month);
  const days = eachDayOfInterval({ start: startOfWeek(month, { weekStartsOn: 1 }), end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }) });
  const isOpen = (day: Date) => !isWeekend(day) && !isAfter(first, day) && !isAfter(day, last);

  return (
    <div className="booking-calendar">
      <div className="booking-calendar-head">
        <button type="button" onClick={() => onOffset(offset - 1)} disabled={!canGoBack} aria-label={copy.previousMonth}><ChevronLeft /></button>
        <strong aria-live="polite">{format(month, "LLLL yyyy", { locale: dateLocale })}</strong>
        <button type="button" onClick={() => onOffset(offset + 1)} disabled={!canGoForward} aria-label={copy.nextMonth}><ChevronRight /></button>
      </div>
      <div className="booking-calendar-grid">
        {copy.weekdays.map((day) => <span key={day} className="booking-weekday" aria-hidden="true">{day}</span>)}
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          if (!isSameMonth(day, month)) return <span key={key} />;
          return (
            <button type="button" key={key} className="booking-day" disabled={!isOpen(day)} aria-pressed={selected === key} aria-label={format(day, "EEEE d MMMM", { locale: dateLocale })} onClick={() => onSelect(key)}>
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="form-field">
      <Label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </Label>
      <Input id={name} name={name} type={type} required={required} autoComplete={autoComplete} aria-invalid={Boolean(error)} />
      <FieldError value={error} />
    </div>
  );
}

function FieldError({ value }: { value?: string }) {
  return value ? (
    <p className="field-error" role="alert">
      {value}
    </p>
  ) : null;
}
