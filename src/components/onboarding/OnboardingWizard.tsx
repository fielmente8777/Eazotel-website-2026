"use client";

import { useGetUserQuery, useLazyHasSubscriptionQuery } from "@/store/api/eazotelApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resumeWithWebsite, setExistingWebsite } from "@/store/slices/onboardingSlice";
import { useEffect, useRef } from "react";
import { FiCheckCircle, FiLoader } from "react-icons/fi";
import AccountStep from "./steps/AccountStep";
import LaunchStep from "./steps/LaunchStep";
import PropertyStep from "./steps/PropertyStep";
import SuccessStep from "./steps/SuccessStep";
import { ProgressBar, VerticalStepper } from "./Stepper";
import { Card, OnboardingShell, Pill } from "./ui";

const perks = [
  "Website + booking engine generated instantly",
  "0% commission on direct bookings",
  "Free setup — upgrade only when you grow",
];

const OnboardingWizard = () => {
  const dispatch = useAppDispatch();
  const { token, hydrated } = useAppSelector((s) => s.auth);
  const { step, launchStage } = useAppSelector((s) => s.onboarding);

  // A returning user who already has a website goes straight to their links.
  const { data: user, isFetching } = useGetUserQuery(token ?? "", {
    skip: !token,
  });
  // A website alone isn't a finished signup: without a subscription (tab
  // refreshed mid-launch) send them back to finish instead of "You're live".
  const [checkSubscription, { isFetching: checkingSubscription }] =
    useLazyHasSubscriptionQuery();
  const checkedToken = useRef<string | null>(null);
  useEffect(() => {
    // Only before a launch: the refetch after createWebsite must not cut the
    // in-progress launch short.
    if (!token || !user?.Status || step === "success" || launchStage !== "idle") return;
    if (checkedToken.current === token) return;
    checkedToken.current = token;

    const links = {
      websiteLink: user.Data?.websiteLink ?? null,
      engineLink: user.Data?.bookingEngineLink ?? null,
    };
    checkSubscription(token)
      .unwrap()
      .then(() => true)
      // Only gian's 404 means "missing"; if the check itself fails, don't
      // hold an existing customer back.
      .catch((err: { status?: unknown }) => err?.status !== 404)
      .then((subscribed) => {
        dispatch(subscribed ? setExistingWebsite(links) : resumeWithWebsite(links));
      });
  }, [user, token, step, launchStage, dispatch, checkSubscription]);

  // Bring the card into view on step change (matters on mobile).
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const checkingSession =
    !hydrated ||
    checkingSubscription ||
    (isFetching && !!token && launchStage === "idle");

  return (
    <OnboardingShell
      aside={
        <>
          <Pill>✦ Free forever setup</Pill>
          <div className="flex flex-col gap-4">
            <h1 className="font-primary text-[32px]/[38px] font-semibold md:text-[48px]/[54px]">
              Launch your hotel website in{" "}
              <span className="bg-gradient-to-r from-color-4 to-[#5E98F6] bg-clip-text text-transparent">
                under 2 minutes
              </span>
            </h1>
            <p className="text-white/65 md:text-lg">
              Answer a few questions and Eazotel builds your website, booking
              engine and dashboard — ready to take direct bookings.
            </p>
          </div>

          <VerticalStepper current={step} />

          <ul className="flex flex-col gap-3 lg:border-t lg:border-white/10 lg:pt-6">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-white/65">
                <FiCheckCircle className="shrink-0 text-color-4" /> {perk}
              </li>
            ))}
          </ul>
        </>
      }
    >
      <div ref={cardRef} className="scroll-mt-28">
        <Card>
          {checkingSession ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 text-white/60">
              <FiLoader className="animate-spin text-2xl text-color-4" />
              Checking your account…
            </div>
          ) : (
            <div className="flex flex-col gap-7">
              {step !== "success" && <ProgressBar current={step} />}
              <div key={step} className="animate-[onboardingIn_0.4s_ease-out]">
                {step === "account" && <AccountStep />}
                {step === "property" && <PropertyStep />}
                {step === "launch" && <LaunchStep />}
                {step === "success" && <SuccessStep />}
              </div>
            </div>
          )}
        </Card>
      </div>
    </OnboardingShell>
  );
};

export default OnboardingWizard;
