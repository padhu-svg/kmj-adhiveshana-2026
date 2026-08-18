"use client";

import Image from "next/image";
import { Calendar, MapPin, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { IMAGES, IMAGE_ALT } from "@/lib/images";
import TempleDivider from "@/components/TempleDivider";
import GoldenBorder from "@/components/GoldenBorder";

export default function EventInfoSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
          <p
            className="font-kannada font-bold tracking-wider mb-2 text-section-sub"
            style={{ color: "var(--color-accent)" }}
          >
            ಕಾರ್ಯಕ್ರಮದ ಮಾಹಿತಿ
          </p>
          <h2
            className="font-kannada font-extrabold mb-2 text-section-title"
            style={{ color: "var(--color-primary)" }}
          >
            ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು
          </h2>
          <p className="font-poppins text-xs sm:text-sm" style={{ color: "var(--color-text-muted)" }}>
            Event Information & Details
          </p>
        </div>

        <TempleDivider />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start mt-8 sm:mt-12">
          <div className="relative mx-auto lg:mx-0 w-full max-w-xs sm:max-w-sm" data-aos="fade-up">
            <GoldenBorder className="p-1.5 sm:p-2 bg-[var(--color-card)]">
              <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "252/370" }}>
                <Image
                  src={IMAGES.deity}
                  alt={IMAGE_ALT.deity}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 280px, 360px"
                />
              </div>
            </GoldenBorder>
            <div
              className="mt-4 text-center px-4 py-2 rounded-full glass-card mx-auto w-fit max-w-full"
            >
              <p className="font-kannada text-sm font-bold" style={{ color: "var(--color-primary)" }}>
                ಸಾಲಿಗ್ರಾಮ, ಉಡುಪಿ
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6" data-aos="fade-up" data-aos-delay="100">
            <InfoCard
              icon={<Calendar className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "var(--color-accent)" }} />}
              title="ದಿನಾಂಕ / Date"
              content={SITE_CONFIG.event.date}
              contentKn={SITE_CONFIG.event.dateKn}
            />
            <InfoCard
              icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "var(--color-accent)" }} />}
              title="ಸ್ಥಳ / Venue"
              content={SITE_CONFIG.event.venue}
              contentKn={SITE_CONFIG.event.venueKn}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  content,
  contentKn,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  contentKn: string;
}) {
  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-glow">
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(200, 155, 60, 0.1)" }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3
            className="font-kannada font-bold mb-2 text-base sm:text-lg"
            style={{ color: "var(--color-primary)" }}
          >
            {title}
          </h3>
          {contentKn && (
            <p
              className="font-kannada font-bold leading-relaxed mb-1 text-base sm:text-lg"
              style={{ color: "var(--color-text)" }}
            >
              {contentKn}
            </p>
          )}
          <p
            className="font-poppins text-xs sm:text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
