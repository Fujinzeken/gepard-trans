import Image from "next/image";

import BackToTop from "./back-to-top";

/* Dark multi-column footer with an animated red top rail. */

const LINKS = [
  { label: "Why Gepard", href: "/#why" },
  { label: "Coverage", href: "/#coverage" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Fleet", href: "/#fleet" },
  { label: "FAQ", href: "/#faq" },
  { label: "Drive for us", href: "/drive-for-us" },
];

const SERVICES = ["Dry van (53′)", "Reefer (53′)", "Nationwide coverage", "24/7 dispatch"];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
];

const HEAD = "font-display text-sm font-bold uppercase tracking-wide text-fog-400";
const LINK = "text-sm text-fog-200 transition-colors duration-150 hover:text-signal-300";

export default function SiteFooter() {
  return (
    <footer className="relative bg-graphite-950 px-6 pb-8 pt-20 text-fog-300 md:px-16 lg:px-24">
      <div className="footer-rail absolute inset-x-0 top-0 h-1" aria-hidden />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-14">
          <div>
            <Image src="/logo_gepard_white.png" alt="Gepard Trans Logistics" width={344} height={96} className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog-400">
              Scalable capacity for every load — dry van and reefer, backed by a modern fleet and dispatch that answers around the clock.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className={HEAD}>Quick links</p>
            <ul className="mt-4 space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={LINK}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={HEAD}>Services</p>
            <ul className="mt-4 space-y-3 text-sm text-fog-200">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className={HEAD}>Contact</p>
            <address className="mt-4 space-y-3 text-sm not-italic text-fog-200">
              <a href="tel:+12622563782" className={`block font-semibold text-white ${LINK}`}>+1 (262) 256-3782</a>
              <a href="mailto:gepardtranslogistics@gmail.com" className={`block break-all ${LINK}`}>gepardtranslogistics@gmail.com</a>
              <p>31 W Downer Pl Unit 306<br />Aurora, IL 60506</p>
              <p className="text-fog-400">Dispatch: 24/7</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-fog-50/10 pt-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-fog-400">
            © {new Date().getFullYear()} Gepard Trans Logistics INC · All rights reserved
          </p>
          <p className="text-xs text-fog-400">
            {LEGAL.map((item, i) => (
              <span key={item.label}>
                {i > 0 && <span className="mx-2 text-graphite-600">|</span>}
                <a href={item.href} className="transition-colors duration-150 hover:text-signal-300">{item.label}</a>
              </span>
            ))}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
