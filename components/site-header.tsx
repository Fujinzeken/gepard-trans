import Image from "next/image";
import Link from "next/link";

/* Client logo lockup — red "GEPARD TRANS LOGISTICS INC" wordmark plus the
   halftone cheetah (the Gepard namesake). The supplied webp is painted on an
   opaque light plate with soft/partly transparent corners, so it sits on its
   own white rounded plate to read cleanly on the graphite header — the artwork
   has no alpha around the mark, so it can't be tinted white like the old
   placeholder triangle was. */

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-graphite-900/10 bg-graphite-950 px-6 md:px-16 lg:px-24">
      <Link href="/" className="flex items-center transition-opacity duration-150 hover:opacity-90">
        <Image
          src="/logo_gepard.webp"
          alt="Gepard Trans Logistics"
          width={344}
          height={96}
          loading="eager"
          className="h-10 w-auto rounded-md bg-white"
        />
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-fog-300 md:flex">
        {[
          ["Services", "/services"],
          ["Fleet", "/fleet"],
          ["Drive for us", "/drive-for-us"],
          ["Contact", "/#contact"],
        ].map(([label, href]) => (
          <Link key={label} href={href} className="transition-colors duration-150 hover:text-fog-50">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <a
          href="tel:+12622563782"
          className="hidden text-sm text-fog-400 transition-colors duration-150 hover:text-fog-50 lg:block"
        >
          +1 (262) 256-3782
        </a>
        <Link
          href="/#contact"
          className="rounded-full bg-signal-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-graphite-950 transition-colors duration-150 hover:bg-signal-600"
        >
          Get a quote
        </Link>
      </div>
    </header>
  );
}
