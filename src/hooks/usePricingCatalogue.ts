import { useEffect, useState } from "react";

import type { App, Catalogue, Plan } from "@/@types/subscription";
import { CATALOGUE_URL, LEGACY_PLANS_URL } from "@/utils/billing";

type State = { status: "loading" } | { status: "ready"; catalogue: Catalogue } | { status: "failed" };

const LEGACY_CYCLES = [
  { months: 1, label: "Monthly", discountPercent: 0 },
  { months: 3, label: "Quarterly", discountPercent: 10 },
  { months: 6, label: "Half-yearly", discountPercent: 15 },
  { months: 12, label: "Yearly", discountPercent: 30 },
];

interface LegacyPlan {
  _id: string;
  planName: string;
  price: number;
  limits?: { teamMembers?: number; aiCreditsMonthly?: number; maxLeadsPerMonth?: number };
  support?: Plan["support"];
}
interface LegacyApp {
  _id: string;
  code: string;
  name: string;
  price: number;
  isActive?: boolean;
}

/** The older backend's answer, shaped like gian-new's (no included apps, default cycles). */
function fromLegacy(body: { result?: { data?: { plans?: LegacyPlan[]; apps?: LegacyApp[] } } }): Catalogue {
  const plans = (body.result?.data?.plans ?? []).filter((p) => p.planName !== "TRIAL");
  const apps = (body.result?.data?.apps ?? []).filter((a) => a.isActive !== false);
  return {
    plans: plans
      .map((p) => ({
        id: p._id,
        code: p.planName,
        name: p.planName.charAt(0) + p.planName.slice(1).toLowerCase(),
        tagline: "",
        price: p.price,
        includedApps: p.price === 0 ? apps.map((a) => a.code) : [],
        highlights: [],
        limits: {
          teamMembers: p.limits?.teamMembers ?? 1,
          properties: p.price === 0 ? -1 : 1,
          aiCreditsMonthly: p.limits?.aiCreditsMonthly ?? 0,
          maxLeadsPerMonth: p.limits?.maxLeadsPerMonth ?? -1,
        },
        support: p.support ?? "standard",
        isCustom: p.price === 0,
        featured: p.planName === "PRO",
      }))
      .sort((a, b) => (a.isCustom ? 1 : 0) - (b.isCustom ? 1 : 0) || a.price - b.price),
    apps: apps.map((a): App => ({ id: a._id, code: a.code, name: a.name, description: "", price: a.price })),
    settings: { currency: "INR", gstPercent: 18, seatPrice: 500, trialDays: 14, cycles: LEGACY_CYCLES },
    offers: [],
  };
}

/**
 * The plans, apps, cycles and offers, as staff set them in the admin console. Falls back to the
 * older backend's plans if gian-new can't be reached, so the page never shows nothing.
 */
export function usePricingCatalogue() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(CATALOGUE_URL);
        if (!res.ok) throw new Error(String(res.status));
        const body = (await res.json()) as { data: Catalogue };
        if (alive) setState({ status: "ready", catalogue: body.data });
      } catch {
        try {
          const res = await fetch(LEGACY_PLANS_URL);
          if (!res.ok) throw new Error(String(res.status));
          const catalogue = fromLegacy(await res.json());
          if (alive) setState({ status: "ready", catalogue });
        } catch {
          if (alive) setState({ status: "failed" });
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
