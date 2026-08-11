"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientEffects from "@/components/ClientEffects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TempleEntrance = dynamic(
  () => import("@/components/TempleEntrance"),
  { ssr: false }
);

const ENTRANCE_KEY = "kmj-entrance-seen";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showEntrance, setShowEntrance] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(ENTRANCE_KEY);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!seen && !reducedMotion) {
      setShowEntrance(true);
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
      <ClientEffects />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
