// All page copy, word for word from COPY.md. Components never hardcode copy.
// Rules: CLAUDE.md section 7. Sentence case, no arrows in buttons.

export const copy = {
  brand: {
    name: "Driva",
    wordmark: "DRIVA",
    url: "https://driva.app",
    domain: "driva.app",
    email: "hello@driva.app",
  },

  meta: {
    title: "Driva | Your cars. Your roads. Your story.",
    description:
      "The verified social platform for people who actually drive their cars. Join the waitlist. Launching in Miami.",
    ogText: "Your cars. Your roads. Your story.",
    themeColor: "#0C0D0F",
    logoAlt: "Driva",
  },

  nav: {
    homeLabel: "Driva home",
    button: "Join the waitlist",
  },

  hero: {
    kicker: "Launching in Miami",
    h1: "Your cars. Your roads. Your story.",
    subhead:
      "Driva is the social platform for people who actually drive their cars. Every garage is verified by VIN. Every post is a drive that really happened.",
    button: "Join the waitlist",
    microcopy: "Free to join. Founding Member seats are limited to 20.",
  },

  supporters: {
    line: "Early supporters include Prestige Imports and Porsche Club of Miami.",
  },

  thesis: {
    h2: "Anyone can post a photo with a car. Driva shows who drives it.",
    body: "Driva connects three things social media never has: the person, the car they own, and the miles they put on it. Credibility here is earned behind the wheel.",
    chain: [
      { title: "You.", body: "A real profile, built around what you drive." },
      { title: "Your verified car.", body: "Confirmed by VIN. The number stays private." },
      { title: "Your actual drive.", body: "Recorded by GPS, start to finish." },
    ],
  },

  garage: {
    h2: "A garage that proves itself.",
    body: "Add each car by VIN. Once it's verified, it carries a badge everywhere it appears, and every drive you take adds to its history.",
    points: [
      {
        title: "The badge means something.",
        body: "Only verified cars can publish public drives.",
      },
      {
        title: "Every car keeps a record.",
        body: "Miles, drives, and time behind the wheel, logged car by car.",
      },
      {
        title: "A Miata earns the same badge as a Huracán.",
        body: "Price doesn't make you credible. Driving does.",
      },
      {
        title: "Your VIN stays private.",
        body: "It's used to verify the car and never shown on your profile.",
      },
    ],
  },

  track: {
    h2: "Every drive, on the record.",
    body: "Pick your car, tap Start Drive, and put the phone away. Driva records your route, distance, time, and average speed, then turns it into a post worth keeping.",
    caption: "Causeway before the city wakes. Theo Grant, 2024 BMW M3 CS.",
    footnote: "Designed so you never need to touch it while the car is moving.",
    mapLabel:
      "Stylized map of Miami showing a drive through the downtown grid, out across a causeway over Biscayne Bay, and back.",
  },

  share: {
    h2: "Made to leave the app.",
    body: "Every drive becomes a share card sized for Instagram Stories, with your route, your car, your numbers, and your name. Post it anywhere. It always leads back to Driva.",
  },

  circle: {
    h2: "The Driva Circle.",
    subhead: "The first drivers on Driva, out on Miami's best roads.",
  },

  coming: {
    h2: "Coming to Driva.",
    subhead: "We're building these with our first members. They arrive after launch.",
    tag: "In development",
    items: [
      {
        title: "Achievements.",
        body: "Earn marks for roads driven and milestones reached. Never for speed.",
      },
      {
        title: "Routes and challenges.",
        body: "Find the roads other members love, then drive them yourself.",
      },
      {
        title: "Events.",
        body: "Meets, cruises, and group drives near you, in one place.",
      },
      {
        title: "Clubs and crews.",
        body: "Groups for your marque or your city, with owners who can answer the questions your manual can't.",
      },
    ],
  },

  road: {
    h2: "Built for the road, not the race.",
    points: [
      {
        title: "Private by choice.",
        body: "Every drive can be public or private. You decide before it posts.",
      },
      {
        title: "Your home stays yours.",
        body: "Driva reminds you to start and end public drives away from home. Automatic home-zone hiding is in development.",
      },
      {
        title: "No speed contests.",
        body: "Driva records the experience. There are no public-road rankings, and there never will be.",
      },
    ],
  },

  founding: {
    h2: "Twenty Founding Members.",
    body: "The first twenty drivers will help shape Driva before anyone else sees it. Founding Members are selected from the waitlist and carry a permanent badge on their profile.",
    button: "Join the waitlist",
  },

  waitlist: {
    h2: "Get on the list.",
    subhead: "Miami first. Everywhere soon.",
    fields: {
      fullName: { label: "Full name", placeholder: "Maya Chen" },
      email: { label: "Email", placeholder: "you@email.com" },
      car: {
        label: "What do you drive?",
        labelBetweenCars: "What's your dream car?",
        placeholder: "2022 Mazda MX-5 Miata",
      },
      betweenCars: { label: "I'm between cars right now" },
      instagram: {
        label: "Instagram",
        placeholder: "@handle",
        helper: "Optional. Helps us get to know the drivers on the list.",
      },
    },
    button: { idle: "Join the waitlist", loading: "Joining" },
    success: {
      heading: "You're on the list.",
      body: "We'll email {email} when Driva opens in Miami.",
      sharePrompt: "Know someone who drives? Send them your link.",
      shareButton: "Copy invite link",
      copied: "Link copied",
    },
    errors: {
      nameMissing: "Enter your full name.",
      emailInvalid: "Enter a valid email address.",
      carMissing: "Tell us what you drive.",
      duplicateEmail: "That email is already on the list.",
      serverFailure: "Your spot wasn't saved. Try again in a moment.",
      // Development only, shown when the Supabase env vars are empty.
      notConnected: "Waitlist is not connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.",
    },
    consent: {
      before: "By joining, you agree to our ",
      terms: "Terms",
      and: " and ",
      privacy: "Privacy Policy",
      after: ". We'll only email you about Driva.",
    },
    email: {
      subject: "You're on the Driva list",
    },
  },

  faq: {
    h2: "FAQ",
    items: [
      {
        q: "When does Driva launch?",
        a: "Miami first, starting with our Founding Members. People on the waitlist hear before anyone else.",
      },
      { q: "Is it free?", a: "Yes. Driva is free to join." },
      {
        q: "Which cars qualify?",
        a: "Any car you love to drive. Sports cars, classics, trucks, modified builds, and daily drivers with character. Credibility comes from driving, not price.",
      },
      {
        q: "Is my VIN public?",
        a: "No. It's used only to verify your car and is never shown on your profile.",
      },
      {
        q: "Do I need a car to join?",
        a: "No. Follow drivers, explore garages, and add your car when you're ready.",
      },
      {
        q: "Will people see where I live?",
        a: "Only if you publish a drive that starts there. Every drive can be private, and Driva reminds you before each one.",
      },
    ],
  },

  footer: {
    line: "Your cars. Your roads. Your story.",
    links: {
      privacy: "Privacy",
      terms: "Terms",
      instagram: "Instagram",
      // Placeholder until the handle is confirmed.
      instagramUrl: "https://instagram.com/",
    },
    legal: "© 2026 Driva. Made in Miami.",
  },

  // Labels that mirror the app UI inside product visuals.
  ui: {
    drove: "Drove",
    verified: "Verified",
    foundingMember: "Founding Member",
    stats: { distance: "Distance", duration: "Duration", avgSpeed: "Avg speed" },
    likes: "likes",
    comments: "comments",
    share: "Share",
    tabs: ["Feed", "Discover", "Drive", "Garage", "Profile"],
    garage: { drivaMiles: "Driva miles", drives: "Drives" },
    routeAlt: "Route of this drive",
  },
} as const;

export type Copy = typeof copy;
