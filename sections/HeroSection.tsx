"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import TempleDivider from "@/components/TempleDivider";
import GoldenBorder from "@/components/GoldenBorder";
import { useTheme } from "@/components/ThemeProvider";

export default function HeroSection() {
  const { theme } = useTheme();

  const scrollToRegister = () => {
    document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-16 sm:pt-20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            theme === "night"
              ? undefined
              : "radial-gradient(circle at 25% 25%, rgba(200,155,60,0.06) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(122,0,30,0.04) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {theme === "night" && (
        <>
          <div className="night-diya top-[15%] left-[5%] w-3 h-3 rounded-full bg-gold animate-glow" aria-hidden="true" />
          <div className="night-diya top-[20%] right-[8%] w-2 h-2 rounded-full bg-saffron animate-glow" aria-hidden="true" />
          <div className="night-diya bottom-[25%] left-[10%] w-2 h-2 rounded-full bg-gold-light animate-glow" aria-hidden="true" />
          <div className="night-diya bottom-[30%] right-[6%] w-3 h-3 rounded-full bg-gold animate-glow" aria-hidden="true" />
        </>
      )}

      <div className="section-container relative z-10 w-full py-8 sm:py-12">
        {/* Premium Header: deity | title | logo */}
        <div
          className="flex flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:gap-10"
          data-aos="fade-up"
        >
          {/* Left — Temple Deity */}
          <div className="order-1 lg:order-1 shrink-0 w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[220px] mx-auto lg:mx-0">
            <GoldenBorder className="p-1.5 sm:p-2 bg-[var(--color-card)] shadow-temple">
              <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "252/370" }}>
                <Image
                  src={IMAGES.heroLeft}
                  alt={IMAGE_ALT.deity}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 180px, 220px"
                />
              </div>
            </GoldenBorder>
          </div>

          {/* Center — Event Title */}
          <div className="order-2 lg:order-2 flex-1 text-center min-w-0 px-2">
            <p
              className="font-cinzel tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 text-section-sub"
              style={{ color: "var(--color-accent)" }}
            >
              Koota Maha Jagattu
            </p>
            <h1
              className="font-kannada font-bold leading-tight mb-2 text-hero text-balance"
              style={{ color: "var(--color-primary)" }}
            >
              ಕೂಟ ಮಹಾಜಗತ್ತು
              <br />
              ಕೇಂದ್ರ ಅಧಿವೇಶನ 2026
            </h1>
            <p
              className="font-cinzel tracking-wide mb-4 text-section-sub"
              style={{ color: "var(--color-text-muted)" }}
            >
              Kendriya Adhiveshana 2026
            </p>

            <TempleDivider className="max-w-xs mx-auto" />

            <p
              className="font-kannada mt-4 mb-1 text-section-sub text-balance"
              style={{ color: "var(--color-text)" }}
            >
              {SITE_CONFIG.subtitleKn}
            </p>
            <p
              className="font-poppins mb-6 sm:mb-8 text-section-sub"
              style={{ color: "var(--color-text-muted)" }}
            >
              {SITE_CONFIG.subtitleEn}
            </p>

            <button
              type="button"
              onClick={scrollToRegister}
              className="btn-primary w-full sm:w-auto"
            >
              Register Now / ನೋಂದಣಿ ಮಾಡಿ
            </button>
          </div>

          {/* Right — KMJ Logo */}
          <div className="order-3 lg:order-3 shrink-0 w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[220px] mx-auto lg:mx-0">
            <GoldenBorder className="p-1.5 sm:p-2 bg-[var(--color-card)] shadow-temple">
              <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "252/370" }}>
                <Image
                  src={IMAGES.heroRight}
                  alt={IMAGE_ALT.kmjLogo}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 180px, 220px"
                />
              </div>
            </GoldenBorder>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToRegister}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full p-1"
        style={{ color: "var(--color-accent)" }}
        aria-label="Scroll to registration"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
