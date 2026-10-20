import Image from "next/image";

/**
 * Site footer — light chrome, dark-red rules, dark logo on fog/white.
 */

const NAV = [
  { label: "Get a quote", href: "/#contact" },
  { label: "Contact us", href: "/#contact" },
  { label: "Drive for us", href: "/drive-for-us" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-graphite-900/10 bg-white px-6 pb-10 pt-16 text-graphite-700 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="h-1 w-16 bg-signal-500" aria-hidden />

        <div className="mt-8 grid gap-12 md:grid-cols-[auto_1fr_auto_auto] md:gap-16">
          <div>
            <Image
              src="/logo_gepard.webp"
              alt="Gepard Trans Logistics"
              width={344}
              height={96}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-[24ch] text-xs leading-relaxed text-graphite-500">
              Scalable capacity for every load — dry van, reefer, flatbed.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-display text-sm font-bold uppercase tracking-wide text-graphite-800 transition-colors duration-150 hover:text-signal-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-graphite-500">
              Address
            </p>
            <p className="mt-3 text-sm leading-relaxed text-graphite-700">
              31 W Downer Pl Unit 306
              <br />
              Aurora, IL 60506
            </p>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-graphite-500">
              Call us
            </p>
            <a
              href="tel:+12622563782"
              className="mt-3 block text-sm font-semibold text-graphite-950 transition-colors duration-150 hover:text-signal-500"
            >
              +1 (262) 256-3782
            </a>
            <p className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-graphite-500">
              Email
            </p>
            <a
              href="mailto:gepardtranslogistics@gmail.com"
              className="mt-3 block break-all text-sm font-semibold text-graphite-950 transition-colors duration-150 hover:text-signal-500"
            >
              gepardtranslogistics@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-graphite-900/10 pt-8 text-center md:flex-row md:justify-between">
          <p className="text-xs text-graphite-500">
            © {new Date().getFullYear()} Gepard Trans Logistics INC · All rights
            reserved
          </p>
          <p className="text-xs text-graphite-500">
            {LEGAL.map((item, i) => (
              <span key={item.label}>
                {i > 0 && <span className="mx-2 text-fog-300">|</span>}
                <a
                  href={item.href}
                  className="transition-colors duration-150 hover:text-signal-500"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
