# Driva Landing Page: Claude Code Build Prompts

## How to use this kit
1. Create an empty folder `driva-landing`, then copy everything from this kit into it (`CLAUDE.md`, `COPY.md`, `BUILD_PROMPT.md`, `supabase/`, `assets/`).
2. Open the folder in Claude Code.
3. Paste the prompts below **one phase at a time**. Review the result in the browser before moving to the next phase. One phase per message keeps each run focused and saves usage.
4. Supabase setup (whenever you're ready): create a project, run `supabase/migrations/0001_waitlist.sql` in the SQL editor, then add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and to Vercel.

---

## Phase 0: Scaffold and design plan
```
Read CLAUDE.md, COPY.md, and BUILD_PROMPT.md in full before doing anything.

1. Scaffold a Next.js 15 app in this folder with TypeScript, App Router, Tailwind v4, ESLint, and pnpm. Keep the kit files where they are.
2. Move assets/brand/* to public/brand/ and assets/demo/*.jpg to public/demo/. Keep the *-mvp-reference.png files out of public/; they are visual reference only.
3. Install: framer-motion, zod, @supabase/supabase-js, posthog-js, resend.
4. Set up Archivo via next/font/google with the wdth and wght axes, and define every brand token from CLAUDE.md section 4 as CSS variables in app/globals.css, mapped into the Tailwind theme.
5. Create content/copy.ts and content/demo-drives.ts from COPY.md exactly.
6. Create .env.example with the keys in CLAUDE.md section 3.
7. Before writing any section components, write DESIGN_NOTES.md with: the type scale, the radius hierarchy (phone frame, cards, inputs, badges each get a deliberate radius), spacing rhythm, and an ASCII wireframe of each section at mobile and desktop. Then review the plan against CLAUDE.md and note anything that reads like a generic template, and revise it.

Do not build sections yet. Show me DESIGN_NOTES.md when done.
```

## Phase 1: Shell, hero, and the drive card
```
Build the shared components and hero.

drive-card.tsx: an elevated version of the MVP feed post (see assets/demo/*-mvp-reference.png for the current look). Improve it, do not copy it:
- Header: avatar, name, Founding Member badge if applicable, handle, and time.
- "Drove" line with the car name and an orange verified mark.
- Drive title in display type.
- Photo at 4:5 with next/image. The three stats sit on a dark gradient across the bottom of the photo in tabular figures, not in a separate grey band.
- A small route thumbnail (SVG polyline in orange on graphite) inset in the photo's top-right corner, signalling that the first slide of every Driva post is the route.
- Caption, then like, comment, and share counts in fog grey. Icons from lucide-react.
- Props come from demoDrives. No hardcoded people.

phone-frame.tsx: a modern phone silhouette with a 44px outer radius, a thin graphite bezel, and a dynamic island. Renders children inside a scroll-locked viewport. Include the app's bottom tab bar (Feed, Discover, Drive, Garage, Profile) with the raised orange Drive button, rendered as code using the Driva mark.

Nav: sticky, transparent at top, gains an asphalt background with a graphite bottom border after 24px of scroll. Logo left, "Join the waitlist" button right, which smooth-scrolls to #waitlist.

Hero (desktop: headline block left-aligned in roughly 7 of 12 columns, phone right; mobile: kicker, H1, subhead, button, microcopy, then the phone below):
- Copy from COPY.md section 1.
- Behind the phone: a long orange route polyline with a soft signal-hot glow, partially masked so it appears to pass behind the device.
- Page-load sequence under 1.2s: headline, then phone, then route glow. Nothing else animates on load.
- Phone shows Maya's drive card.

Then the supporters line (COPY.md section 2) as quiet fog-grey text. No logos.
```

## Phase 2: Thesis, garage, and the signature route section
```
Build COPY.md sections 3, 4, and 5.

Thesis: the three-part chain (You, Your verified car, Your actual drive) is a real sequence, so connect the steps with a single thin orange line that runs between them (vertical on mobile, horizontal on desktop). No numbers.

Verified garage: show a garage card for Theo's M3 CS in the elevated style (photo, year and color, name, verified badge, Driva miles, drives) beside the four points. Every badge in this section uses verified-badge.tsx.

Track every drive (the one signature moment on the page):
- route-map.tsx renders a stylized, Miami-inspired SVG street grid: graphite street lines on asphalt, a slightly lighter body of water, and a causeway crossing it. Abstract, not a real map tile. No map API keys.
- One orange polyline follows a plausible route: city grid, out across the causeway, and back toward the downtown grid.
- Desktop: a sticky section about 220vh tall. As the user scrolls through it, the path draws from 0 to 100% using pathLength driven by useScroll and useTransform. A small glowing dot leads the line.
- The three stats (46.1 mi, 1h 09m, 40 mph) count up in sync with the same scroll progress, using tabular figures so the digits never jitter.
- Mobile: the same effect, with a shorter sticky height (about 160vh).
- prefers-reduced-motion: render the finished route and final stats statically.
- Fire analytics event route_section_completed once when progress reaches 1.
```

## Phase 3: Remaining sections
```
Build COPY.md sections 6 through 10, 12, and 13.

Share: a 9:16 share card for Sofia's "Collins after dark" drive: route, car with verified mark, the three stats, @sofiareyes, and the Driva lockup at the bottom. Render it inside a slightly tilted Instagram-Story-style frame. This is a static visual, not interactive.

The Driva Circle: three drive-card instances (Maya, Theo, Sofia). Mobile: horizontal scroll-snap with the next card peeking. Desktop: three columns. No hover lift effects.

Coming to Driva: four items in a two-by-two grid on desktop and stacked on mobile. Each item gets a small "In development" tag in fog grey. Use quieter treatment than the live features above it so the hierarchy is obvious.

Built for the road: three points, text-led, no illustrations.

Founding Members: a large rendering of the founding badge (shield icon, gold outline #C9A45C), with the copy and a button that scrolls to #waitlist.

FAQ: native <details>/<summary> elements, styled. Fire faq_opened with the question text when one opens.

Footer: per COPY.md section 13.
```

## Phase 4: Waitlist form and server action
```
Build components/waitlist-form.tsx (client) and app/actions/waitlist.ts (server action), per COPY.md section 11.

Form behavior:
- Fields, labels, placeholders, helper text, and every error and success string exactly as in COPY.md.
- Checking "I'm between cars right now" swaps the car label to "What's your dream car?".
- Inline validation on blur, plus a full check on submit. Errors render under each field and are announced via aria-live.
- Fire waitlist_form_started on the first focus of any field.
- Hidden honeypot input named "company" (visually hidden, tabindex -1, autocomplete off).
- Record the time the form mounted. Reject any submission that arrives in under 2.5 seconds as a bot, returning a silent fake success.
- Read utm_source, utm_medium, utm_campaign, and ref from the URL on mount and send them with the submission.

Server action:
- Validate with zod. Trim all fields, lowercase the email, and strip a leading "@" and any instagram.com URL prefix from the Instagram handle.
- If the honeypot is filled, return a fake success and write nothing.
- Insert into public.waitlist with the service role client in lib/supabase-server.ts. Store the user agent from request headers.
- If ref matches an existing referral_code, store it in referred_by. Otherwise ignore it.
- On Postgres error 23505 (duplicate email), return the duplicate-email error.
- On success, return the new referral_code. The client shows the success state with an invite link: https://driva.app/?ref=CODE, a "Copy invite link" button, and the "Link copied" state. Fire invite_link_copied on copy.
- If RESEND_API_KEY is set, send a plain confirmation email from WAITLIST_FROM_EMAIL with the subject "You're on the Driva list" and the success body plus invite link. Never let an email failure fail the signup.
- If the Supabase env vars are missing, return the server-failure error and log a clear warning in development.
```

## Phase 5: Analytics
```
Create lib/analytics.ts exporting track(event, props), which sends to PostHog and, where mapped, to the Meta Pixel. Both no-op if their env var is missing or NODE_ENV is not production.

Events:
- cta_clicked { location: "nav" | "hero" | "founding" }
- waitlist_form_started
- waitlist_submitted { between_cars, has_instagram, referred, utm_source }  (also send Meta "Lead")
- waitlist_failed { reason: "validation" | "duplicate" | "server" }
- invite_link_copied
- faq_opened { question }
- route_section_completed

Initialize PostHog in a client provider in app/layout.tsx with autocapture off, page views on, and session recording off. Load the Meta Pixel with next/script using the afterInteractive strategy.
```

## Phase 6: Legal, SEO, and sharing
```
1. app/privacy/page.tsx and app/terms/page.tsx: simple, readable placeholder pages in the site's type system. Add a banner at the top of each that reads "Draft. Pending legal review." The privacy draft must state what the waitlist collects (name, email, car, Instagram, campaign source), why, that Driva does not sell personal data, how to request deletion (hello@driva.app), and that the future app will handle location data, governed by its own disclosure. No em dashes.
2. app/opengraph-image.tsx using next/og: 1200x630, asphalt background, the Driva mark, the H1 in Archivo extended, an orange route line, and driva.app.
3. Metadata from COPY.md: title, description, canonical URL, Open Graph, Twitter card (summary_large_image), and theme color.
4. Favicon and apple-touch-icon generated from public/brand/driva-mark.png.
5. app/sitemap.ts and app/robots.ts.
6. JSON-LD Organization schema (name Driva, url https://driva.app, logo).
```

## Phase 7: QA and self-critique
```
1. Run pnpm build and fix every type and lint error.
2. Using Playwright, screenshot the full page at 360, 390, 768, 1280, and 1440 widths. Review each screenshot critically against CLAUDE.md and DESIGN_NOTES.md. List what looks generic, cramped, or inconsistent, fix it, and re-screenshot.
3. Remove one decorative element that isn't earning its place.
4. Grep app/, components/, content/, and lib/ for "—", "community", "standard", "fastest", "top speed", "leaderboard", "Brett", and "Josep". Every hit must be removed.
5. Run Lighthouse on mobile and report the scores. Fix anything below the targets in CLAUDE.md section 10.
6. Test keyboard-only navigation through the nav, the buttons, the form, and the FAQ.
7. Test with reduced motion enabled.
8. Report what you changed and anything still open.
```

---

## Acceptance checklist (sign off before going live)
- [ ] A visitor at 390px width can read the hero and reach the form in one thumb scroll from any section via a button.
- [ ] A valid submission writes one row to `public.waitlist` with full name, email, car, between_cars, instagram, utm fields, and user agent.
- [ ] A duplicate email shows "That email is already on the list." and writes nothing.
- [ ] A filled honeypot or a sub-2.5s submission writes nothing and shows success.
- [ ] `/?ref=CODE` attributes the new signup to the referrer in the `waitlist_referrals` view.
- [ ] The success state shows a working invite link and the copy button works on iOS Safari.
- [ ] PostHog receives all seven events in production. The Meta Pixel fires Lead on submit.
- [ ] The route animation draws and counts in sync, and appears complete and static with reduced motion on.
- [ ] Only Maya, Theo, and Sofia appear. No Brett, no Josep, no partner logos.
- [ ] No em dashes and no "community" or "standard" anywhere, including metadata and alt text.
- [ ] Lighthouse mobile scores meet the targets: 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
- [ ] The OG image renders correctly when driva.app is pasted into iMessage, Instagram DMs, and X.
- [ ] Privacy and Terms pages are live, with the "pending legal review" banner.
