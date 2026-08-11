export default function TempleDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-6 ${className}`}>
      <div
        className="h-px flex-1 max-w-[100px] sm:max-w-[120px]"
        style={{ background: "linear-gradient(to right, transparent, var(--color-accent), transparent)" }}
        aria-hidden="true"
      />
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        className="shrink-0"
        style={{ color: "var(--color-accent)" }}
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="3" fill="currentColor" />
        <path
          d="M16 2 L18 8 L16 6 L14 8 Z M16 30 L18 24 L16 26 L14 24 Z M2 16 L8 18 L6 16 L8 14 Z M30 16 L24 18 L26 16 L24 14 Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
      <div
        className="h-px flex-1 max-w-[100px] sm:max-w-[120px]"
        style={{ background: "linear-gradient(to right, transparent, var(--color-accent), transparent)" }}
        aria-hidden="true"
      />
    </div>
  );
}
