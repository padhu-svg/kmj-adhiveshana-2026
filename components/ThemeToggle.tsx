"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isNight = theme === "night";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        isNight
          ? "border-gold/40 bg-night-card/80 text-gold-light hover:border-gold/60"
          : "border-gold/30 bg-white/80 text-maroon hover:border-gold/50 hover:shadow-gold",
        className
      )}
      aria-label={
        isNight
          ? "Switch to Temple Day mode"
          : "Switch to Temple Night mode"
      }
      aria-pressed={isNight}
    >
      {isNight ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
      <span className="font-poppins text-xs font-medium hidden sm:inline">
        {isNight ? "Day" : "Night"}
      </span>
    </button>
  );
}
