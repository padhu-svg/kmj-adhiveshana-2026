export default function TempleFrieze({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="w-full h-6"
        fill="none"
      >
        <pattern id="frieze" x="0" y="0" width="60" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M30 2 C35 8 40 12 30 18 C20 12 25 8 30 2"
            fill="#E07A00"
            opacity="0.6"
          />
          <circle cx="30" cy="12" r="2" fill="#C89B3C" />
          <path
            d="M15 12 L20 8 L20 16 Z M45 12 L40 8 L40 16 Z"
            fill="#7A001E"
            opacity="0.4"
          />
        </pattern>
        <rect width="1200" height="24" fill="url(#frieze)" />
        <rect y="20" width="1200" height="4" fill="#7A001E" opacity="0.3" />
      </svg>
    </div>
  );
}
