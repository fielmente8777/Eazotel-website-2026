import type { App, BillingCycle, Plan } from "@/@types/subscription";
import {
  dashboardPlansUrl,
  formatPrice,
  limitText,
  monthlyAfterDiscount,
  SALES_WHATSAPP_URL,
  SIGNUP_URL,
  SUPPORT_LABELS,
} from "@/utils/billing";

const Check = () => (
  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
  </svg>
);

/** One plan. Prices are per month after the chosen cycle's discount, before GST. */
export function PricingPlanCard({ plan, apps, cycle, trialDays }: { plan: Plan; apps: App[]; cycle?: BillingCycle; trialDays: number }) {
  const custom = plan.isCustom || plan.price <= 0;
  const monthly = monthlyAfterDiscount(plan.price, cycle);
  const included = apps.filter((a) => plan.includedApps.includes(a.code));

  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7 ${
        plan.featured ? "border-color-4 ring-2 ring-color-4/20" : "border-main-border"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-color-4 px-3.5 py-1 text-[11px] font-bold tracking-wide whitespace-nowrap text-white uppercase">
          Most popular
        </span>
      )}
      <h3 className="text-xl font-bold text-primary">{plan.name}</h3>
      <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-tertiary">{plan.tagline}</p>

      <div className="mt-5 min-h-[72px]">
        {custom ? (
          <>
            <p className="flex items-center gap-3 text-3xl font-bold tracking-tight text-primary">
              <span className="grid h-10 w-10 shrink-0 place-content-center rounded-lg bg-color-4/10 text-color-4">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                  <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
                </svg>
              </span>
              {plan.customPriceLabel || "Let's talk"}
            </p>
            <p className="mt-2 text-xs text-tertiary">{plan.customPriceNote || "A quote built around your properties"}</p>
          </>
        ) : (
          <>
            <p className="flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight text-primary">{formatPrice(monthly)}</span>
              <span className="text-sm text-tertiary">/ month</span>
              {monthly < plan.price && <span className="text-sm text-light line-through">{formatPrice(plan.price)}</span>}
            </p>
            <p className="mt-1 text-xs text-tertiary">
              {cycle && cycle.months > 1 ? `${formatPrice(monthly * cycle.months)} billed ${cycle.label.toLowerCase()}` : "Billed monthly"} · + GST
            </p>
          </>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {custom ? (
          <a href={SALES_WHATSAPP_URL} target="_blank" rel="noreferrer" className="rounded-lg border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
            {plan.customCtaLabel || "Talk to sales"}
          </a>
        ) : (
          <>
            <a
              href={SIGNUP_URL}
              className={`rounded-lg py-3 text-center text-sm font-semibold transition ${
                plan.featured ? "bg-color-4 text-white hover:bg-color-4/90" : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {trialDays > 0 ? `Start ${trialDays}-day free trial` : "Get started"}
            </a>
            <a href={dashboardPlansUrl(plan.code, cycle?.months ?? 12)} className="text-center text-xs font-medium text-color-4 hover:underline">
              Already with Eazotel? Buy or upgrade in your dashboard →
            </a>
          </>
        )}
      </div>

      <div className="mt-6 space-y-5 border-t border-main-border pt-5 text-sm">
        {plan.highlights.length > 0 && (
          <ul className="space-y-2">
            {plan.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-secondary">
                <Check /> {h}
              </li>
            ))}
          </ul>
        )}
        {included.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-wider text-tertiary uppercase">Apps included</p>
            <div className="flex flex-wrap gap-1.5">
              {included.map((a) => (
                <span key={a.code} className="rounded-md bg-background-3 px-2 py-1 text-xs text-secondary">
                  {a.name}
                </span>
              ))}
            </div>
          </div>
        )}
        <dl className="grid grid-cols-2 gap-y-1.5 text-xs">
          <dt className="text-tertiary">Team members</dt>
          <dd className="text-right font-medium text-primary">{limitText(plan.limits.teamMembers)}</dd>
          <dt className="text-tertiary">Properties</dt>
          <dd className="text-right font-medium text-primary">{limitText(plan.limits.properties)}</dd>
          <dt className="text-tertiary">AI credits / month</dt>
          <dd className="text-right font-medium text-primary">{limitText(plan.limits.aiCreditsMonthly)}</dd>
          <dt className="text-tertiary">Support</dt>
          <dd className="text-right font-medium text-primary">{SUPPORT_LABELS[plan.support] ?? plan.support}</dd>
        </dl>
      </div>
    </article>
  );
}
