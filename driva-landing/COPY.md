# Driva Landing Page Copy (v1)

Source of truth for `content/copy.ts` and `content/demo-drives.ts`. Use the copy word for word.
Rules: no em dashes, no "community", no "standard", sentence case, no arrows in buttons.

---

## Metadata
- **Title:** Driva | Your cars. Your roads. Your story.
- **Description:** The verified social platform for people who actually drive their cars. Join the waitlist. Launching in Miami.
- **OG image text:** Your cars. Your roads. Your story. / driva.app
- **Theme color:** #0C0D0F

---

## Nav
- Logo: Driva mark + wordmark (links to top)
- Button: Join the waitlist (scrolls to `#waitlist`)

---

## 1. Hero
- **Kicker:** Launching in Miami
- **H1:** Your cars. Your roads. Your story.
- **Subhead:** Driva is the social platform for people who actually drive their cars. Every garage is verified by VIN. Every post is a drive that really happened.
- **Button:** Join the waitlist
- **Microcopy:** Free to join. Founding Member seats are limited to 20.
- **Visual:** Phone frame showing Maya Chen's drive card, with the orange route glowing behind the phone.

## 2. Supporters line
- Early supporters include Prestige Imports and Porsche Club of Miami.

## 3. The thesis
- **H2:** Anyone can post a photo with a car. Driva shows who drives it.
- **Body:** Driva connects three things social media never has: the person, the car they own, and the miles they put on it. Credibility here is earned behind the wheel.
- **Chain (visual sequence, three linked steps):**
  - **You.** A real profile, built around what you drive.
  - **Your verified car.** Confirmed by VIN. The number stays private.
  - **Your actual drive.** Recorded by GPS, start to finish.

## 4. Verified garage
- **H2:** A garage that proves itself.
- **Body:** Add each car by VIN. Once it's verified, it carries a badge everywhere it appears, and every drive you take adds to its history.
- **Points:**
  - **The badge means something.** Only verified cars can publish public drives.
  - **Every car keeps a record.** Miles, drives, and time behind the wheel, logged car by car.
  - **A Miata earns the same badge as a Huracán.** Price doesn't make you credible. Driving does.
  - **Your VIN stays private.** It's used to verify the car and never shown on your profile.

## 5. Track every drive (signature section)
- **H2:** Every drive, on the record.
- **Body:** Pick your car, tap Start Drive, and put the phone away. Driva records your route, distance, time, and average speed, then turns it into a post worth keeping.
- **Animated stats (count up with the route):** 46.1 mi distance / 1h 09m duration / 40 mph avg speed
- **Caption under map:** Causeway before the city wakes. Theo Grant, 2024 BMW M3 CS.
- **Footnote:** Designed so you never need to touch it while the car is moving.

## 6. Share
- **H2:** Made to leave the app.
- **Body:** Every drive becomes a share card sized for Instagram Stories, with your route, your car, your numbers, and your name. Post it anywhere. It always leads back to Driva.
- **Visual:** 9:16 share card for Sofia Reyes, "Collins after dark", showing the route, the car, the three stats, @sofiareyes, and the Driva lockup.

## 7. The Driva Circle
- **H2:** The Driva Circle.
- **Subhead:** The first drivers on Driva, out on Miami's best roads.
- **Content:** Three drive cards from `demo-drives.ts` (Maya, Theo, Sofia). Horizontal scroll-snap on mobile, three columns on desktop.

## 8. Coming to Driva
- **H2:** Coming to Driva.
- **Subhead:** We're building these with our first members. They arrive after launch.
- **Tag on each item:** In development
- **Items:**
  - **Achievements.** Earn marks for roads driven and milestones reached. Never for speed.
  - **Routes and challenges.** Find the roads other members love, then drive them yourself.
  - **Events.** Meets, cruises, and group drives near you, in one place.
  - **Clubs and crews.** Groups for your marque or your city, with owners who can answer the questions your manual can't.

## 9. Built for the road
- **H2:** Built for the road, not the race.
- **Points:**
  - **Private by choice.** Every drive can be public or private. You decide before it posts.
  - **Your home stays yours.** Driva reminds you to start and end public drives away from home. Automatic home-zone hiding is in development.
  - **No speed contests.** Driva records the experience. There are no public-road rankings, and there never will be.

## 10. Founding Members
- **H2:** Twenty Founding Members.
- **Body:** The first twenty drivers will help shape Driva before anyone else sees it. Founding Members are selected from the waitlist and carry a permanent badge on their profile.
- **Visual:** Large Founding Member badge (gold outline, shield icon), matching the app.
- **Button:** Join the waitlist

## 11. Waitlist form (`#waitlist`)
- **H2:** Get on the list.
- **Subhead:** Miami first. Everywhere soon.

**Fields**
| Field | Label | Placeholder | Required |
|---|---|---|---|
| full_name | Full name | Maya Chen | Yes |
| email | Email | you@email.com | Yes |
| car | What do you drive? | 2022 Mazda MX-5 Miata | Yes |
| between_cars | Checkbox: I'm between cars right now | | No |
| instagram | Instagram | @handle | No |

- When `between_cars` is checked, the car label changes to **What's your dream car?**
- Instagram helper text: Optional. Helps us get to know the drivers on the list.
- Hidden honeypot field `company` (bots fill it, humans never see it).

**Button states**
- Default: Join the waitlist
- Loading: Joining
- Success heading: You're on the list.
- Success body: We'll email {email} when Driva opens in Miami.
- Success share prompt: Know someone who drives? Send them your link.
- Share button: Copy invite link
- Copied state: Link copied

**Errors**
- Name missing: Enter your full name.
- Email invalid: Enter a valid email address.
- Car missing: Tell us what you drive.
- Duplicate email: That email is already on the list.
- Server failure: Your spot wasn't saved. Try again in a moment.

**Consent line:** By joining, you agree to our Terms and Privacy Policy. We'll only email you about Driva.

## 12. FAQ
- **When does Driva launch?** Miami first, starting with our Founding Members. People on the waitlist hear before anyone else.
- **Is it free?** Yes. Driva is free to join.
- **Which cars qualify?** Any car you love to drive. Sports cars, classics, trucks, modified builds, and daily drivers with character. Credibility comes from driving, not price.
- **Is my VIN public?** No. It's used only to verify your car and is never shown on your profile.
- **Do I need a car to join?** No. Follow drivers, explore garages, and add your car when you're ready.
- **Will people see where I live?** Only if you publish a drive that starts there. Every drive can be private, and Driva reminds you before each one.

## 13. Footer
- Driva lockup
- Line: Your cars. Your roads. Your story.
- Links: Privacy, Terms, Instagram (placeholder URL until the handle is confirmed), hello@driva.app
- Legal: © 2026 Driva. Made in Miami.

---

## Demo drive data (`content/demo-drives.ts`)
Placeholders. Swap here only.

```ts
export const demoDrives = [
  {
    id: "maya",
    name: "Maya Chen",
    handle: "@mayamoves",
    foundingMember: true,
    avatar: "/demo/maya-avatar.jpg",
    car: "2022 Mazda MX-5 Miata",
    verified: true,
    title: "Golden hour through the Gables",
    photo: "/demo/maya-car.jpg",
    photoAlt: "Red Mazda MX-5 Miata with the top down on a palm-lined street in Coral Gables at golden hour",
    distance: "31.8 mi",
    duration: "58m",
    avgSpeed: "33 mph",
    caption: "Top down beneath the palms, one cafecito stop, and every light turning gold.",
    likes: 286,
    comments: 22,
    postedAt: "2h ago",
  },
  {
    id: "theo",
    name: "Theo Grant",
    handle: "@theog",
    foundingMember: false,
    avatar: "/demo/theo-avatar.jpg",
    car: "2024 BMW M3 CS",
    verified: true,
    title: "Causeway before the city wakes",
    photo: "/demo/theo-car.jpg",
    photoAlt: "White BMW M3 CS on a causeway with the Miami skyline and Biscayne Bay behind it",
    distance: "46.1 mi",
    duration: "1h 09m",
    avgSpeed: "40 mph",
    caption: "Cool morning air, Biscayne Bay on both sides, and a clean run back toward Brickell.",
    likes: 341,
    comments: 27,
    postedAt: "Yesterday",
  },
  {
    id: "sofia",
    name: "Sofia Reyes",
    handle: "@sofiareyes",
    foundingMember: false,
    avatar: "/demo/sofia-avatar.jpg",
    car: "2023 Lamborghini Huracán STO",
    verified: true,
    title: "Collins after dark",
    photo: "/demo/sofia-car.jpg",
    photoAlt: "Orange Lamborghini Huracán STO on Collins Avenue at night with Art Deco hotels lit up behind it",
    distance: "27.4 mi",
    duration: "54m",
    avgSpeed: "30 mph",
    caption: "Art Deco lights, ocean air, and a V10 echoing softly down Collins Avenue.",
    likes: 512,
    comments: 0, // comment count was hidden in the source screenshot; set before launch
    postedAt: "2 days ago",
  },
];
```
