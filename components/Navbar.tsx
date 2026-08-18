"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import { useScrollPosition } from "@/hooks/useScrollEffects";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 40;

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        isScrolled
          ? "backdrop-blur-xl shadow-temple border-b"
          : "bg-transparent"
      )}
      style={{
        backgroundColor: isScrolled ? "var(--color-nav-bg)" : "transparent",
        borderColor: "var(--color-border)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[4.5rem]">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-2 sm:gap-3 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 overflow-hidden border border-[var(--color-border)] rounded-sm">
              <Image
                src={IMAGES.kmjLogo}
                alt={IMAGE_ALT.kmjLogo}
                fill
                className="object-contain p-0.5"
                sizes="40px"
              />
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="font-kannada font-bold text-sm leading-tight truncate" style={{ color: "var(--color-primary)" }}>
                ಕೂಟ ಮಹಾಜಗತ್ತು
              </p>
              <p className="font-cinzel text-xs tracking-wide truncate" style={{ color: "var(--color-accent)" }}>
                Koota Maha Jagattu
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 xl:px-4 py-2 font-kannada font-bold text-base transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                style={{ color: "var(--color-text)" }}
              >
                {link.labelKn}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
            <ThemeToggle className="ml-2" />
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#register");
              }}
              className="ml-2 btn-primary font-kannada font-bold !w-auto !py-2 !px-5 !text-sm"
            >
              ನೋಂದಣಿ / Register
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              style={{ color: "var(--color-primary)" }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 border-t",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        style={{
          backgroundColor: "var(--color-nav-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="section-container py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block w-full px-4 py-3 font-kannada font-bold text-base rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              style={{ color: "var(--color-text)" }}
            >
              {link.labelKn}
              <span className="font-poppins text-xs ml-2 opacity-60 font-normal">
                ({link.label})
              </span>
            </a>
          ))}
          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#register");
            }}
            className="block w-full btn-primary font-kannada font-bold mt-2"
          >
            ನೋಂದಣಿ / Register
          </a>
        </div>
      </div>
    </nav>
  );
}
