"use client";

import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import TempleDivider from "./TempleDivider";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative pt-12 sm:pt-16 pb-6 sm:pb-8"
      style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}
    >
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gold-gradient" aria-hidden="true" />

      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="text-center sm:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0 mb-4 overflow-hidden border border-[var(--color-border)] rounded-sm">
              <Image
                src={IMAGES.kmjLogo}
                alt={IMAGE_ALT.kmjLogo}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </div>
            <h3 className="font-cinzel font-bold mb-1 text-section-sub" style={{ color: "var(--color-accent)" }}>
              ಕೂಟ ಮಹಾಜಗತ್ತು
            </h3>
          </div>

          <div className="text-center">
            <h4 className="font-cinzel mb-4 text-section-sub" style={{ color: "var(--color-accent)" }}>
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center justify-center gap-2 font-poppins text-sm transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Mail size={16} aria-hidden="true" />
                <span className="break-all">{SITE_CONFIG.contact.email}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 font-poppins text-sm transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Phone size={16} aria-hidden="true" />
                {SITE_CONFIG.contact.phone}
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left lg:text-right sm:col-span-2 lg:col-span-1">
            <h4 className="font-cinzel mb-4 text-section-sub" style={{ color: "var(--color-accent)" }}>
              Follow Us
            </h4>
            <div className="flex items-center justify-center lg:justify-end gap-3 sm:gap-4">
              {[
                { href: SITE_CONFIG.social.facebook, label: "Facebook", Icon: Facebook },
                { href: SITE_CONFIG.social.instagram, label: "Instagram", Icon: Instagram },
                { href: SITE_CONFIG.social.youtube, label: "YouTube", Icon: Youtube },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-muted)",
                  }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <TempleDivider className="opacity-30" />

        <p
          className="text-center font-poppins text-sm mt-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          &copy; 2026 Koota Maha Jagattu. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
