"use client";

import {
  dashboardLink,
  useCreateUserMutation,
  useLazyGetUserQuery,
  useLazyHasSubscriptionQuery,
} from "@/store/api/eazotelApi";
import { useAppDispatch } from "@/store/hooks";
import { persistToken, setToken } from "@/store/slices/authSlice";
import { goToStep, resetOnboarding, updateForm } from "@/store/slices/onboardingSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiLock, FiMail } from "react-icons/fi";
import { Alert, Button, Card, OnboardingShell, PasswordField, Pill, TextField } from "./ui";
import { isEmail } from "./validation";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createUser, { isLoading: signingIn }] = useCreateUserMutation();
  const [getUser, { isFetching: checking }] = useLazyGetUserQuery();
  const [checkSubscription] = useLazyHasSubscriptionQuery();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Enter a valid email address";
    if (!password) next.password = "Enter your password";
    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length) return;

    try {
      const res = await createUser({
        register: false,
        emailId: email.trim(),
        userName: "Testing",
        accesskey: password,
      }).unwrap();

      if (!res.Status || !res.Token) {
        setFormError("Incorrect email or password.");
        return;
      }

      persistToken(res.Token);
      dispatch(setToken(res.Token));
      // Drop progress saved for whoever used this browser before.
      dispatch(resetOnboarding());

      const user = await getUser(res.Token).unwrap().catch(() => null);
      // Only gian's 404 means "missing"; if the check fails, don't block.
      const subscribed =
        !!user?.Status &&
        (await checkSubscription(res.Token)
          .unwrap()
          .catch((err: { status?: unknown }) => err?.status !== 404));
      setRedirecting(true);
      if (user?.Status && subscribed) {
        // Website + subscription → straight to the dashboard.
        window.location.href = dashboardLink(res.Token);
      } else if (user?.Status) {
        // Website but no subscription → the wizard resumes at launch.
        dispatch(updateForm({ email: email.trim() }));
        router.push("/onboarding/");
      } else {
        // Account without a website yet → finish onboarding.
        dispatch(updateForm({ email: email.trim() }));
        dispatch(goToStep("account"));
        router.push("/onboarding/");
      }
    } catch {
      setFormError("We couldn't reach the server. Please try again.");
    }
  };

  const busy = signingIn || checking || redirecting;

  return (
    <OnboardingShell
      aside={
        <>
          <Pill>✦ Welcome back</Pill>
          <div className="flex flex-col gap-4">
            <h1 className="font-primary text-[32px]/[38px] font-semibold md:text-[48px]/[54px]">
              Log in to{" "}
              <span className="bg-gradient-to-r from-color-4 to-[#5E98F6] bg-clip-text text-transparent">
                Eazotel
              </span>
            </h1>
            <p className="text-white/65 md:text-lg">
              Manage your website, booking engine, rates and guests — all from
              one dashboard.
            </p>
          </div>
          <ul className="flex flex-col gap-3 lg:border-t lg:border-white/10 lg:pt-6">
            {[
              "Update your website in minutes",
              "Track direct bookings in real time",
              "Manage channels, rooms and offers",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/65">
                <FiCheckCircle className="shrink-0 text-color-4" /> {item}
              </li>
            ))}
          </ul>
        </>
      }
    >
      <Card className="mx-auto w-full max-w-xl">
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-primary text-2xl font-semibold md:text-3xl">
              Sign in to your account
            </h2>
            <p className="text-white/60">Use the email you signed up with.</p>
          </div>

          {formError && <Alert>{formError}</Alert>}

          <TextField
            label="Email"
            type="email"
            placeholder="you@yourhotel.com"
            icon={<FiMail />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
            error={errors.email}
            autoComplete="email"
            autoFocus
          />
          <PasswordField
            label="Password"
            placeholder="Your password"
            icon={<FiLock />}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((p) => ({ ...p, password: undefined }));
            }}
            error={errors.password}
            autoComplete="current-password"
          />

          <Button type="submit" loading={busy} icon={<FiArrowRight />} className="mt-2 w-full">
            {redirecting ? "Redirecting…" : "Log in"}
          </Button>

          <p className="text-center text-sm text-white/60">
            New to Eazotel?{" "}
            <Link
              href="/onboarding/"
              className="font-medium text-white underline-offset-4 hover:text-color-4 hover:underline"
            >
              Create a free account
            </Link>
          </p>
        </form>
      </Card>
    </OnboardingShell>
  );
};

export default LoginForm;
