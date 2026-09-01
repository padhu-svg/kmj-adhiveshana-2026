import { z } from "zod";

export const ANGASAMSTE_OPTIONS = [
  "Bantwal / ಬಂಟ್ವಾಳ",
  "Belthangady / ಬೆಳ್ತಂಗಡಿ",
  "Bengaluru / ಬೆಂಗಳೂರು",
  "Chennai / ಚೆನ್ನೈ",
  "Chikmagaluru / ಚಿಕ್ಕಮಗಳೂರು",
  "Chottanikara / ಚೊಟ್ಟಾನಿಕ್ಕರ",
  "Davangere / ದಾವಣಗೆರೆ",
  "Dharawada / ಧಾರವಾಡ",
  "Gokarna / ಗೋಕರ್ಣ",
  "Hassan / ಹಾಸನ",
  "Jayapura Koppa / ಜಯಪುರ ಕೊಪ್ಪ",
  "Kalasa Balehole / ಕಳಸ ಬಾಳೆಹೊಳೆ",
  "Kamalashile / ಕಮಲಶಿಲೆ",
  "Kasargod / ಕಾಸರಗೋಡು",
  "Katipalla Krishnapura / ಕಾಟಿಪಳ್ಳ ಕೃಷ್ಣಾಪುರ",
  "Kirimanjeshwara / ಕಿರಿಮಂಜೇಶ್ವರ",
  "Kundapura / ಕುಂದಾಪುರ",
  "Madikeri / ಮಡಿಕೇರಿ",
  "Manchi / ಮಂಚಿ",
  "Mandya / ಮಂಡ್ಯ",
  "Mangalore / ಮಂಗಳೂರು",
  "Mangalpady / ಮಂಗಲ್ಪಾಡಿ",
  "Miyapadavu / ಮಿಯಾಪಾಡವು",
  "Mumbai / ಮುಂಬೈ",
  "Mysore / ಮೈಸೂರು",
  "Polali / ಪೊಳಲಿ",
  "Pune / ಪುಣೆ",
  "Putturu / ಪುತ್ತೂರು",
  "Saligrama / ಸಾಲಿಗ್ರಾಮ",
  "Shivamogga / ಶಿವಮೊಗ್ಗ",
  "Sringeri / ಶೃಂಗೇರಿ",
  "Sulya / ಸುಳ್ಯ",
  "Thirthahalli / ತೀರ್ಥಹಳ್ಳಿ",
  "Tumakuru / ತುಮಕೂರು",
  "Udupi / ಉಡುಪಿ",
  "Uttarahalli / ಉತ್ತರಹಳ್ಳಿ",
  "Vorkadi / ವರ್ಕಾಡಿ",
] as const;

export const FAMILY_MEMBER_OPTIONS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
] as const;

export const registrationSchema = z.object({
  angasamste: z.string().min(1, "Please select your Angasamste or location"),
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  fullAddress: z
    .string()
    .min(10, "Please enter your complete address")
    .max(500, "Address is too long"),
  pinCode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  familyMembers: z.string().min(1, "Please select number of family members"),
  attendance: z.enum(["yes", "no"], {
    required_error: "Please confirm your attendance",
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export interface RegistrationPayload {
  organization: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  pin: string;
  members: string;
  attendance: string;
}

export function mapFormToPayload(
  data: RegistrationFormData
): RegistrationPayload {
  return {
    organization: data.angasamste,
    name: data.fullName,
    phone: data.mobileNumber,
    email: data.email || "",
    address: data.fullAddress,
    pin: data.pinCode,
    members: data.familyMembers,
    attendance: data.attendance === "yes" ? "Yes" : "No",
  };
}

export const GOOGLE_FORM_ENTRIES = {
  organization: "entry.1196645888",
  name: "entry.122426651",
  phone: "entry.268232304",
  email: "entry.600893743",
  address: "entry.221248573",
  pin: "entry.1176839085",
  members: "entry.367239193",
  attendance: "entry.1062314949",
} as const;

export async function checkMobileExists(phone: string): Promise<boolean> {
  const cleanPhone = phone.replace(/\D/g, "").trim();
  if (cleanPhone.length !== 10) return false;

  const appsScriptUrl =
    process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
    "https://script.google.com/macros/s/AKfycbx3iecBKL4K5i-0cn_5_j9H6iDsfEYnzb3BUzL2RLWPWRReGqZme-b3WU04MP8bxZWJoQ/exec";

  try {
    const res = await fetch(`${appsScriptUrl}?phone=${encodeURIComponent(cleanPhone)}`);
    if (res.ok) {
      const data = await res.json();
      return data.exists === true;
    }
  } catch (err) {
    console.warn("Mobile check failed:", err);
  }

  return false;
}

export async function submitRegistration(
  data: RegistrationPayload
): Promise<{ status: "success" | "duplicate" | "error"; message?: string }> {
  const appsScriptUrl =
    process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
    "https://script.google.com/macros/s/AKfycbx3iecBKL4K5i-0cn_5_j9H6iDsfEYnzb3BUzL2RLWPWRReGqZme-b3WU04MP8bxZWJoQ/exec";

  // 1. Pre-check if mobile number already exists in Google Sheet
  const existsBefore = await checkMobileExists(data.phone);
  if (existsBefore) {
    return {
      status: "duplicate",
      message:
        "ಈ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ / This mobile number is already registered",
    };
  }

  // 2. Submit payload via GET query parameters for 100% reliable browser response reading
  try {
    const params = new URLSearchParams({
      action: "register",
      organization: data.organization,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      pin: data.pin,
      members: data.members,
      attendance: data.attendance,
    });

    const res = await fetch(`${appsScriptUrl}?${params.toString()}`);
    if (res.ok) {
      const result = await res.json();
      if (result.status === "duplicate" || result.exists === true) {
        return {
          status: "duplicate",
          message:
            result.message ||
            "ಈ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ / This mobile number is already registered",
        };
      }
      if (result.status === "success") {
        return { status: "success" };
      }
    }
  } catch (err) {
    console.warn("GET submission failed, trying POST fallback", err);
  }

  // Fallback POST submission if GET query string fails
  try {
    await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
      mode: "no-cors",
    });
  } catch (err) {
    console.error("Submission POST fallback error", err);
  }

  return { status: "success" };
}
