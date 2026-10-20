import type { Metadata } from "next";

import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Gepard Trans Logistics INC",
  description: "How Gepard Trans Logistics INC collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" file="privacy.txt" />;
}
