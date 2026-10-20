"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 border border-fog-50/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-fog-50 transition-colors duration-150 hover:bg-signal-500 hover:border-signal-500"
    >
      Back to top
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
