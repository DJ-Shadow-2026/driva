import { z } from "zod";
import { copy } from "@/content/copy";

const { errors } = copy.waitlist;

/** Strip "@", an instagram.com URL prefix, and any trailing path or query. */
export function cleanInstagram(raw: string): string {
  return raw
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, "")
    .replace(/^@+/, "")
    .replace(/[/?#].*$/, "");
}

const INSTAGRAM_HANDLE = /^[A-Za-z0-9._]{1,30}$/;

export const waitlistSchema = z.object({
  full_name: z.string().trim().min(2, errors.nameMissing).max(120, errors.nameMissing),
  email: z.string().trim().toLowerCase().max(254, errors.emailInvalid).pipe(z.email(errors.emailInvalid)),
  car: z.string().trim().min(2, errors.carMissing).max(120, errors.carMissing),
  between_cars: z.boolean(),
  // Optional and forgiving: an unusable handle is dropped rather than blocking the signup.
  instagram: z
    .string()
    .optional()
    .transform((v) => {
      const handle = cleanInstagram(v ?? "");
      return INSTAGRAM_HANDLE.test(handle) ? handle : null;
    }),
});

export type WaitlistField = "full_name" | "email" | "car";
export type WaitlistInput = z.input<typeof waitlistSchema>;

/** Validate a single field, for inline validation on blur. Returns the error or null. */
export function validateField(field: WaitlistField, value: string): string | null {
  const result = waitlistSchema.shape[field].safeParse(value);
  return result.success ? null : (result.error.issues[0]?.message ?? null);
}
