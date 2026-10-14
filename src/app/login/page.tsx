import LoginForm from "@/components/onboarding/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in | Eazotel",
  description: "Log in to your Eazotel dashboard.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginForm />;
}
