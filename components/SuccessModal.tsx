"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { playTempleBellSound, triggerConfetti } from "@/lib/utils";
import GoldenBorder from "@/components/GoldenBorder";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    playTempleBellSound();

    if (!reducedMotion) {
      triggerConfetti();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.4s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(56, 36, 21, 0.6)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      <GoldenBorder className="relative bg-[var(--color-card)] rounded-2xl shadow-glow p-6 sm:p-10 max-w-md w-full text-center animate-[fadeInUp_0.5s_ease-out]">
        <CheckCircle
          className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4"
          style={{ color: "var(--color-accent)" }}
          aria-hidden="true"
        />

        <h2
          id="success-title"
          className="font-kannada font-extrabold mb-2 text-section-title"
          style={{ color: "var(--color-primary)" }}
        >
          ಧನ್ಯವಾದಗಳು
        </h2>
        <p
          className="font-kannada font-bold text-base sm:text-lg mb-1"
          style={{ color: "var(--color-text)" }}
        >
          ನಿಮ್ಮ ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.
        </p>
        <p
          className="font-poppins text-xs sm:text-sm mb-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          Your registration has been received.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="btn-primary font-kannada font-bold !w-full sm:!w-auto"
          autoFocus
        >
          ಮುಚ್ಚಿ / Close
        </button>
      </GoldenBorder>
    </div>
  );
}
