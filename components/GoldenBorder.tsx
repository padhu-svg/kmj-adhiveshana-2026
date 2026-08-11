import { cn } from "@/lib/utils";

interface GoldenBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: "full" | "top" | "bottom";
}

export default function GoldenBorder({
  children,
  className,
  variant = "full",
}: GoldenBorderProps) {
  return (
    <div
      className={cn(
        "relative",
        variant === "full" && "border-2 rounded-lg",
        variant === "top" && "border-t-2",
        variant === "bottom" && "border-b-2",
        className
      )}
      style={{ borderColor: "var(--color-border)" }}
    >
      {variant === "full" && (
        <>
          <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: "var(--color-accent)" }} />
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: "var(--color-accent)" }} />
          <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: "var(--color-accent)" }} />
          <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: "var(--color-accent)" }} />
        </>
      )}
      {children}
    </div>
  );
}
