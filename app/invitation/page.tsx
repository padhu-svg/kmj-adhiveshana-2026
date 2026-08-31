import Image from "next/image";
import Link from "next/link";
import { Download, ExternalLink, FileText } from "lucide-react";

export const metadata = {
  title: "ಆಮಂತ್ರಣ | Official Invitation — Koota Maha Jagattu Kendriya Adhiveshana 2026",
  description: "Official 4-page invitation and programme schedule for Koota Maha Jagattu Kendriya Adhiveshana 2026.",
};

const INVITATION_PAGES = [
  {
    num: 1,
    title: "ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ — ಮುಖಪುಟ / Invitation Cover",
    src: "/images/invitation/page-1.png",
    alt: "Koota Maha Jagattu Kendriya Adhiveshana 2026 Invitation Page 1 Cover",
  },
  {
    num: 2,
    title: "ಕಾರ್ಯಕ್ರಮದ ವಿವರ ಹಾಗೂ ಕಾರ್ಯವಾಹಿನಿ / Programme Schedule & Sequence",
    src: "/images/invitation/page-2.png",
    alt: "Koota Maha Jagattu Kendriya Adhiveshana 2026 Invitation Page 2 Schedule",
  },
  {
    num: 3,
    title: "ಅಧ್ಯಕ್ಷರು ಹಾಗೂ ಪದಾಧಿಕಾರಿಗಳ ವಿವರ / Dignitaries & Guests",
    src: "/images/invitation/page-3.png",
    alt: "Koota Maha Jagattu Kendriya Adhiveshana 2026 Invitation Page 3 Dignitaries",
  },
  {
    num: 4,
    title: "ಸಮಿತಿ ಸದಸ್ಯರು ಹಾಗೂ ಬ್ಯಾಂಕ್ ವಿವರಗಳು / Office Bearers & Bank Details",
    src: "/images/invitation/page-4.png",
    alt: "Koota Maha Jagattu Kendriya Adhiveshana 2026 Invitation Page 4 Office Bearers and Bank Details",
  },
];

export default function InvitationPage() {
  return (
    <div
      className="min-h-screen pt-20 sm:pt-24 pb-16 transition-colors duration-500"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Top Banner / Header Actions */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div
          className="glass-card rounded-2xl p-4 sm:p-6 shadow-card border flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div>
            <h1
              className="font-kannada font-extrabold text-xl sm:text-2xl"
              style={{ color: "var(--color-primary)" }}
            >
              ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ / Official Invitation Document
            </h1>
            <p
              className="font-poppins text-xs sm:text-sm mt-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              Koota Maha Jagattu Kendriya Adhiveshana 2026 — Official Programme Invitation
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href="/invitation.pdf"
              download="KMJ_Kendriya_Adhiveshana_2026_Invitation.pdf"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border font-kannada font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-sm"
              style={{
                backgroundColor: "rgba(200, 155, 60, 0.12)",
                color: "var(--color-primary)",
                borderColor: "var(--color-border)",
              }}
            >
              <Download size={16} style={{ color: "var(--color-accent)" }} />
              <span>PDF ಡೌನ್‌ಲೋಡ್ / Download PDF</span>
            </a>
            <Link
              href="/#register"
              className="flex-1 sm:flex-initial btn-primary font-kannada font-bold !py-2.5 !px-5 text-xs sm:text-sm shadow-md text-center"
            >
              ನೋಂದಣಿ ಮಾಡಿ / Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Page Embedded Document Viewer Container */}
      <div className="max-w-[800px] mx-auto px-2 sm:px-4 space-y-10 sm:space-y-14">
        {INVITATION_PAGES.map((page) => (
          <div
            key={page.num}
            id={`page-${page.num}`}
            className="group relative rounded-2xl overflow-hidden shadow-card border transition-all duration-300"
            style={{
              backgroundColor: "var(--color-card)",
              borderColor: "var(--color-border)",
            }}
          >
            {/* Page Header Strip */}
            <div className="bg-maroon-gradient px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-white">
              <span className="font-kannada font-bold flex items-center gap-2">
                <FileText size={16} className="text-gold" />
                {page.title}
              </span>
              <span className="font-mono text-gold font-bold bg-black/30 px-2.5 py-0.5 rounded-full border border-gold/30 text-xs">
                Page {page.num} / 4
              </span>
            </div>

            {/* Exact PDF Page Image Render */}
            <div
              className="relative w-full aspect-[1477/1969]"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <Image
                src={page.src}
                alt={page.alt}
                fill
                className="object-contain"
                priority={page.num === 1}
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          </div>
        ))}

        {/* Embedded Interactive PDF Option */}
        <div
          className="glass-card rounded-2xl p-6 text-center space-y-4 shadow-card border"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h3
            className="font-kannada font-bold text-lg sm:text-xl"
            style={{ color: "var(--color-primary)" }}
          >
            ಅಧಿಕೃತ PDF ದಾಖಲೆ / Original PDF Document
          </h3>
          <p
            className="font-poppins text-xs sm:text-sm max-w-md mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            You can also open or download the original high-definition PDF file directly.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="/invitation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl btn-primary font-kannada font-bold text-sm shadow-md"
            >
              <ExternalLink size={18} />
              <span>PDF ವೀಕ್ಷಿಸಿ / View PDF in New Tab</span>
            </a>
            <a
              href="/invitation.pdf"
              download="KMJ_Kendriya_Adhiveshana_2026_Invitation.pdf"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl border font-kannada font-bold text-sm transition-all duration-200 active:scale-95 shadow-md"
              style={{
                backgroundColor: "rgba(200, 155, 60, 0.12)",
                color: "var(--color-primary)",
                borderColor: "var(--color-border)",
              }}
            >
              <Download size={18} style={{ color: "var(--color-accent)" }} />
              <span>ಡೌನ್‌ಲೋಡ್ / Download PDF</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
