"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  goToStep,
  LaunchStage,
  launchOnboarding,
  OnboardingStep,
  SESSION_EXPIRED_MESSAGE,
} from "@/store/slices/onboardingSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiCheck, FiEdit2, FiLoader, FiZap } from "react-icons/fi";
import { Alert, Button } from "../ui";

const STAGES: { id: Exclude<LaunchStage, "idle" | "done" | "error">; label: string }[] = [
  { id: "account", label: "Creating your account" },
  { id: "website", label: "Generating website & booking engine" },
  { id: "subscription", label: "Activating your subscription" },
  { id: "template", label: "Applying your starter design" },
];

const LaunchStep = () => {
  const dispatch = useAppDispatch();
  const { form, launchStage, error } = useAppSelector((s) => s.onboarding);
  const signedIn = useAppSelector((s) => !!s.auth.token);

  // Decided when launch starts: signing up mid-run sets the token, which
  // must not drop the "account" row from the progress list.
  const [withAccountStage, setWithAccountStage] = useState(!signedIn);

  const running = !["idle", "error", "done"].includes(launchStage);
  const stages = withAccountStage
    ? STAGES
    : STAGES.filter((s) => s.id !== "account");
  const activeIdx = stages.findIndex((s) => s.id === launchStage);
  const alreadyRegistered = error?.toLowerCase().includes("already registered");
  // the saved token was rejected and has been cleared: retrying can't work, logging in can
  const sessionExpired = error === SESSION_EXPIRED_MESSAGE;
  const router = useRouter();

  const rows: { label: string; value: string; step: OnboardingStep }[] = [
    { label: "Property", value: form.hotelName, step: "account" },
    { label: "Email", value: form.email, step: "account" },
    { label: "Type", value: form.category, step: "property" },
    { label: "Phone", value: `${form.countryCode} ${form.phone}`, step: "property" },
    {
      label: "Location",
      value: [form.city, form.state, form.country].filter(Boolean).join(", "),
      step: "property",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-primary text-2xl font-semibold md:text-3xl">
          {running ? "Building your website…" : "Ready to go live?"}
        </h2>
        <p className="text-white/60">
          {running
            ? "This usually takes less than a minute. Please keep this tab open."
            : "Check your details. You can change everything later from the dashboard."}
        </p>
      </div>

      {running ? (
        <ol className="flex flex-col gap-3" aria-live="polite">
          {stages.map((stage, idx) => {
            const done = idx < activeIdx;
            const active = idx === activeIdx;
            return (
              <li
                key={stage.id}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-500 ${
                  active
                    ? "border-color-4/50 bg-color-4/10"
                    : done
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-white/5 bg-transparent opacity-50"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                    done
                      ? "bg-[#9EFF8E]/15 text-[#9EFF8E]"
                      : active
                        ? "bg-color-4 text-white"
                        : "bg-white/10 text-white/50"
                  }`}
                >
                  {done ? <FiCheck /> : active ? <FiLoader className="animate-spin" /> : idx + 1}
                </span>
                <span className={active || done ? "text-white" : "text-white/60"}>
                  {stage.label}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <dl className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center gap-4 px-4 py-3">
              <dt className="w-20 shrink-0 text-sm text-white/50">{row.label}</dt>
              <dd className="flex-1 truncate text-white">{row.value || "—"}</dd>
              <button
                type="button"
                onClick={() => dispatch(goToStep(row.step))}
                className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={`Edit ${row.label.toLowerCase()}`}
              >
                <FiEdit2 className="text-sm" />
              </button>
            </div>
          ))}
        </dl>
      )}

      {error && !running && (
        <Alert>
          {error}
          {alreadyRegistered && (
            <>
              {" "}
              <Link href="/login/" className="font-semibold text-white underline underline-offset-4">
                Log in instead
              </Link>
            </>
          )}
        </Alert>
      )}

      {!running && (
        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row">
          <Button
            type="button"
            variant="ghost"
            onClick={() => dispatch(goToStep("property"))}
          >
            <FiArrowLeft /> Back
          </Button>
          <Button
            type="button"
            variant="accent"
            icon={<FiZap />}
            onClick={() => {
              if (sessionExpired) {
                router.push("/login/");
                return;
              }
              setWithAccountStage(!signedIn);
              dispatch(launchOnboarding());
            }}
            className="flex-1"
          >
            {sessionExpired ? "Log in again" : error ? "Try again" : "Launch my website"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LaunchStep;
