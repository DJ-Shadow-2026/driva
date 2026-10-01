import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: `${privacy.title} | Driva`,
  description: privacy.description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
