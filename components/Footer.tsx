"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import TempleDivider from "./TempleDivider";

export default function Footer() {
  const { contact } = SITE_CONFIG;

  return (
    <footer
      id="contact"
      className="relative pt-12 sm:pt-16 pb-6 sm:pb-8"
      style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}
    >
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gold-gradient" aria-hidden="true" />

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 sm:mb-12 items-start">
          {/* Left Column: Branding */}
          <div className="text-center md:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto md:mx-0 mb-4 overflow-hidden border border-[var(--color-border)] rounded-sm">
              <Image
                src={IMAGES.kmjLogo}
                alt={IMAGE_ALT.kmjLogo}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </div>
            <h3 className="font-kannada font-extrabold text-lg sm:text-xl mb-1" style={{ color: "var(--color-primary)" }}>
              ಕೂಟ ಮಹಾಜಗತ್ತು
            </h3>
            <p className="font-cinzel text-xs tracking-wider" style={{ color: "var(--color-accent)" }}>
              Koota Maha Jagattu
            </p>
          </div>

          {/* Right Column: Contact Details */}
          <div className="text-center md:text-left">
            <h4 className="font-kannada font-bold mb-4 text-base sm:text-lg" style={{ color: "var(--color-accent)" }}>
              ಸಂಪರ್ಕ / Contact
            </h4>
            <div className="space-y-4 font-poppins text-sm" style={{ color: "var(--color-text-muted)" }}>
              {/* President */}
              <div className="space-y-1">
                <p className="font-kannada font-bold text-sm sm:text-base text-[var(--color-primary)]">
                  {contact.president.titleKn} <span className="font-poppins text-xs font-normal opacity-75">/ {contact.president.titleEn}</span>
                </p>
                <a
                  href={`tel:${contact.president.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
                >
                  <Phone size={14} className="text-[var(--color-accent)] shrink-0" aria-hidden="true" />
                  <span className="font-medium">{contact.president.phone}</span>
                </a>
              </div>

              {/* Secretary */}
              <div className="space-y-1">
                <p className="font-kannada font-bold text-sm sm:text-base text-[var(--color-primary)]">
                  {contact.secretary.titleKn} <span className="font-poppins text-xs font-normal opacity-75">/ {contact.secretary.titleEn}</span>
                </p>
                <a
                  href={`tel:${contact.secretary.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
                >
                  <Phone size={14} className="text-[var(--color-accent)] shrink-0" aria-hidden="true" />
                  <span className="font-medium">{contact.secretary.phone}</span>
                </a>
              </div>

              {/* Committee Members */}
              <div className="space-y-1">
                <p className="font-kannada font-bold text-sm sm:text-base text-[var(--color-primary)]">
                  {contact.committee.titleKn} <span className="font-poppins text-xs font-normal opacity-75">/ {contact.committee.titleEn}</span>
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center md:justify-start">
                  {contact.committee.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1.5 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
                    >
                      <Phone size={14} className="text-[var(--color-accent)] shrink-0" aria-hidden="true" />
                      <span className="font-medium">{phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="pt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
                >
                  <Mail size={16} className="text-[var(--color-accent)] shrink-0" aria-hidden="true" />
                  <span className="break-all font-medium">{contact.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <TempleDivider className="opacity-30" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-poppins" style={{ color: "var(--color-text-muted)" }}>
          <p>&copy; 2026 Koota Maha Jagattu. All Rights Reserved.</p>

          <a
            href="https://www.devifylabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded px-2 py-1 transition-all duration-300 hover:text-[var(--color-accent)]"
          >
            <span>Developed by</span>
            <div className="relative w-4 h-4 shrink-0">
              <Image
                src="/images/devifylabs-logo.png"
                alt="Devify Labs LLP"
                fill
                className="object-contain transition-transform group-hover:scale-110"
                sizes="16px"
              />
            </div>
            <span className="font-semibold text-[#FF5722] group-hover:underline">
              Devify Labs LLP
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
