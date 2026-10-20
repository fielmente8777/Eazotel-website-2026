"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, persistToken } from "@/store/slices/authSlice";
import { goToStep, resetOnboarding, updateForm } from "@/store/slices/onboardingSlice";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiHome, FiLock, FiMail, FiUserCheck } from "react-icons/fi";
import PropertyLookup, { matchToForm } from "../PropertyLookup";
import { Button, PasswordField, TextField } from "../ui";
import { FormErrors, passwordScore, validateAccount } from "../validation";

const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-[#FF6161]",
  "bg-[#FF6161]",
  "bg-[#F5C451]",
  "bg-[#5E98F6]",
  "bg-[#9EFF8E]",
];

const AccountStep = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.onboarding.form);
  const token = useAppSelector((s) => s.auth.token);
  const [errors, setErrors] = useState<FormErrors>({});
  const signedIn = !!token;

  const set =
    (field: "hotelName" | "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateForm({ [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validateAccount(form, !signedIn);
    setErrors(next);
    if (Object.keys(next).length === 0) dispatch(goToStep("property"));
  };

  const signOut = () => {
    persistToken(null);
    dispatch(logout());
    dispatch(resetOnboarding());
  };

  const score = passwordScore(form.password);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-primary text-2xl font-semibold md:text-3xl">
          {signedIn ? "Tell us about your property" : "Create your free account"}
        </h2>
        <p className="text-white/60">
          No credit card. Your website is generated instantly.
        </p>
      </div>

      {signedIn && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-color-4/30 bg-color-4/10 px-4 py-3 text-sm">
          <span className="flex items-center gap-2 text-white/90">
            <FiUserCheck className="text-color-4" /> You&apos;re signed in
          </span>
          <button
            type="button"
            onClick={signOut}
            className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Not you? Sign out
          </button>
        </div>
      )}

      <TextField
        label="Property name"
        placeholder="e.g. The Mango Grove Resort"
        icon={<FiHome />}
        value={form.hotelName}
        onChange={set("hotelName")}
        error={errors.hotelName}
        autoComplete="organization"
        autoFocus
      />
      <TextField
        label="Work email"
        type="email"
        placeholder="you@yourhotel.com"
        icon={<FiMail />}
        value={form.email}
        onChange={set("email")}
        error={errors.email}
        autoComplete="email"
      />

      <PropertyLookup
        hotelName={form.hotelName}
        email={form.email}
        onPick={(match) => {
          dispatch(updateForm(matchToForm(match)));
          setErrors((prev) => ({ ...prev, hotelName: undefined }));
        }}
      />

      {!signedIn && (
        <div className="flex flex-col gap-2">
          <PasswordField
            label="Password"
            placeholder="At least 6 characters"
            icon={<FiLock />}
            value={form.password}
            onChange={set("password")}
            error={errors.password}
            autoComplete="new-password"
          />
          {form.password && (
            <div className="flex items-center gap-3">
              <div className="grid flex-1 grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-colors duration-300 ${i <= score ? strengthColors[score] : "bg-white/10"}`}
                  />
                ))}
              </div>
              <span className="w-16 text-right text-xs text-white/60">
                {strengthLabels[score]}
              </span>
            </div>
          )}
        </div>
      )}

      <Button type="submit" icon={<FiArrowRight />} className="mt-2 w-full">
        Continue
      </Button>

      {!signedIn && (
        <p className="text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link
            href="/login/"
            className="font-medium text-white underline-offset-4 hover:text-color-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      )}

      <p className="text-center text-xs leading-relaxed text-white/40">
        By continuing you agree to our{" "}
        <Link href="/terms-of-service/" className="underline hover:text-white/70">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy/" className="underline hover:text-white/70">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
};

export default AccountStep;
