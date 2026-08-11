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

export async function submitRegistration(
  data: RegistrationPayload
): Promise<{ status: string; message?: string }> {
  const appsScriptUrl =
    process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
    "https://script.google.com/macros/s/AKfycbx3iecBKL4K5i-0cn_5_j9H6iDsfEYnzb3BUzL2RLWPWRReGqZme-b3WU04MP8bxZWJoQ/exec";

  // 1. Post JSON payload to Google Apps Script Web App
  try {
    fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      mode: "no-cors",
    }).catch(() => {});
  } catch {}

  // 2. Native HTML Form POST submission to Google Form via offscreen iframe
  if (typeof window !== "undefined") {
    return new Promise((resolve) => {
      const iframeName =
        "hidden_gform_iframe_" + Math.random().toString(36).slice(2);

      // Mobile Safari / Chrome suspend POST requests to display:none frames.
      // Position offscreen instead of display:none.
      const iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.setAttribute("aria-hidden", "true");
      iframe.style.position = "absolute";
      iframe.style.width = "1px";
      iframe.style.height = "1px";
      iframe.style.top = "-9999px";
      iframe.style.left = "-9999px";
      iframe.style.opacity = "0";
      iframe.style.border = "none";
      iframe.style.pointerEvents = "none";
      document.body.appendChild(iframe);

      const form = document.createElement("form");
      form.method = "POST";
      form.action =
        process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ||
        "https://docs.google.com/forms/d/e/1FAIpQLSdGoX4ITXlvb-7DglWayMQ3TbuXX6FHQlh9CHDrNn8lAMiQ2g/formResponse";
      form.target = iframeName;

      const fields: Record<string, string> = {
        [GOOGLE_FORM_ENTRIES.organization]: data.organization,
        [GOOGLE_FORM_ENTRIES.name]: data.name,
        [GOOGLE_FORM_ENTRIES.phone]: data.phone,
        [GOOGLE_FORM_ENTRIES.email]: data.email,
        [GOOGLE_FORM_ENTRIES.address]: data.address,
        [GOOGLE_FORM_ENTRIES.pin]: data.pin,
        [GOOGLE_FORM_ENTRIES.members]: data.members,
        [GOOGLE_FORM_ENTRIES.attendance]: data.attendance,
        fvv: "1",
        pageHistory: "0",
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // Resolve immediately for smooth UI feedback
      resolve({ status: "success" });

      // Clean up after allowing mobile network request to finish
      setTimeout(() => {
        try {
          if (document.body.contains(form)) document.body.removeChild(form);
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
        } catch {}
      }, 4000);
    });
  }

  return { status: "success" };
}
