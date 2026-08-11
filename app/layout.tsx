import type { Metadata } from "next";
import { Cinzel, Poppins, Noto_Sans_Kannada } from "next/font/google";
import "@/styles/globals.css";
import AppShell from "@/components/AppShell";
import { SITE_CONFIG } from "@/lib/constants";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  variable: "--font-noto-kannada",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.fullName} | Official Registration`,
  description: SITE_CONFIG.description,
  keywords: [
    "Koota Maha Jagattu",
    "KMJ",
    "Adhiveshana 2026",
    "Saligrama",
    "Udupi",
    "Karnataka",
    "Registration",
    "ಕೂಟ ಮಹಾಜಗತ್ತು",
  ],
  openGraph: {
    title: SITE_CONFIG.fullName,
    description: SITE_CONFIG.description,
    type: "website",
    locale: "kn_IN",
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="kn"
      className={`${cinzel.variable} ${poppins.variable} ${notoKannada.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#register"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-maroon focus:text-white focus:rounded-lg"
        >
          Skip to registration
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
