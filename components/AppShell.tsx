"use client";

import { useState, useCallback, useLayoutEffect, useEffect } from "react";
import TempleEntrance from "@/components/TempleEntrance";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientEffects from "@/components/ClientEffects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ENTRANCE_KEY = "kmj-entrance-seen";
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function AppShell({ children }: { children: React.ReactNode }) {
  // Default showEntrance to true to cover screen immediately and avoid landing page flash
  const [showEntrance, setShowEntrance] = useState(true);
  const [checked, setChecked] = useState(false);

  useIsomorphicLayoutEffect(() => {
    try {
      const seen = sessionStorage.getItem(ENTRANCE_KEY);
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (seen || reducedMotion) {
        setShowEntrance(false);
      }
    } catch {
      // Storage access blocked or restricted
    } finally {
      setChecked(true);
    }
  }, []);

  const handleEntranceComplete = useCallback(() => {
    setShowEntrance(false);
  }, []);

  return (
    <ThemeProvider>
      {showEntrance && (
        <TempleEntrance onComplete={handleEntranceComplete} />
      )}
      <div
        className="min-h-screen flex flex-col"
        style={{
          opacity: !checked && showEntrance ? 0 : 1,
          visibility: !checked && showEntrance ? "hidden" : "visible",
          transition: "opacity 0.4s ease-in-out",
        }}
      >
        <ClientEffects />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
