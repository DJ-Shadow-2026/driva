# Driva landing: design notes

The plan the components are built against. CLAUDE.md wins on any conflict.

## Point of view
The page should feel like the instrument cluster of a good car at night: near-black, quiet, one lit color. Orange shows up only where the app itself would light up (the CTA, the route, verified marks, focus). Personality comes from the extended Archivo display type, not from decoration. The one moment of motion is the route drawing itself; everything else holds still, so that moment reads as the product, not as an effect.

## Type scale
One family, Archivo variable (`wdth` 62 to 125, `wght` 400 to 900), loaded by `next/font/google` with a metric-matched fallback so there is no font shift.

| Role | Token | Desktop | Tablet | Mobile | Settings |
|---|---|---|---|---|---|
| H1 (hero only) | `text-d1` | 76 / 0.98 | 60 | 44 (clamps to 36 at 320px) | wdth 125, wght 800, -0.02em |
| H2 (section titles) | `text-d2` | 52 / 1.04 | 40 | 32 | wdth 125, wght 800, -0.02em |
| H3 (card titles, drive titles in large cards) | `text-d4` | 24 / 1.15 | 24 | 22 | wdth 125, wght 800 |
| Big stat (route section) | `text-d3` | 34 | 34 | 28 | wdth 112, wght 700, tabular |
| Point title | `text-body-lg` | 18 | 18 | 17 | wdth 112, wght 700 |
| Body | `text-body-lg` / `text-body` | 18 / 1.55 | 18 | 17 / 1.55 | wdth 100, wght 400, max 68ch |
| Small (labels, card meta, helper) | `text-sm` | 15 | 15 | 15 | wdth 100, wght 400 or 500 |
| Micro (badge text, legal, tags) | `text-xs` | 13 | 13 | 13 | wdth 100 to 112, wght 500 |

- The H1 breaks after each sentence ("Your cars." / "Your roads." / "Your story."), three short, wide lines that echo badge lettering. Done by splitting the copy string at render time; the copy itself is untouched.
- H2s run 32 to 52, never larger than the H1. Body never goes below 17px.
- Stats always use `type-data` (wdth 112, tabular). No monospace anywhere.
- No all-caps eyebrows. The only uppercase on the page is the DRIVA wordmark and the "Verified" pill inside product cards.

## Radius hierarchy
Radius grows with the size and "objectness" of the thing. Nothing is uniformly 16px.

| Element | Radius | Why |
|---|---|---|
| Phone frame (outer) | 44px | Hardware. Spec. |
| Phone screen (inner) | 34px | Outer minus bezel, so the curves stay concentric. |
| Story share card | 28px | Mirrors a phone screen, since it represents one. |
| Cards (drive card outside the phone, garage card) | 20px | Product surfaces, clearly smaller than the device. |
| Drive card inside the phone | 0 | It is a full-width feed row, as in the app. |
| Route thumbnail inset | 10px | A small tile on a photo. |
| Inputs | 12px | Tactile, flatter than cards. |
| Buttons | full pill | The one round, tappable shape. Only orange pills are buttons. |
| Founding and verified pills | full pill | They match the app's badges. |
| "In development" tag | 6px | Deliberately squarer and flatter than badges so it can't be confused with a live status. |
| Avatars | full circle | |

## Spacing rhythm
8px base. Section padding `py-24` (96px) mobile, `py-36` (144px) desktop. Inside a section: heading to body 20 to 24px, body to visual 48 to 64px, list items 32px apart. Side gutter 16px mobile, 32px from 768px, content max 1200px on a 12-column grid with 24 to 32px gaps.

Sections are separated by space, not boxes. The only section with a different surface is the waitlist (a raised tarmac panel), because it is the destination.

## Color use
- `asphalt` page, `tarmac` raised surfaces, `graphite` hairlines and map streets.
- `chalk` primary text, `fog` secondary. Both pass AA on asphalt and tarmac (fog on asphalt is about 5.9:1).
- `signal` only for: CTA pills (with asphalt text, about 7.8:1; chalk on orange fails AA), the route line, verified marks, the chain line in the thesis, focus rings.
- `signal-hot` only as the far end of the route gradient and the route glow.
- Founding gold `#C9A45C` only on the founding badge.

## Wireframes

### Nav
```
mobile                              desktop
[D DRIVA]          [Join the waitlist]   [D DRIVA]                         [Join the waitlist]
transparent at top; asphalt + graphite hairline after 24px of scroll
```

### 1. Hero
```
mobile (390)                        desktop (1280)
Launching in Miami                  | Launching in Miami                |      ~~~~~~~~~~~~
Your cars.                          | Your cars.                        |   ~~ .--------. ~~
Your roads.                         | Your roads.                       |  ~~  | Maya's |   ~~ orange route
Your story.                         | Your story.                       |      | drive  |      passes behind
Subhead (3 to 4 lines)              | Subhead, 52ch                     |      | card   |      the phone
[Join the waitlist]                 | [Join the waitlist]               |      |  tabs  |
Free to join. Founding ... 20.      | Free to join. Founding ... 20.    |      '--------'
   ~~ .--------. ~~                 |<--------- 7 columns ------------->|<--- 5 columns --->|
      | phone  |   route glow
      '--------'
```

### 2. Supporters
```
One centered fog line, small. No logos, no box.
```

### 3. Thesis
```
mobile                              desktop
H2 (3 lines)                        H2 across 9 columns
Body                                Body, 60ch
o You.                              o-------------------o-------------------o
|  A real profile...                You.                Your verified car.  Your actual drive.
o Your verified car.                A real profile...   Confirmed by VIN... Recorded by GPS...
|  Confirmed by VIN...
o Your actual drive.                one 1px orange line through three orange nodes, no numbers
   Recorded by GPS...
```

### 4. Verified garage
```
mobile                              desktop
H2                                  | garage card (5 col)  | H2                       |
Body                                | [photo 3:2]          | Body                     |
[garage card]                       | 2024  Alpine White   | Point / Point            |
Point                               | BMW M3 CS (v)        | Point / Point  (2x2)     |
Point                               | Driva miles | Drives |                          |
Point
Point
```

### 5. Track every drive (signature)
```
mobile: intro in normal flow, then a 160vh scroll track with a sticky viewport
H2
Body
+---------------------------+   sticky
|  street grid, bay, causeway|
|  route draws with scroll   |
+---------------------------+
46.1 mi   1h 09m   40 mph       count up in sync
Caption
Footnote

desktop: a 220vh track; the sticky viewport holds everything
| H2                  |  +--------------------------------+ |
| Body                |  |  map, 4:3, route draws + dot   | |
| 46.1 mi 1h09m 40mph |  |                                | |
| Footnote            |  +--------------------------------+ |
|                     |   Caption                           |
```

### 6. Share
```
mobile                              desktop
H2                                  | H2              |    /‾‾‾‾‾‾‾‾\   story card,
Body                                | Body            |   / route    /  9:16, tilted -4deg,
   /‾‾‾‾‾‾‾\                        |                 |  / car (v)  /   story progress bars
  / 9:16   /                        |                 | / stats    /    on top
 /________/                         |                 |/__DRIVA__/
```

### 7. The Driva Circle
```
mobile: horizontal scroll-snap, next card peeks by ~15%
H2 / subhead
[ Maya card ][ Theo c
desktop: three columns, equal height
[ Maya ]  [ Theo ]  [ Sofia ]
```

### 8. Coming to Driva
```
mobile: stacked               desktop: 2x2, hairline dividers, no card backgrounds
H2 / subhead                  | Achievements.   [In dev] | Routes and challenges. [In dev] |
Achievements.  [In dev]       | Events.         [In dev] | Clubs and crews.       [In dev] |
...
Quieter than live features: H3 at 20px in chalk, body in fog, no icons, no photos.
```

### 9. Built for the road
```
mobile: stacked text          desktop: H2 left (5 col), three points stacked right (7 col)
```

### 10. Founding Members
```
mobile                              desktop
[ large gold shield badge ]         | badge (5 col) | H2, body, [Join the waitlist] |
H2
Body
[Join the waitlist]
```

### 11. Waitlist (#waitlist)
```
mobile: full-width tarmac panel     desktop: tarmac panel, H2 + subhead left, form right
H2                                  | Get on the list.     | Full name                  |
Subhead                             | Miami first...       | Email                      |
Full name                           |                      | What do you drive?         |
Email                               |                      | [ ] I'm between cars       |
What do you drive?                  |                      | Instagram (helper)         |
[ ] I'm between cars right now      |                      | [Join the waitlist]        |
Instagram / helper                  |                      | consent line               |
[Join the waitlist] (full width)
consent line
```

### 12. FAQ
```
Native <details>. Question rows separated by graphite hairlines, plus icon rotates to a cross.
desktop: H2 left (4 col), list right (8 col).
```

### 13. Footer
```
[D DRIVA]  Your cars. Your roads. Your story.
Privacy  Terms  Instagram  hello@driva.app
© 2026 Driva. Made in Miami.
```

## Review against CLAUDE.md: what read as generic, and the revision
1. **First draft had a feature-card grid for the garage points** (icon, title, text in four boxes). Generic SaaS. Revised: points are plain text beside one real product object, the garage card.
2. **First draft gave every section a rounded tarmac panel.** It flattens hierarchy. Revised: only the waitlist gets a panel.
3. **First draft numbered the thesis steps 01, 02, 03.** The spec says no numbers, and numbered steps are a template tell. Revised: one orange line through three nodes.
4. **First draft put icons on the Coming to Driva items.** That makes future features look as live as real ones. Revised: text only, fog body, squarer "In development" tag.
5. **Fade-up on scroll everywhere** was cut. Only the hero load sequence and the route section move.
6. **Hover lift on cards** was cut. Hover only changes the CTA color.

## Known deviation, flagged for review
- **Drive photo aspect.** The brief asks for 4:5. The supplied photos are landscape, about 780 x 435. A 4:5 crop keeps only 45% of the width and cuts every car in half (the M3 runs nearly edge to edge). The cards use **3:2** instead, which keeps each car whole and still leaves room for the stat gradient. Switching to 4:5 is a one-token change in `drive-card.tsx` once taller photos are supplied.
- **FAQ heading.** COPY.md has no H2 for the FAQ section, and a visible heading is needed for heading order. The page uses "FAQ".
- **Brand files.** `driva-mark.png` and the lockup sit on an opaque `#111317` square, which shows as a box on `#0C0D0F`. The page renders the mark as inline SVG traced from the PNG, and the wordmark as Archivo text. The PNGs are used for the favicon and touch icon.
- **Garage card data.** The spec asks for color, Driva miles, and drives, which COPY.md doesn't provide. Placeholder values live in `content/demo-drives.ts` (`demoGarage`).

## QA results (Phase 7)
- `pnpm lint` and `pnpm build` clean. First load JS on `/`: 181 kB.
- Screenshots reviewed at 360, 390, 768, 1280, 1440. No horizontal scroll at any width.
- Fixes made from the review:
  - The hero route glow was clipped at its SVG edges, which showed a hard box. Now overflows visibly.
  - The final route stats wrapped onto two lines at 390px. Sized down on small screens and set to nowrap.
  - The "In development" tag jumped between the title row and its own line depending on title length. It now always sits above the title.
  - A screen-reader-only label inside the mobile carousel escaped its container and caused 517px of horizontal scroll at 390px. Contained.
  - The photo gradient under the stats was heavy enough to hide the cars. Lightened and shortened.
  - Sofia's route thumbnail was a thin vertical line. Redrawn wider.
- Removed decorative element: the outermost ring around the large Founding Member badge.
- Grep of app/, components/, content/, lib/ for em dashes, "community", "standard", "fastest", "top speed", "leaderboard", "Brett", "Josep": no hits.
- Lighthouse mobile (local production build): Performance 97, Accessibility 100, Best Practices 100, SEO 100. LCP 2.7s, TBT 60ms, CLS 0. Performance was 74 before two fixes: the headline load animation is now transform-only (it no longer starts at opacity 0 and delays LCP), and Framer Motion uses `LazyMotion` with `domAnimation`. PostHog is imported lazily.
- Keyboard: logo, nav CTA, hero CTA, founding CTA, every form field, consent links, FAQ summaries, and footer links are reachable in order with a 2px signal ring at 2px offset. Enter on a CTA jumps to `#waitlist`, and the next Tab lands in Full name. The mobile carousel is focusable so it can be scrolled with arrow keys.
- Reduced motion: the route section drops its scroll track and renders the finished route and final stats statically. Smooth scrolling is off.
- Form: empty submit shows all three errors and focuses Full name; invalid email errors on blur; the dream car label swaps; a sub-2.5s submit and a filled honeypot both show success and write nothing; with no Supabase keys, development shows "Waitlist is not connected yet" and production shows the server failure string.

## Still open
- Supabase, Resend, PostHog, and Meta Pixel are untested against live services (no keys in this environment). The insert, duplicate (23505), and referral paths follow the migration's schema but need one real end-to-end run.
- Instagram footer link points to instagram.com until the handle is confirmed.
- Sofia's comment count is 0 in the source data, so her card shows the comment icon without a number. Set it before launch.
- Drive photos are 3:2, not 4:5 (see "Known deviation").
- OG image unfurls (iMessage, Instagram DMs, X) need checking on the live domain.
