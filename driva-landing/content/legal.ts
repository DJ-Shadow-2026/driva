// Draft legal copy. Pending legal review: do not treat as final.
// Rules: no em dashes.

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = { title: string; description: string; updated: string; sections: LegalSection[] };

export const legalBanner = "Draft. Pending legal review.";
export const legalBack = "Back to Driva";

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  description: "How Driva handles the information you share when you join the waitlist.",
  updated: "Last updated October 1, 2026",
  sections: [
    {
      heading: "What this covers",
      body: [
        "This policy covers the Driva waitlist at driva.app. The Driva app will have its own privacy disclosure when it launches.",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "When you join the waitlist, we collect your name, your email address, the car you drive or the car you want, your Instagram handle if you choose to share it, and whether you are between cars right now.",
        "We also record the campaign source that brought you here (for example, a utm tag or an invite link), the browser you used, and the time you signed up.",
      ],
    },
    {
      heading: "Why we collect it",
      body: [
        "We use this information to manage the waitlist, to tell you when Driva opens in Miami, to select Founding Members, to understand which channels bring people to Driva, and to credit members who invite others.",
        "We only email you about Driva.",
      ],
    },
    {
      heading: "What we don't do",
      body: [
        "Driva does not sell your personal data. We don't share it with advertisers or data brokers.",
      ],
    },
    {
      heading: "Service providers",
      body: [
        "We use a small number of providers to run the waitlist: a database host to store signups, an email provider to send confirmations, and analytics tools to measure how the site is used. They process data only on our behalf.",
      ],
    },
    {
      heading: "Location data in the app",
      body: [
        "The future Driva app will record the routes of drives you choose to track. That location data will be governed by the app's own privacy disclosure, which you will see before you record a drive. The waitlist does not collect your location.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You can ask us to see, correct, or delete your waitlist information at any time. Email hello@driva.app from the address you signed up with and we will take care of it.",
      ],
    },
    {
      heading: "Contact",
      body: ["Questions about this policy: hello@driva.app."],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms",
  description: "The terms for joining the Driva waitlist.",
  updated: "Last updated October 1, 2026",
  sections: [
    {
      heading: "The waitlist",
      body: [
        "Joining the Driva waitlist is free. It reserves your place in line for early access to Driva and lets us contact you about the launch. It is not an account and does not guarantee access by a specific date.",
      ],
    },
    {
      heading: "Founding Members",
      body: [
        "Driva will select up to twenty Founding Members from the waitlist. Selection is at Driva's discretion. Being on the waitlist, or inviting others, does not guarantee selection.",
      ],
    },
    {
      heading: "Your information",
      body: [
        "Please give accurate details when you sign up. We handle what you share as described in our Privacy Policy.",
      ],
    },
    {
      heading: "Invite links",
      body: [
        "You can share your invite link with people you know. Please don't spam it or post it where it isn't welcome. We may remove signups that look automated or fraudulent.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "We may update these terms as Driva gets closer to launch. The app will have its own terms of service, which you will accept when you create an account.",
      ],
    },
    {
      heading: "Contact",
      body: ["Questions about these terms: hello@driva.app."],
    },
  ],
};
