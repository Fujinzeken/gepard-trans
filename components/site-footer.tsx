import Image from "next/image";

/**
 * Site footer — logo, primary actions, address, phone, legal line.
 * Email omitted pending client confirmation (live site shows a truncated one).
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
    <footer className="border-t border-graphite-800 bg-graphite-900 px-6 pb-10 pt-16 text-fog-200 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[auto_1fr_auto_auto] md:gap-16">
          {/* Brand */}
          <div>
            {/* Logo lockup — opaque light plate, so it needs no tinting (the
                old placeholder mark used brightness-0/invert to go white). */}
            <Image
              src="/logo_gepard.webp"
              alt="Gepard Trans Logistics"
              width={344}
              height={96}
              className="h-12 w-auto rounded-md bg-white"
            />
            <p className="mt-4 max-w-[24ch] text-xs leading-relaxed text-fog-500">
              Scalable capacity for every load — dry van, reefer, flatbed.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-display text-sm font-bold uppercase tracking-wide text-fog-200 transition-colors duration-150 hover:text-signal-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Address */}
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-fog-500">Address</p>
            <p className="mt-3 text-sm leading-relaxed text-fog-200">
              31 W Downer Pl Unit 306
              <br />
              Aurora, IL 60506
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-fog-500">Call us</p>
            <a
              href="tel:+12622563782"
              className="mt-3 block text-sm font-semibold text-fog-50 transition-colors duration-150 hover:text-signal-500"
            >
              +1 (262) 256-3782
            </a>
            <p className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-fog-500">Email</p>
            <a
              href="mailto:gepardtranslogistics@gmail.com"
              className="mt-3 block break-all text-sm font-semibold text-fog-50 transition-colors duration-150 hover:text-signal-500"
            >
              gepardtranslogistics@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-graphite-800 pt-8 text-center md:flex-row md:justify-between">
          <p className="text-xs text-fog-500">
            © {new Date().getFullYear()} Gepard Trans Logistics INC · All rights reserved
          </p>
          <p className="text-xs text-fog-500">
            {LEGAL.map((item, i) => (
              <span key={item.label}>
                {i > 0 && <span className="mx-2 text-graphite-700">|</span>}
                <a href={item.href} className="transition-colors duration-150 hover:text-signal-500">
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