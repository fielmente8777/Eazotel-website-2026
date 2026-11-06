// What gian-new's public catalogue (GET /api/v1/billing/catalogue) returns.
// Prices are rupees per month before GST; staff change them from the admin console.

/** -1 means unlimited. */
export interface PlanLimits {
  teamMembers: number;
  properties: number;
  aiCreditsMonthly: number;
  maxLeadsPerMonth: number;
}

export interface Plan {
  id: string;
  code: string;
  name: string;
  tagline: string;
  price: number;
  includedApps: string[];
  highlights: string[];
  limits: PlanLimits;
  support: "none" | "standard" | "premium" | "enterprise";
  /** "Contact sales" instead of a price */
  isCustom: boolean;
  /** shown in place of the price on a custom plan; staff can reword them in the admin console */
  customPriceLabel?: string;
  customPriceNote?: string;
  customCtaLabel?: string;
  featured: boolean;
}

export interface App {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
}

export interface BillingCycle {
  months: number;
  label: string;
  discountPercent: number;
}

export interface PublicOffer {
  code: string;
  name: string;
  description: string;
  type: "percent" | "flat";
  value: number;
  endsAt: string | null;
}

export interface Catalogue {
  plans: Plan[];
  apps: App[];
  settings: { currency: string; gstPercent: number; seatPrice: number; trialDays: number; cycles: BillingCycle[] };
  offers: PublicOffer[];
}
