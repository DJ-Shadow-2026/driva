"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { copy } from "@/content/copy";
import { getSupabaseServer } from "@/lib/supabase-server";
import { waitlistSchema, type WaitlistField } from "@/lib/waitlist-schema";

const MIN_FILL_MS = 2500;
const { errors } = copy.waitlist;

export type WaitlistPayload = {
  full_name: string;
  email: string;
  car: string;
  between_cars: boolean;
  instagram?: string;
  /** Honeypot. Humans never see it. */
  company?: string;
  /** Epoch ms when the form mounted. */
  started_at: number;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  ref?: string | null;
};

export type WaitlistResult =
  | { ok: true; referralCode: string }
  | {
      ok: false;
      reason: "validation" | "duplicate" | "server";
      message?: string;
      fieldErrors?: Partial<Record<WaitlistField, string>>;
    };

/** A believable code for bots, so they get no signal that they were caught. */
function fakeSuccess(): WaitlistResult {
  return { ok: true, referralCode: randomBytes(4).toString("hex") };
}

function clean(value: string | null | undefined, max = 120): string | null {
  const v = value?.trim();
  return v ? v.slice(0, max) : null;
}

export async function joinWaitlist(payload: WaitlistPayload): Promise<WaitlistResult> {
  // Bots: a filled honeypot or an implausibly fast submission. Write nothing.
  if (payload.company && payload.company.trim() !== "") return fakeSuccess();
  if (!Number.isFinite(payload.started_at) || Date.now() - payload.started_at < MIN_FILL_MS) {
    return fakeSuccess();
  }

  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<WaitlistField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as WaitlistField;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { ok: false, reason: "validation", fieldErrors };
  }
  const data = parsed.data;

  const supabase = getSupabaseServer();
  if (!supabase) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[waitlist] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing. Signups are not being saved.",
      );
      return { ok: false, reason: "server", message: errors.notConnected };
    }
    return { ok: false, reason: "server", message: errors.serverFailure };
  }

  const h = await headers();
  const userAgent = clean(h.get("user-agent"), 500);

  // Only keep a referral that points at a real member.
  let referredBy: string | null = null;
  const ref = clean(payload.ref, 32);
  if (ref && /^[a-z0-9]+$/i.test(ref)) {
    const { data: referrer } = await supabase
      .from("waitlist")
      .select("referral_code")
      .eq("referral_code", ref)
      .maybeSingle();
    referredBy = referrer?.referral_code ?? null;
  }

  const { data: row, error } = await supabase
    .from("waitlist")
    .insert({
      full_name: data.full_name,
      email: data.email,
      car: data.car,
      between_cars: data.between_cars,
      instagram: data.instagram,
      referred_by: referredBy,
      utm_source: clean(payload.utm_source),
      utm_medium: clean(payload.utm_medium),
      utm_campaign: clean(payload.utm_campaign),
      user_agent: userAgent,
    })
    .select("referral_code")
    .single();

  if (error) {
    // Unique violation. Email is the only user-supplied unique column.
    if (error.code === "23505") {
      return { ok: false, reason: "duplicate", message: errors.duplicateEmail };
    }
    console.error("[waitlist] insert failed", error.code, error.message);
    return { ok: false, reason: "server", message: errors.serverFailure };
  }

  const referralCode: string = row.referral_code;
  await sendConfirmation(data.email, referralCode);
  return { ok: true, referralCode };
}

/** Plain confirmation email. Never allowed to fail the signup. */
async function sendConfirmation(email: string, referralCode: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const from = process.env.WAITLIST_FROM_EMAIL || copy.brand.email;
  const site = process.env.NEXT_PUBLIC_SITE_URL || copy.brand.url;
  const invite = `${site.replace(/\/$/, "")}/?ref=${referralCode}`;
  const { success } = copy.waitlist;
  const text = [
    success.heading,
    "",
    success.body.replace("{email}", email),
    "",
    success.sharePrompt,
    invite,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${copy.brand.name} <${from}>`,
      to: email,
      subject: copy.waitlist.email.subject,
      text,
    });
    if (error) console.error("[waitlist] confirmation email failed", error.message);
  } catch (err) {
    console.error("[waitlist] confirmation email failed", err);
  }
}
