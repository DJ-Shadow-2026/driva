# Driva landing page

Waitlist site for [driva.app](https://driva.app). Next.js 15 (App Router), Tailwind v4, Framer Motion, Supabase, PostHog, Meta Pixel.

Project rules live in `CLAUDE.md`, all copy in `COPY.md` (mirrored in `content/copy.ts`), the build plan in `BUILD_PROMPT.md`, and the design plan in `DESIGN_NOTES.md`.

## Run it
```bash
pnpm install
cp .env.example .env.local   # optional: the site builds and renders with every value empty
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # production check
pnpm lint
```

## Connect the waitlist
1. Create a Supabase project and run `supabase/migrations/0001_waitlist.sql` in the SQL editor.
2. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and to Vercel. The service role key is server-only; never prefix it with `NEXT_PUBLIC_`.
3. Optional: `RESEND_API_KEY` and `WAITLIST_FROM_EMAIL` for the confirmation email. Signups never fail because of email.
4. Optional: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_META_PIXEL_ID`. Analytics load only in production and only when set.

Without the Supabase keys the form shows "Waitlist is not connected yet" in development and the generic server error in production.

Referral counts: query the `waitlist_referrals` view.

## Where things are
| Path | What |
|---|---|
| `content/copy.ts` | Every string on the page. Edit copy here, never in components. |
| `content/demo-drives.ts` | Demo profiles (Maya, Theo, Sofia), their routes, and the garage card. Swap people here only. |
| `content/legal.ts` | Draft privacy and terms text (pending legal review). |
| `components/sections/` | One file per page section, composed in `app/page.tsx`. |
| `components/route-map.tsx` | The stylized Miami map and scroll-drawn route. |
| `app/actions/waitlist.ts` | Server action: validation, bot checks, insert, referral, email. |
| `lib/analytics.ts` | `track(event, props)` for PostHog and the Meta Pixel. |
| `assets/demo/*-mvp-reference.png` | MVP screenshots, visual reference only. Not served. |
| `assets/fonts/` | Static Archivo Expanded ExtraBold, used only by the OG image. |
| `scripts/generate-icons.mjs` | Regenerates `app/icon.png` and `app/apple-icon.png` from the mark. |

## Deploy (Vercel)
Set the project root to `driva-landing/`, add the env vars above, and point driva.app at it.
