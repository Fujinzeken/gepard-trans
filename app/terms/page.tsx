import type { Metadata } from "next";

import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions | Gepard Trans Logistics INC",
  description: "Terms and Conditions, including SMS messaging terms, for Gepard Trans Logistics INC.",
};

export default function TermsPage() {
  return <LegalPage title="Terms and Conditions" file="terms.txt" />;
}
