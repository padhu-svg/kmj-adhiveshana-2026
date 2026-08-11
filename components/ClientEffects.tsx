"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    try {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      import("aos").then((AOS) => {
        AOS.default.init({
          duration: 700,
          easing: "ease-out-cubic",
          once: true,
          offset: 60,
          disable: false,
        });
      }).catch(() => {
        // Silently catch AOS load errors
      });
    } catch {
      // Ignore
    }
  }, []);

  return null;
}
