"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Hash,
  Users,
  Building2,
  Send,
  Check,
  X,
  Loader2,
} from "lucide-react";
import {
  registrationSchema,
  type RegistrationFormData,
  mapFormToPayload,
  submitRegistration,
  ANGASAMSTE_OPTIONS,
  FAMILY_MEMBER_OPTIONS,
} from "@/lib/validation";
import TempleDivider from "@/components/TempleDivider";
import GoldenBorder from "@/components/GoldenBorder";
import SuccessModal from "@/components/SuccessModal";
import { cn, triggerHapticFeedback } from "@/lib/utils";

export default function RegistrationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      angasamste: "",
      fullName: "",
      mobileNumber: "",
      email: "",
      fullAddress: "",
      pinCode: "",
      familyMembers: "",
      attendance: undefined,
    },
  });

  const attendance = watch("attendance");

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = mapFormToPayload(data);
      const result = await submitRegistration(payload);

      if (result.status === "success") {
        setShowSuccess(true);
        reset();
      } else {
        setSubmitError("Registration failed. Please try again.");
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="register" className="section-padding relative">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-8 sm:mb-10" data-aos="fade-up">
            <p
              className="font-kannada font-bold tracking-wider mb-2 text-section-sub"
              style={{ color: "var(--color-accent)" }}
            >
              ನೋಂದಣಿ
            </p>
            <h2
              className="font-kannada font-extrabold mb-2 text-section-title"
              style={{ color: "var(--color-primary)" }}
            >
              ನೋಂದಣಿ ವಿವರಗಳು
            </h2>
            <p className="font-poppins text-xs sm:text-sm" style={{ color: "var(--color-text-muted)" }}>
              Registration Details & Form
            </p>
          </div>

          <TempleDivider />

          <div className="mt-8 sm:mt-10" data-aos="fade-up" data-aos-delay="100">
            <GoldenBorder>
              <div
                className="rounded-lg shadow-card overflow-hidden"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <div className="bg-maroon-gradient px-4 sm:px-6 py-3 sm:py-4 text-center">
                  <h3 className="font-kannada text-white font-bold tracking-wide text-section-sub">
                    ನೋಂದಣಿ ವಿವರಗಳು / Registration Details
                  </h3>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6"
                  noValidate
                >
                  <FormField
                    label="Choose your Angasamste or Location"
                    labelKn="ನಿಮ್ಮ ಅಂಗಸಂಸ್ಥೆ ಅಥವಾ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ"
                    error={errors.angasamste?.message}
                    icon={<Building2 size={18} />}
                  >
                    <select
                      {...register("angasamste")}
                      className={inputClass(!!errors.angasamste)}
                      aria-invalid={!!errors.angasamste}
                    >
                      <option value="">Select Angasamste / ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ...</option>
                      {ANGASAMSTE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </FormField>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                    <FormField
                      label="Full Name"
                      labelKn="ಪೂರ್ಣ ಹೆಸರು"
                      error={errors.fullName?.message}
                      icon={<User size={18} />}
                    >
                      <input
                        type="text"
                        {...register("fullName")}
                        placeholder="Enter your full name"
                        className={inputClass(!!errors.fullName)}
                        aria-invalid={!!errors.fullName}
                      />
                    </FormField>

                    <FormField
                      label="Mobile Number"
                      labelKn="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
                      error={errors.mobileNumber?.message}
                      icon={<Phone size={18} />}
                    >
                      <input
                        type="tel"
                        inputMode="numeric"
                        {...register("mobileNumber")}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={inputClass(!!errors.mobileNumber)}
                        aria-invalid={!!errors.mobileNumber}
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="Email Address (Optional)"
                    labelKn="ಇಮೇಲ್ ವಿಳಾಸ"
                    error={errors.email?.message}
                    icon={<Mail size={18} />}
                  >
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="your@email.com"
                      className={inputClass(!!errors.email)}
                      aria-invalid={!!errors.email}
                    />
                  </FormField>

                  <FormField
                    label="Full Address"
                    labelKn="ಸಂಪೂರ್ಣ ವಿಳಾಸ"
                    error={errors.fullAddress?.message}
                    icon={<MapPin size={18} />}
                    isTextarea
                  >
                    <textarea
                      {...register("fullAddress")}
                      placeholder="Enter your complete address"
                      rows={3}
                      className={cn(inputClass(!!errors.fullAddress), "resize-none min-h-[88px]")}
                      aria-invalid={!!errors.fullAddress}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                    <FormField
                      label="PIN Code"
                      labelKn="ಅಂಚೆ ಸಂಖ್ಯೆ"
                      error={errors.pinCode?.message}
                      icon={<Hash size={18} />}
                    >
                      <input
                        type="text"
                        inputMode="numeric"
                        {...register("pinCode")}
                        placeholder="6-digit PIN"
                        maxLength={6}
                        className={inputClass(!!errors.pinCode)}
                        aria-invalid={!!errors.pinCode}
                      />
                    </FormField>

                    <FormField
                      label="Number of Family Members Attending"
                      labelKn="ಭಾಗವಹಿಸುವ ಮನೆಯ ಸದಸ್ಯರ ಸಂಖ್ಯೆ"
                      error={errors.familyMembers?.message}
                      icon={<Users size={18} />}
                    >
                      <select
                        {...register("familyMembers")}
                        className={inputClass(!!errors.familyMembers)}
                        aria-invalid={!!errors.familyMembers}
                      >
                        <option value="">Select...</option>
                        {FAMILY_MEMBER_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  <fieldset>
                    <legend className="mb-1">
                      <span className="font-kannada text-sm sm:text-base font-bold block leading-tight" style={{ color: "var(--color-primary)" }}>
                        ನಾನು ಕೂಟ ಮಹಾ ಜಗತ್ತು ಕೇಂದ್ರ ಅಧಿವೇಶನ 2026ರಲ್ಲಿ ಭಾಗವಹಿಸಲು ಬಯಸುತ್ತೇನೆ
                      </span>
                      <span className="font-poppins text-xs block mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                        I wish to attend the Koota Maha Jagattu Kendriya Adhiveshana 2026
                      </span>
                    </legend>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                      <AttendanceButton
                        selected={attendance === "yes"}
                        onClick={() => setValue("attendance", "yes", { shouldValidate: true })}
                        variant="yes"
                        label="ಹೌದು / Yes"
                      />
                      <AttendanceButton
                        selected={attendance === "no"}
                        onClick={() => setValue("attendance", "no", { shouldValidate: true })}
                        variant="no"
                        label="ಇಲ್ಲ / No"
                      />
                    </div>
                    {errors.attendance && (
                      <p className="text-red-600 text-xs mt-2 font-poppins" role="alert">
                        {errors.attendance.message}
                      </p>
                    )}
                  </fieldset>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-poppins" role="alert">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full font-kannada font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                        ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ / Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={20} aria-hidden="true" />
                        ನೋಂದಣಿ ಮಾಡಿ / Register
                      </>
                    )}
                  </button>
                </form>
              </div>
            </GoldenBorder>
          </div>
        </div>
      </section>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}

function inputClass(hasError: boolean) {
  return cn("form-input", hasError && "border-red-400");
}

function FormField({
  label,
  labelKn,
  error,
  icon,
  children,
  isTextarea = false,
}: {
  label: string;
  labelKn: string;
  error?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isTextarea?: boolean;
}) {
  return (
    <div>
      <label className="block mb-2">
        <span className="font-kannada text-sm sm:text-base font-bold block leading-tight" style={{ color: "var(--color-primary)" }}>
          {labelKn}
        </span>
        <span className="font-poppins text-xs block mt-0.5" style={{ color: "var(--color-text-muted)" }}>
          {label}
        </span>
      </label>
      <div className="relative">
        <span
          className={cn(
            "absolute left-3 pointer-events-none",
            isTextarea ? "top-3.5" : "top-1/2 -translate-y-1/2"
          )}
          style={{ color: "var(--color-text-muted)" }}
          aria-hidden="true"
        >
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <p className="text-red-600 text-xs mt-1.5 font-poppins" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function AttendanceButton({
  selected,
  onClick,
  variant,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  variant: "yes" | "no";
  label: string;
}) {
  const isYes = variant === "yes";

  const handleClick = () => {
    triggerHapticFeedback(variant);
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 px-5 rounded-full border-2 font-kannada font-bold transition-all duration-200 active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        selected
          ? isYes
            ? "border-green-600 bg-green-50 text-green-700 shadow-sm"
            : "border-red-500 bg-red-50 text-red-700 shadow-sm"
          : isYes
            ? "border-green-300 text-green-600 hover:bg-green-50/50"
            : "border-red-300 text-red-500 hover:bg-red-50/50"
      )}
      aria-pressed={selected}
    >
      {isYes ? <Check size={20} aria-hidden="true" /> : <X size={20} aria-hidden="true" />}
      {label}
    </button>
  );
}
