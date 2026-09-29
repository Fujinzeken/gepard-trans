import type { Metadata } from "next";
import { Inter, Saira_Condensed } from "next/font/google";
import "./globals.css";

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-saira",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gepard Trans Logistics INC — Cost-effective logistics solutions",
  description:
    "Dry van, reefer, and flatbed loads across 96% of US ZIP codes — backed by 24/7 dispatch and the newest fleet on the road.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${saira.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-fog-50 font-body text-graphite-900">
        {children}
      </body>
    </html>
  );
}
