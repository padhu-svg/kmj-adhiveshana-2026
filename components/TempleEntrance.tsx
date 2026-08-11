"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTempleBellSound } from "@/lib/utils";
import { cn } from "@/lib/utils";

const ENTRANCE_KEY = "kmj-entrance-seen";

interface TempleEntranceProps {
  onComplete: () => void;
}

export default function TempleEntrance({ onComplete }: TempleEntranceProps) {
  const [phase, setPhase] = useState<"dark" | "doors" | "opening" | "light" | "done">("dark");
  const [visible, setVisible] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(ENTRANCE_KEY)) {
      setVisible(false);
      onComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      sessionStorage.setItem(ENTRANCE_KEY, "1");
      setVisible(false);
      onComplete();
      return;
    }

    const timers = [
      setTimeout(() => setPhase("doors"), 300),
      setTimeout(() => setPhase("opening"), 900),
      setTimeout(() => setPhase("light"), 1800),
      setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem(ENTRANCE_KEY, "1");
      }, 2600),
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 3000),
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
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            backgroundColor:
              phase === "done" ? "transparent" : "rgba(30, 12, 8, 0.97)",
          }}
        />

        {(phase === "doors" || phase === "opening" || phase === "light") && (
          <div className="relative w-full max-w-lg px-4 sm:max-w-xl md:max-w-2xl">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-gold/20 to-transparent rounded-full blur-xl opacity-60" aria-hidden="true" />

            <div className="relative flex h-[min(60vh,420px)] sm:h-[min(65vh,480px)]" style={{ perspective: "1200px" }}>
              <TempleDoor side="left" isOpen={phase === "opening" || phase === "light"} />
              <TempleDoor side="right" isOpen={phase === "opening" || phase === "light"} />

              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "light" || phase === "opening" ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gradient-radial from-gold/40 via-saffron/20 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/30 rounded-full blur-3xl" />
              </motion.div>
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

            {phase === "doors" && (
              <motion.p
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 font-cinzel text-gold/60 text-xs tracking-widest whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Koota Maha Jagattu
              </motion.p>
            )}
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
      animate={{ rotateY: isOpen ? (isLeft ? -75 : 75) : 0 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
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