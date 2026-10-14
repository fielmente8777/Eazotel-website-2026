import type { OnboardingForm } from "@/store/slices/onboardingSlice";

export type FormErrors = Partial<Record<keyof OnboardingForm, string>>;

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const validateAccount = (
  form: OnboardingForm,
  needsPassword: boolean
): FormErrors => {
  const errors: FormErrors = {};
  if (form.hotelName.trim().length < 2)
    errors.hotelName = "Enter your property name";
  if (!isEmail(form.email)) errors.email = "Enter a valid email address";
  if (needsPassword && form.password.length < 6)
    errors.password = "Use at least 6 characters";
  return errors;
};

export const validateProperty = (form: OnboardingForm): FormErrors => {
  const errors: FormErrors = {};
  if (!/^[0-9]{6,15}$/.test(form.phone))
    errors.phone = "Phone must be 6–15 digits";
  if (!form.city.trim()) errors.city = "Enter your city";
  if (!form.country.trim()) errors.country = "Enter your country";
  return errors;
};

/** 0–4 score used by the strength meter. */
export const passwordScore = (pw: string) => {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};
