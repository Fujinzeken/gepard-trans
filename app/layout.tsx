import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const saira = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-saira",
  display: "swap",
});

const inter = Manrope({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gepardtrans.com";
const DESCRIPTION =
  "Dry van and reefer loads across 96% of US ZIP codes — backed by 24/7 dispatch and the newest fleet on the road.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gepard Trans Logistics INC — Cost-effective logistics solutions",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Gepard Trans Logistics INC",
    title: "Gepard Trans Logistics INC — Cost-effective logistics solutions",
    description: DESCRIPTION,
    images: [{ url: "/fleet/branded-studio.jpg", alt: "Gepard Trans Logistics branded blue tractor" }],
  },
  twitter: { card: "summary_large_image" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "TransportationService",
  name: "Gepard Trans Logistics INC",
  url: SITE_URL,
  logo: SITE_URL + "/logo_gepard.webp",
  telephone: "+1-262-256-3782",
  email: "gepardtranslogistics@gmail.com",
  description: DESCRIPTION,
  areaServed: "US",
  address: {
    "@type": "PostalAddress",
    streetAddress: "31 W Downer Pl Unit 306",
    addressLocality: "Aurora",
    addressRegion: "IL",
    postalCode: "60506",
    addressCountry: "US",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${saira.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-fog-50 font-body text-graphite-900">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
