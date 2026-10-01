# Driva Landing Page: Project Rules

Read this file before every task. It overrides your defaults.

## 1. What this is
- A single-page waitlist site for Driva at **driva.app**.
- Driva is a verified social platform for car enthusiasts. Users verify ownership by VIN, record real drives, and share them as map-and-stats posts.
- **Job of the page:** collect waitlist signups and build early traction in Miami. Nothing else.
- **Audience:** Miami enthusiast owners, high-end collectors, and aspirational enthusiasts who follow car culture.
- **One conversion action:** Join the Waitlist. No secondary application form. No app store badges.

## 2. Stack
- Next.js 15 (App Router, TypeScript, React Server Components by default).
- Tailwind CSS v4. Design tokens defined as CSS variables in `app/globals.css`, mapped into Tailwind theme.
- Framer Motion for the single signature animation only (see section 6).
- Supabase (Postgres) for waitlist storage. Writes happen **server-side only** through a Next.js Server Action using the service role key. The browser never talks to Supabase directly.
- PostHog (product analytics) and Meta Pixel (future paid traffic). Both load only in production and only when env vars are present.
- Deploy target: Vercel. Domain: driva.app.
- Package manager: pnpm.

## 3. Environment variables
```
NEXT_PUBLIC_SITE_URL=https://driva.app
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=        # server only, never prefix with NEXT_PUBLIC
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_META_PIXEL_ID=
RESEND_API_KEY=                   # optional; confirmation email is skipped if empty
WAITLIST_FROM_EMAIL=hello@driva.app
```
- Ship a `.env.example` with these keys and no values.
- The site must build and render with **all values empty**. In that state the form shows a clear "Waitlist is not connected yet" error in development only, and analytics silently no-op.

## 4. Brand tokens
The brand is fixed: near-black with Driva orange. Follow it exactly.

| Token | Hex | Use |
|---|---|---|
| `--asphalt` | `#0C0D0F` | Page background |
| `--tarmac` | `#16171A` | Raised surfaces (cards, form fields) |
| `--graphite` | `#2A2C31` | Borders, map street lines, dividers |
| `--fog` | `#8C9097` | Secondary text, labels |
| `--chalk` | `#F3F1EC` | Primary text |
| `--signal` | `#FF6A00` | Primary orange: CTA, route line, verified marks |
| `--signal-hot` | `#FF8A1F` | Orange highlight end of gradients and route glow only |

- Orange is earned. Use it for the CTA, the route line, verified badges, and focus rings. Never for body text, section backgrounds, or decoration.
- Founding Member badge: muted gold outline `#C9A45C` on `--tarmac`, matching the MVP badge.
- Contrast: all text must pass WCAG AA against its background.

## 5. Typography
- One family: **Archivo** (Google Fonts, variable, load `wdth` 62 to 125 and `wght` 400 to 900 via `next/font/google`).
- **Display:** Archivo at `wdth 125`, `wght 800`, tight tracking (`-0.02em`), sentence case. The extended width echoes automotive badging and the DRIVA wordmark. This is the personality of the page.
- **Body:** Archivo at `wdth 100`, `wght 400`, 17px base on mobile, 18px on desktop, line height 1.55, max line length 68ch.
- **Data and stats:** Archivo at `wdth 112`, `wght 700`, `font-variant-numeric: tabular-nums`. No monospace anywhere.
- Type scale (desktop): 76 / 52 / 34 / 24 / 18 / 15 / 13. Mobile hero drops to 44.
- Labels and microcopy stay in sentence case. Do not put tracked all-caps eyebrows above every heading. One exception: the small "Verified" badge text inside product cards may match the app.

## 6. Motion
- **One signature moment:** in the "Track every drive" section, an orange route line draws itself across a stylized dark street grid as the user scrolls, while distance, duration, and average speed count up in sync. Driven by scroll progress (`useScroll` + `useTransform`), not a timer.
- Hero: a single page-load sequence (headline, then phone, then route glow), under 1.2s total.
- Everything else is static. No fade-up on every section. No hover lift on every card.
- Respect `prefers-reduced-motion`: show the completed route and final stats immediately.

## 7. Copy rules (non-negotiable)
- All page copy lives in `content/copy.ts`, sourced from `COPY.md`. Do not invent or rewrite copy in components.
- **No em dashes** anywhere in user-facing text. Use periods, commas, or colons.
- Do not use the words "community" or "standard" anywhere on the page, in metadata, or in alt text.
- No arrows appended to button or link text.
- No middle-dot meta strings (`A · B · C`) in new copy.
- Never claim features are live if the PRD marks them as future. Future items appear only in the "Coming to Driva" strip.
- No public-road speed language: never "fastest", "top speed", "race", or "leaderboard".
- Partners: "Prestige Imports" and "Porsche Club of Miami" appear as **text only**. No logos until official files are supplied and approved.

## 8. People and content
- Show **only** the demo profiles Maya Chen, Theo Grant, and Sofia Reyes. Their data is in `content/demo-drives.ts`.
- Never include Brett David or Josep Amiguet, their cars, or their images anywhere.
- Demo profiles are placeholders to be swapped. Keep all profile data in the one content file so a swap requires no component changes.
- Rebuild drive posts as **native coded components** using the cropped photos in `public/demo/`. Do not drop raw app screenshots onto the page. The goal is to show an elevated version of the MVP UI.

## 9. Project structure
```
app/
  layout.tsx            # fonts, metadata, analytics providers
  page.tsx              # section composition only
  globals.css           # tokens
  actions/waitlist.ts   # server action
  privacy/page.tsx
  terms/page.tsx
  opengraph-image.tsx   # generated OG image
components/
  sections/             # one file per page section
  drive-card.tsx        # elevated drive post component
  phone-frame.tsx
  route-map.tsx         # SVG street grid + animated polyline
  waitlist-form.tsx     # client component
  verified-badge.tsx
  founding-badge.tsx
content/
  copy.ts
  demo-drives.ts
lib/
  analytics.ts          # track() wrapper for PostHog + Meta
  supabase-server.ts
public/
  brand/  demo/
supabase/migrations/0001_waitlist.sql
```

## 10. Quality floor
- Lighthouse mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.
- Images via `next/image`, AVIF/WebP, explicit sizes, hero image `priority`.
- Visible keyboard focus (2px `--signal` ring with 2px offset).
- Works from 360px wide to 1920px wide. Test 360, 390, 768, 1280, 1440.
- No layout shift from fonts or images (CLS under 0.05).
- Semantic HTML: one `h1`, logical heading order, labelled form fields, `aria-live` for form status.
