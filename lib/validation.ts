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
  const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  // If Apps Script URL is set, send JSON POST to Apps Script
  if (appsScriptUrl && !appsScriptUrl.includes("YOUR_SCRIPT_ID")) {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit registration. Please try again.");
    }

    return response.json();
  }

  // Direct submission to Google Form
  const formUrl =
    process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ||
    "https://docs.google.com/forms/d/e/1FAIpQLSdGoX4ITXlvb-7DglWayMQ3TbuXX6FHQlh9CHDrNn8lAMiQ2g/formResponse";

  const formParams = new URLSearchParams();
  formParams.append(GOOGLE_FORM_ENTRIES.organization, data.organization);
  formParams.append(GOOGLE_FORM_ENTRIES.name, data.name);
  formParams.append(GOOGLE_FORM_ENTRIES.phone, data.phone);
  formParams.append(GOOGLE_FORM_ENTRIES.email, data.email);
  formParams.append(GOOGLE_FORM_ENTRIES.address, data.address);
  formParams.append(GOOGLE_FORM_ENTRIES.pin, data.pin);
  formParams.append(GOOGLE_FORM_ENTRIES.members, data.members);
  formParams.append(GOOGLE_FORM_ENTRIES.attendance, data.attendance);

  await fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formParams.toString(),
  });

  return { status: "success" };
}
