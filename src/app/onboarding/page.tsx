import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started Free | Eazotel",
  description:
    "Create your hotel website and commission-free booking engine in under 2 minutes with Eazotel.",
  robots: { index: false, follow: true },
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
