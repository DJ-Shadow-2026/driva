"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { joinWaitlist, type WaitlistPayload } from "@/app/actions/waitlist";
import { copy } from "@/content/copy";
import { track } from "@/lib/analytics";
import { validateField, type WaitlistField } from "@/lib/waitlist-schema";

const t = copy.waitlist;
const FIELD_ORDER: WaitlistField[] = ["full_name", "email", "car"];

type Values = { full_name: string; email: string; car: string; instagram: string; company: string };
type Errors = Partial<Record<WaitlistField, string>>;
type Attribution = Pick<WaitlistPayload, "utm_source" | "utm_medium" | "utm_campaign" | "ref">;

const inputClass =
  "mt-2 block h-[52px] w-full rounded-field border bg-asphalt px-4 text-[17px] text-chalk placeholder:text-fog/70 transition-colors focus:border-signal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

function inviteUrl(code: string) {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || copy.brand.url).replace(/\/$/, "");
  return `${site}/?ref=${code}`;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older iOS Safari: fall back to a selected, off-screen textarea.
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.setSelectionRange(0, text.length);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  }
}

function Field({
  id,
  label,
  error,
  helper,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15px] font-medium text-chalk">
        {label}
      </label>
      {children}
      {helper && (
        <p id={`${id}-helper`} className="mt-2 text-sm text-fog">
          {helper}
        </p>
      )}
      <p id={`${id}-error`} aria-live="polite" className="text-sm text-chalk">
        {error && (
          <span className="mt-2 flex items-start gap-2">
            <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            {error}
          </span>
        )}
      </p>
    </div>
  );
}

export function WaitlistForm() {
  const uid = useId();
  const ids = {
    full_name: `${uid}-name`,
    email: `${uid}-email`,
    car: `${uid}-car`,
    between: `${uid}-between`,
    instagram: `${uid}-instagram`,
  };

  const [values, setValues] = useState<Values>({
    full_name: "",
    email: "",
    car: "",
    instagram: "",
    company: "",
  });
  const [betweenCars, setBetweenCars] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [result, setResult] = useState<{ email: string; code: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const mountedAt = useRef<number>(0);
  const started = useRef(false);
  const attribution = useRef<Attribution>({});
  const successHeading = useRef<HTMLHeadingElement>(null);
  const fieldRefs = useRef<Partial<Record<WaitlistField, HTMLInputElement | null>>>({});

  useEffect(() => {
    mountedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    attribution.current = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      ref: params.get("ref"),
    };
  }, []);

  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
  }, [status]);

  const onFirstFocus = () => {
    if (started.current) return;
    started.current = true;
    track("waitlist_form_started");
  };

  const set = (field: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    // Once a field has shown an error, re-check it as the user fixes it.
    if (field in errors && errors[field as WaitlistField]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field as WaitlistField, value) ?? undefined }));
    }
  };

  const onBlur = (field: WaitlistField) => () => {
    // Don't nag about an empty field the user just tabbed past before typing anything.
    if (values[field] === "" && !errors[field]) return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) ?? undefined }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setFormError(null);

    const next: Errors = {};
    for (const f of FIELD_ORDER) {
      const err = validateField(f, values[f]);
      if (err) next[f] = err;
    }
    setErrors(next);
    const firstInvalid = FIELD_ORDER.find((f) => next[f]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      track("waitlist_failed", { reason: "validation" });
      return;
    }

    setStatus("submitting");
    let res;
    try {
      res = await joinWaitlist({
        full_name: values.full_name,
        email: values.email,
        car: values.car,
        between_cars: betweenCars,
        instagram: values.instagram,
        company: values.company,
        started_at: mountedAt.current,
        ...attribution.current,
      });
    } catch {
      res = { ok: false as const, reason: "server" as const, message: t.errors.serverFailure };
    }

    if (res.ok) {
      track("waitlist_submitted", {
        between_cars: betweenCars,
        has_instagram: values.instagram.trim() !== "",
        referred: Boolean(attribution.current.ref),
        utm_source: attribution.current.utm_source ?? null,
      });
      setResult({ email: values.email.trim().toLowerCase(), code: res.referralCode });
      setStatus("success");
      return;
    }

    setStatus("idle");
    track("waitlist_failed", { reason: res.reason });
    if (res.reason === "validation" && res.fieldErrors) {
      setErrors(res.fieldErrors);
      const first = FIELD_ORDER.find((f) => res.fieldErrors?.[f]);
      if (first) fieldRefs.current[first]?.focus();
      return;
    }
    if (res.reason === "duplicate") {
      setErrors({ email: res.message ?? t.errors.duplicateEmail });
      fieldRefs.current.email?.focus();
      return;
    }
    setFormError(res.message ?? t.errors.serverFailure);
  };

  const onCopy = async () => {
    if (!result) return;
    if (await copyText(inviteUrl(result.code))) {
      setCopied(true);
      track("invite_link_copied");
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  if (status === "success" && result) {
    const link = inviteUrl(result.code);
    return (
      <div className="rounded-card border border-graphite bg-asphalt p-5 md:p-8">
        <h3 ref={successHeading} tabIndex={-1} className="h3 text-chalk focus:outline-none">
          {t.success.heading}
        </h3>
        <p className="mt-3 text-chalk/80">{t.success.body.replace("{email}", result.email)}</p>
        <p className="mt-8 text-[15px] font-medium text-chalk">{t.success.sharePrompt}</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            readOnly
            value={link}
            aria-label={t.success.sharePrompt}
            onFocus={(e) => e.currentTarget.select()}
            className={`${inputClass} mt-0 border-graphite text-[15px] sm:flex-1`}
          />
          <button type="button" onClick={onCopy} className="btn-primary h-[52px] shrink-0">
            {copied ? t.success.copied : t.success.shareButton}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied ? t.success.copied : ""}
        </p>
      </div>
    );
  }

  const fieldBorder = (f: WaitlistField) => (errors[f] ? "border-signal" : "border-graphite");
  const describedBy = (id: string, f: WaitlistField, helper = false) =>
    [helper ? `${id}-helper` : null, errors[f] ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <form noValidate onSubmit={onSubmit} onFocus={onFirstFocus} className="relative grid gap-6">
      <Field id={ids.full_name} label={t.fields.fullName.label} error={errors.full_name}>
        <input
          ref={(el) => {
            fieldRefs.current.full_name = el;
          }}
          id={ids.full_name}
          name="full_name"
          type="text"
          autoComplete="name"
          placeholder={t.fields.fullName.placeholder}
          value={values.full_name}
          onChange={set("full_name")}
          onBlur={onBlur("full_name")}
          aria-invalid={Boolean(errors.full_name)}
          aria-describedby={describedBy(ids.full_name, "full_name")}
          required
          className={`${inputClass} ${fieldBorder("full_name")}`}
        />
      </Field>

      <Field id={ids.email} label={t.fields.email.label} error={errors.email}>
        <input
          ref={(el) => {
            fieldRefs.current.email = el;
          }}
          id={ids.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={t.fields.email.placeholder}
          value={values.email}
          onChange={set("email")}
          onBlur={onBlur("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy(ids.email, "email")}
          required
          className={`${inputClass} ${fieldBorder("email")}`}
        />
      </Field>

      <div className="grid gap-4">
        <Field
          id={ids.car}
          label={betweenCars ? t.fields.car.labelBetweenCars : t.fields.car.label}
          error={errors.car}
        >
          <input
            ref={(el) => {
              fieldRefs.current.car = el;
            }}
            id={ids.car}
            name="car"
            type="text"
            autoComplete="off"
            placeholder={t.fields.car.placeholder}
            value={values.car}
            onChange={set("car")}
            onBlur={onBlur("car")}
            aria-invalid={Boolean(errors.car)}
            aria-describedby={describedBy(ids.car, "car")}
            required
            className={`${inputClass} ${fieldBorder("car")}`}
          />
        </Field>

        <label htmlFor={ids.between} className="inline-flex cursor-pointer items-center gap-3 self-start text-[15px] text-chalk/85">
          <input
            id={ids.between}
            name="between_cars"
            type="checkbox"
            checked={betweenCars}
            onChange={(e) => setBetweenCars(e.target.checked)}
            className="h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[5px] border border-fog/70 bg-asphalt bg-center bg-no-repeat checked:border-signal checked:bg-signal checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22><path d=%22M5 10.5l3.2 3.2L15 7%22 fill=%22none%22 stroke=%22%230C0D0F%22 stroke-width=%222.4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')]"
          />
          {t.fields.betweenCars.label}
        </label>
      </div>

      <Field id={ids.instagram} label={t.fields.instagram.label} helper={t.fields.instagram.helper}>
        <input
          id={ids.instagram}
          name="instagram"
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={t.fields.instagram.placeholder}
          value={values.instagram}
          onChange={set("instagram")}
          aria-describedby={`${ids.instagram}-helper`}
          className={`${inputClass} border-graphite`}
        />
      </Field>

      {/* Honeypot: bots fill it, humans never see it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={set("company")}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="btn-primary h-14 w-full text-[17px] disabled:cursor-progress disabled:opacity-80"
        >
          {status === "submitting" ? t.button.loading : t.button.idle}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-chalk">
          {formError && (
            <span className="mt-4 flex items-start gap-2">
              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              {formError}
            </span>
          )}
        </p>
        <p className="mt-5 text-xs leading-relaxed text-fog">
          {t.consent.before}
          <Link href="/terms" className="rounded-sm underline underline-offset-2 hover:text-chalk">
            {t.consent.terms}
          </Link>
          {t.consent.and}
          <Link href="/privacy" className="rounded-sm underline underline-offset-2 hover:text-chalk">
            {t.consent.privacy}
          </Link>
          {t.consent.after}
        </p>
      </div>
    </form>
  );
}
