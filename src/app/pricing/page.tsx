"use client";

import { useState } from "react";

import { usePricingCatalogue } from "@/hooks/usePricingCatalogue";
import { formatPrice, SALES_WHATSAPP_URL } from "@/utils/billing";

import { PlanComparison } from "./components/PlanComparison";
import { PricingPlanCard } from "./components/PricingPlanCard";

const FAQ = [
  {
    q: "How does the free trial work?",
    a: "Sign up and every app is on for the trial period, no card needed. Before it ends, pick a plan in your dashboard; only the apps in your plan, and the add-ons you choose, stay on.",
  },
  {
    q: "Can I add apps later?",
    a: "Yes. Open Plans in your dashboard, add the apps you need and pay the difference. The unused part of your current plan is taken off the price.",
  },
  {
    q: "What happens when my plan ends?",
    a: "Your dashboard asks you to renew. New enquiries are still saved and are waiting for you as soon as you renew. Turn on auto-renew to never think about it.",
  },
  {
    q: "How do I pay?",
    a: "Securely through Razorpay with UPI, cards or net banking. You get a receipt by email, and every payment is listed in your dashboard. All prices are before 18% GST.",
  },
  {
    q: "Do you have plans for hotel groups?",
    a: "Yes: Enterprise includes every app, unlimited properties and a dedicated account manager, priced for your group. Talk to us and we'll set it up in your dashboard.",
  },
];

export default function PricingPage() {
  const state = usePricingCatalogue();
  const [months, setMonths] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background-1">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-color-4 uppercase">Pricing</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">One platform. Plans that grow with your hotel.</h1>
          <p className="mt-4 text-lg leading-relaxed text-tertiary">
            Website, bookings, leads, WhatsApp and AI in one dashboard. Start free, then pay only for what you use.
          </p>
        </header>

        {state.status === "loading" && (
          <div className="mt-14 grid gap-6 md:grid-cols-3" aria-busy>
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[520px] animate-pulse rounded-2xl bg-white" />
            ))}
          </div>
        )}

        {state.status === "failed" && (
          <div className="mx-auto mt-14 max-w-md rounded-2xl border border-main-border bg-white p-8 text-center">
            <p className="font-semibold text-primary">We couldn&apos;t load the plans right now.</p>
            <p className="mt-2 text-sm text-tertiary">Please refresh the page, or talk to us and we&apos;ll share the pricing.</p>
            <a href={SALES_WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white">
              Chat with us
            </a>
          </div>
        )}

        {state.status === "ready" && <Catalogue catalogue={state.catalogue} months={months} setMonths={setMonths} />}

        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary">Questions, answered</h2>
          <div className="mt-8 divide-y divide-main-border rounded-2xl border border-main-border bg-white">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group px-6 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-primary">
                  {q}
                  <span className="text-xl text-tertiary transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-tertiary">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Catalogue({
  catalogue,
  months,
  setMonths,
}: {
  catalogue: import("@/@types/subscription").Catalogue;
  months: number | null;
  setMonths: (m: number) => void;
}) {
  const { plans, apps, settings, offers } = catalogue;
  const cycles = settings.cycles;
  const active = months ?? (cycles.some((c) => c.months === 12) ? 12 : (cycles.at(-1)?.months ?? 1));
  const cycle = cycles.find((c) => c.months === active);
  const best = Math.max(0, ...cycles.map((c) => c.discountPercent));
  const addons = apps.filter((a) => plans.some((p) => !p.includedApps.includes(a.code)));

  return (
    <>
      {offers.length > 0 && (
        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-color-4/30 bg-color-4/5 px-5 py-3 text-center text-sm text-primary">
          {offers.map((o) => (
            <p key={o.code}>
              <b>{o.name}</b>
              {o.description ? `: ${o.description}` : ""} · code <span className="font-mono font-bold text-color-4">{o.code}</span>
            </p>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-2">
        <div role="radiogroup" aria-label="Billing cycle" className="inline-flex flex-wrap justify-center gap-1 rounded-xl border border-main-border bg-white p-1">
          {cycles.map((c) => (
            <button
              key={c.months}
              type="button"
              role="radio"
              aria-checked={c.months === active}
              onClick={() => setMonths(c.months)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${c.months === active ? "bg-primary text-white" : "text-secondary hover:text-primary"}`}
            >
              {c.label}
              {c.discountPercent > 0 && (
                <span className={`ml-1.5 text-xs font-semibold ${c.months === active ? "text-emerald-300" : "text-emerald-600"}`}>−{c.discountPercent}%</span>
              )}
            </button>
          ))}
        </div>
        {best > 0 && <p className="text-xs text-tertiary">Save up to {best}% with yearly billing. Prices before GST.</p>}
      </div>

      <section aria-label="Plans" className={`mt-12 grid gap-6 ${plans.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {plans.map((plan) => (
          <PricingPlanCard key={plan.id} plan={plan} apps={apps} cycle={cycle} trialDays={settings.trialDays} />
        ))}
      </section>

      {addons.length > 0 && (
        <section className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-primary">Add-on apps</h2>
            <p className="mt-2 text-tertiary">Add any app your plan doesn&apos;t include, at its monthly price. Extra team seats are {formatPrice(settings.seatPrice)} each per month.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((app) => (
              <div key={app.code} className="flex items-start justify-between gap-4 rounded-xl border border-main-border bg-white p-4">
                <div>
                  <p className="font-semibold text-primary">{app.name}</p>
                  {app.description && <p className="mt-0.5 text-sm text-tertiary">{app.description}</p>}
                </div>
                <p className="shrink-0 text-sm font-semibold text-primary">
                  {formatPrice(app.price)}
                  <span className="font-normal text-tertiary">/mo</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-primary">Compare plans</h2>
        <div className="mt-8">
          <PlanComparison plans={plans} apps={apps} seatPrice={settings.seatPrice} />
        </div>
      </section>
    </>
  );
}
