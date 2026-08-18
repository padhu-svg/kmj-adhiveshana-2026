"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { playTempleBellSound } from "@/lib/utils";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import GoldenBorder from "@/components/GoldenBorder";
import { cn } from "@/lib/utils";

const ENTRANCE_KEY = "kmj-entrance-seen";

interface TempleEntranceProps {
  onComplete: () => void;
}

export default function TempleEntrance({ onComplete }: TempleEntranceProps) {
  const [phase, setPhase] = useState<"dark" | "doors" | "opening" | "logoShow" | "done">("dark");
  const [visible, setVisible] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem(ENTRANCE_KEY)) {
        setVisible(false);
        return;
      }
    } catch {
      // Ignore storage errors
    }

    let prefersReducedMotion = false;
    try {
      prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    } catch {
      // Ignore
    }

    if (prefersReducedMotion) {
      try {
        sessionStorage.setItem(ENTRANCE_KEY, "1");
      } catch {}
      setVisible(false);
      onComplete();
      return;
    }

    // Sequence:
    // 0ms: Initial state
    // 200ms: Doors visible
    // 600ms: Doors start swinging open
    // 1600ms: Logo 1 revealed & highlighted for 3.5s (until 5100ms)
    // 5100ms: Fade transition out
    // 5600ms: Entrance done, landing page loaded
    const timers = [
      setTimeout(() => setPhase("doors"), 200),
      setTimeout(() => setPhase("opening"), 600),
      setTimeout(() => setPhase("logoShow"), 1600),
      setTimeout(() => {
        setPhase("done");
        try {
          sessionStorage.setItem(ENTRANCE_KEY, "1");
        } catch {}
      }, 5100),
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 5600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const handleInteraction = () => {
    if (!soundPlayed) {
      playTempleBellSound();
      setSoundPlayed(true);
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        onClick={handleInteraction}
        onKeyDown={handleInteraction}
        role="presentation"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "done" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Dark Temple Atmosphere Background */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            backgroundColor:
              phase === "done" ? "transparent" : "rgba(25, 10, 6, 0.98)",
          }}
        />

        {/* Central Logo 1 Display — Revealed when doors open and stays for 3.5s */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: phase === "logoShow" || phase === "opening" ? 1 : 0,
            scale: phase === "logoShow" ? 1 : 0.9,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative flex flex-col items-center">
            {/* Radial Divine Backlight */}
            <div className="absolute inset-0 bg-gradient-radial from-gold/40 via-saffron/20 to-transparent blur-2xl -z-10 transform scale-150" />

            <GoldenBorder className="p-2 sm:p-3 bg-[var(--color-card)] shadow-temple max-w-[190px] sm:max-w-[230px] w-full">
              <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "252/370" }}>
                <Image
                  src={IMAGES.kmjLogo}
                  alt={IMAGE_ALT.kmjLogo}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 190px, 230px"
                />
              </div>
            </GoldenBorder>

            <motion.div
              className="mt-4 text-center space-y-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: phase === "logoShow" ? 1 : 0,
                y: phase === "logoShow" ? 0 : 12,
              }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-kannada font-extrabold text-xl sm:text-2xl text-gold drop-shadow-md">
                ಕೂಟ ಮಹಾಜಗತ್ತು
              </p>
              <p className="font-cinzel text-xs sm:text-sm text-gold-light tracking-widest">
                Koota Maha Jagattu
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Swinging Temple Doors Frame */}
        {(phase === "doors" || phase === "opening" || phase === "logoShow") && (
          <div className="relative w-full max-w-lg px-4 sm:max-w-xl md:max-w-2xl z-20 pointer-events-none">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-gold/20 to-transparent rounded-full blur-xl opacity-60" aria-hidden="true" />

            <div className="relative flex h-[min(60vh,420px)] sm:h-[min(65vh,480px)]" style={{ perspective: "1200px" }}>
              <TempleDoor side="left" isOpen={phase === "opening" || phase === "logoShow"} />
              <TempleDoor side="right" isOpen={phase === "opening" || phase === "logoShow"} />
            </div>

            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              aria-hidden="true"
            >
              <DiyaGlow />
              <DiyaGlow />
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function TempleDoor({
  side,
  isOpen,
}: {
  side: "left" | "right";
  isOpen: boolean;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      className="relative flex-1 origin-center"
      style={{ originX: isLeft ? 0 : 1 }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isOpen ? (isLeft ? -85 : 85) : 0 }}
      transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className={cn(
          "h-full border-2 border-gold/30 relative overflow-hidden",
          isLeft ? "rounded-l-sm border-r border-gold/20" : "rounded-r-sm border-l border-gold/20"
        )}
        style={{
          background: "linear-gradient(180deg, #4A2818 0%, #3A1E10 40%, #2E1810 100%)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="absolute inset-2 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(200,155,60,0.15) 8px, rgba(200,155,60,0.15) 9px),
              repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(90,50,30,0.4) 20px, rgba(90,50,30,0.4) 22px)`,
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-4 border border-gold/20 rounded-sm" aria-hidden="true">
          <svg viewBox="0 0 100 200" className="w-full h-full opacity-20" fill="none">
            <path d="M50 20 C70 60 70 140 50 180 C30 140 30 60 50 20" stroke="#C89B3C" strokeWidth="1" />
            <circle cx="50" cy="100" r="15" stroke="#C89B3C" strokeWidth="0.5" />
          </svg>
        </div>

        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-3 h-8 rounded-full",
            isLeft ? "right-3" : "left-3"
          )}
          style={{
            background: "linear-gradient(90deg, #B8860B, #FFD700, #B8860B)",
            boxShadow: "0 0 8px rgba(255,215,0,0.4)",
          }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

function DiyaGlow() {
  return (
    <div className="w-2 h-2 rounded-full bg-gold animate-glow" style={{ boxShadow: "0 0 12px rgba(200,155,60,0.8)" }} />
  );
}