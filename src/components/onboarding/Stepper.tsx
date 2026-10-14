"use client";

import { ONBOARDING_STEPS, OnboardingStep } from "@/store/slices/onboardingSlice";
import { FiCheck } from "react-icons/fi";

interface Props {
  current: OnboardingStep;
}

const indexOf = (step: OnboardingStep) =>
  ONBOARDING_STEPS.findIndex((s) => s.id === step);

/** Vertical stepper for the left column (desktop). */
export const VerticalStepper: React.FC<Props> = ({ current }) => {
  const currentIdx = indexOf(current);
  return (
    <ol className="hidden flex-col lg:flex">
      {ONBOARDING_STEPS.map((step, idx) => {
        const done = idx < currentIdx || current === "success";
        const active = idx === currentIdx && !done;
        return (
          <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
            {idx < ONBOARDING_STEPS.length - 1 && (
              <span
                aria-hidden
                className={`absolute top-10 left-[19px] h-[calc(100%-2.75rem)] w-px transition-colors duration-500 ${done ? "bg-color-4" : "bg-white/15"}`}
              />
            )}
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-500 ${
                done
                  ? "border-color-4 bg-color-4 text-white"
                  : active
                    ? "border-color-4 bg-color-4/15 text-white shadow-[0_0_0_6px_rgba(13,84,235,0.15)]"
                    : "border-white/15 bg-white/5 text-white/50"
              }`}
            >
              {done ? <FiCheck /> : idx + 1}
            </span>
            <div className="pt-2">
              <p
                className={`font-medium transition-colors ${active || done ? "text-white" : "text-white/50"}`}
              >
                {step.label}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

/** Compact progress bar for the card header (all sizes). */
export const ProgressBar: React.FC<Props> = ({ current }) => {
  const steps = ONBOARDING_STEPS.filter((s) => s.id !== "success");
  const currentIdx = indexOf(current);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/60">
          Step {Math.min(currentIdx + 1, steps.length)} of {steps.length}
        </span>
        <span className="font-medium text-white">
          {ONBOARDING_STEPS[currentIdx]?.label}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {steps.map((s, idx) => (
          <span
            key={s.id}
            className="h-1.5 overflow-hidden rounded-full bg-white/10"
          >
            <span
              className={`block h-full rounded-full bg-color-4 transition-all duration-500 ease-out ${idx <= currentIdx ? "w-full" : "w-0"}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
