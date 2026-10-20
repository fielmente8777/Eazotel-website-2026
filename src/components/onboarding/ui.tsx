"use client";

import { forwardRef, useId, useState } from "react";
import { FiAlertCircle, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

// ---------- layout ----------

interface ShellProps {
  aside: React.ReactNode;
  children: React.ReactNode;
}

/** Dark two-column page frame shared by onboarding and login. */
export const OnboardingShell: React.FC<ShellProps> = ({ aside, children }) => (
  <main className="relative isolate overflow-hidden bg-[#020208] text-white">
    {/* ambient glows */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-40 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-color-4/30 blur-[120px]"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/3 -right-40 -z-10 h-[24rem] w-[24rem] rounded-full bg-orange-500/15 blur-[120px]"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
    />

    <div className="max_width grid items-start gap-10 py-10 md:py-16 lg:grid-cols-2 lg:gap-16">
      <aside className="flex flex-col gap-8 lg:sticky lg:top-32">{aside}</aside>
      <div>{children}</div>
    </div>
  </main>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_-20px_rgba(13,84,235,0.35)] backdrop-blur-xl md:p-8 ${className}`}
  >
    {children}
  </div>
);

export const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="title-glass-effect w-fit text-xs font-medium tracking-wide text-white md:text-sm">
    {children}
  </span>
);

// ---------- form controls ----------

const inputBase =
  "w-full rounded-lg border bg-[#1E1E1E] px-4 py-3.5 text-white outline-none transition-all duration-200 placeholder:text-[#9EA3AB] focus:border-color-4 focus:ring-2 focus:ring-color-4/30 disabled:opacity-60";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
}

export const TextField = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, icon, hint, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label htmlFor={id} className="text-sm font-medium text-white/80">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-[#9EA3AB]">
              {icon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : undefined}
            className={`${inputBase} ${icon ? "pl-11" : ""} ${error ? "border-[#FF6161]/70" : "border-white/10"}`}
            {...props}
          />
        </div>
        {error ? <FieldError id={`${id}-err`} message={error} /> : hint ? (
          <p className="text-xs text-white/50">{hint}</p>
        ) : null}
      </div>
    );
  }
);
TextField.displayName = "TextField";

export const PasswordField: React.FC<FieldProps> = ({ icon, ...props }) => {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const { label, error, hint, className = "", ...inputProps } = props;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-white/80">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-[#9EA3AB]">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={!!error}
          className={`${inputBase} pr-12 ${icon ? "pl-11" : ""} ${error ? "border-[#FF6161]/70" : "border-white/10"}`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1.5 text-[#9EA3AB] transition-colors hover:text-white"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {error ? <FieldError message={error} /> : hint ? (
        <p className="text-xs text-white/50">{hint}</p>
      ) : null}
    </div>
  );
};

export const FieldError: React.FC<{ message: string; id?: string }> = ({
  message,
  id,
}) => (
  <p id={id} className="flex items-center gap-1.5 text-sm text-[#FF6161]">
    <FiAlertCircle className="shrink-0" />
    {message}
  </p>
);

export const Alert: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    role="alert"
    className="flex items-start gap-3 rounded-xl border border-[#FF6161]/30 bg-[#FF6161]/10 px-4 py-3 text-sm text-[#ffb3b3]"
  >
    <FiAlertCircle className="mt-0.5 shrink-0 text-base text-[#FF6161]" />
    <div>{children}</div>
  </div>
);

// ---------- buttons ----------

type BtnVariant = "primary" | "accent" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variants: Record<BtnVariant, string> = {
  primary:
    "bg-color-4 text-white hover:shadow-[0_10px_40px_-8px_rgba(13,84,235,0.7)]",
  accent:
    "bg-orange-500 text-white hover:shadow-[0_10px_40px_-8px_rgba(249,115,22,0.7)]",
  ghost: "bg-white/10 text-white shadow-inner backdrop-blur-md hover:bg-white/15",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading,
  icon,
  children,
  className = "",
  disabled,
  ...props
}) => (
  <button
    disabled={disabled || loading}
    className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-medium transition-all duration-300 ease-in-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none ${variants[variant]} ${className}`}
    {...props}
  >
    {loading && <FiLoader className="animate-spin" />}
    {children}
    {!loading && icon}
  </button>
);
