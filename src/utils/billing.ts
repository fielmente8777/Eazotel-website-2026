import type { BillingCycle } from "@/@types/subscription";
import { DASHBOARD_URL, GIAN_API_URL } from "@/store/api/eazotelApi";

/** gian-new, the backend that owns plans and prices (set NEXT_PUBLIC_EAZOTEL_API_URL to change it). */
export const EAZOTEL_API_URL = (process.env.NEXT_PUBLIC_EAZOTEL_API_URL || "https://gian-new.onrender.com").replace(/\/+$/, "");
export const CATALOGUE_URL = `${EAZOTEL_API_URL}/api/v1/billing/catalogue`;
/** the older backend's plans, used only if gian-new can't be reached */
export const LEGACY_PLANS_URL = `${GIAN_API_URL}/subscription/plans`;

/** Payment happens in the dashboard: it knows who the hotel is. */
export const dashboardPlansUrl = (planCode: string, cycleMonths: number) =>
  `${DASHBOARD_URL}/plans?plan=${encodeURIComponent(planCode)}&cycle=${cycleMonths}`;

export const SIGNUP_URL = "/onboarding/";
export const SALES_WHATSAPP_URL =
  "https://wa.me/919501868775?text=Hi%20Eazotel%2C%20I%27d%20like%20to%20talk%20about%20the%20Enterprise%20plan";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatPrice = (rupees: number): string => inr.format(Math.round(rupees));

/** A monthly price after the cycle's discount. */
export const monthlyAfterDiscount = (price: number, cycle: BillingCycle | undefined) =>
  Math.round(price * (1 - (cycle?.discountPercent ?? 0) / 100));

export const limitText = (value: number) => (value < 0 ? "Unlimited" : value.toLocaleString("en-IN"));

export const SUPPORT_LABELS: Record<string, string> = {
  none: "Community help",
  standard: "Email support",
  premium: "Priority support",
  enterprise: "Dedicated account manager",
};
