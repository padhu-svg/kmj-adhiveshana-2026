export const SITE_CONFIG = {
  name: "Koota Maha Jagattu",
  fullName: "Koota Maha Jagattu Kendriya Adhiveshana 2026",
  titleKn: "ಕೂಟ ಮಹಾಜಗತ್ತು ಕೇಂದ್ರ ಅಧಿವೇಶನ 2026",
  subtitleKn: "ಆಹ್ವಾನ ಮತ್ತು ಹಾಜರಾತಿ ನೋಂದಣಿ",
  subtitleEn: "Invitation and Program Attendance Registration",
  description:
    "Official registration portal for Koota Maha Jagattu Kendriya Adhiveshana 2026 — a sacred gathering of unity and devotion.",
  url: "https://kmj-adhiveshana2026.org",
  event: {
    date: "27 September 2026",
    dateKn: "27 ಸೆಪ್ಟೆಂಬರ್ 2026",
    venue: "Kota Vasudeva Karantha Vedike, Sanghanikethana, Prathapanagara, Mannagudda, Mangaluru.",
    venueKn: "ಕೋಟ ವಾಸುದೇವ ಕಾರಂತ ವೇದಿಕೆ, ಸಂಘನಿಕೇತನ, ಪ್ರತಾಪನಗರ, ಮಣ್ಣಗುಡ್ಡೆ, ಮಂಗಳೂರು.",
    mapUrl: "https://maps.app.goo.gl/t3rCX9i9gzfzGXRt6",
    importance:
      "The Kendriya Adhiveshana is a sacred congregation where Angasamsthe members from across Karnataka unite in devotion, deliberation, and service — strengthening the bonds of community and spiritual heritage.",
    importanceKn:
      "ಕೇಂದ್ರ ಅಧಿವೇಶನವು ಕರ್ನಾಟಕದಾದ್ಯಂತದ ಅಂಗಸಂಸ್ಥೆಗಳ ಸದಸ್ಯರು ಭಕ್ತಿ, ಚರ್ಚೆ ಮತ್ತು ಸೇವೆಯಲ್ಲಿ ಒಂದಾಗುವ ಪವಿತ್ರ ಸಮಾವೇಶವಾಗಿದೆ.",
  },
  contact: {
    email: "kmjmangalore@gmail.com",
    president: {
      titleKn: "ಅಧ್ಯಕ್ಷರು",
      titleEn: "President",
      phone: "+91 98444 01834",
    },
    secretary: {
      titleKn: "ಕಾರ್ಯದರ್ಶಿ",
      titleEn: "Secretary",
      phone: "+91 99009 72917",
    },
    committee: {
      titleKn: "ಸಂಘಟನಾ ಸಮಿತಿ ಸದಸ್ಯರು",
      titleEn: "Organizing Committee Members",
      phones: ["+91 96111 32781", "+91 78923 91964"],
    },
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home", labelKn: "ಮುಖಪುಟ" },
  { href: "/invitation", label: "Invitation", labelKn: "ಆಮಂತ್ರಣ" },
  { href: "/#about", label: "About", labelKn: "ಬಗ್ಗೆ" },
  { href: "/#register", label: "Register", labelKn: "ನೋಂದಣಿ" },
  { href: "/#contact", label: "Contact", labelKn: "ಸಂಪರ್ಕ" },
] as const;
