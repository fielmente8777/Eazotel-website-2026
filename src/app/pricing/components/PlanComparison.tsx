import type { App, Plan } from "@/@types/subscription";
import { formatPrice, limitText, SUPPORT_LABELS } from "@/utils/billing";

const Yes = () => (
  <svg className="mx-auto h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" role="img" aria-label="Included">
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
  </svg>
);

/** Every app and limit side by side: included, or available as an add-on at its price. */
export function PlanComparison({ plans, apps, seatPrice }: { plans: Plan[]; apps: App[]; seatPrice: number }) {
  const core = ["Hotel website and CMS", "SEO tools and Google reviews", "Front desk and payment gateway", "Google Analytics reports"];
  return (
    <div className="overflow-x-auto rounded-2xl border border-main-border bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <caption className="sr-only">What each plan includes</caption>
        <thead>
          <tr className="border-b border-main-border bg-background-1">
            <th scope="col" className="px-5 py-4 text-left font-semibold text-primary">
              Feature
            </th>
            {plans.map((p) => (
              <th key={p.id} scope="col" className="px-5 py-4 text-center font-semibold text-primary">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <SectionRow title="Every plan" span={plans.length + 1} />
          {core.map((label) => (
            <tr key={label} className="border-b border-main-border/70">
              <th scope="row" className="px-5 py-3 text-left font-normal text-secondary">
                {label}
              </th>
              {plans.map((p) => (
                <td key={p.id} className="px-5 py-3">
                  <Yes />
                </td>
              ))}
            </tr>
          ))}
          <SectionRow title="Apps" span={plans.length + 1} />
          {apps.map((app) => (
            <tr key={app.code} className="border-b border-main-border/70">
              <th scope="row" className="px-5 py-3 text-left font-normal text-secondary">
                {app.name}
              </th>
              {plans.map((p) => (
                <td key={p.id} className="px-5 py-3 text-center text-xs text-tertiary">
                  {p.includedApps.includes(app.code) ? <Yes /> : `+ ${formatPrice(app.price)}/mo`}
                </td>
              ))}
            </tr>
          ))}
          <SectionRow title="Limits and support" span={plans.length + 1} />
          {(
            [
              ["Team members", (p: Plan) => `${limitText(p.limits.teamMembers)}${p.limits.teamMembers >= 0 ? ` (+${formatPrice(seatPrice)}/extra)` : ""}`],
              ["Properties", (p: Plan) => limitText(p.limits.properties)],
              ["AI credits / month", (p: Plan) => limitText(p.limits.aiCreditsMonthly)],
              ["Support", (p: Plan) => SUPPORT_LABELS[p.support] ?? p.support],
            ] as const
          ).map(([label, value]) => (
            <tr key={label} className="border-b border-main-border/70 last:border-0">
              <th scope="row" className="px-5 py-3 text-left font-normal text-secondary">
                {label}
              </th>
              {plans.map((p) => (
                <td key={p.id} className="px-5 py-3 text-center text-xs font-medium text-primary">
                  {value(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionRow({ title, span }: { title: string; span: number }) {
  return (
    <tr className="bg-background-1">
      <th colSpan={span} scope="colgroup" className="px-5 py-2 text-left text-[11px] font-bold tracking-wider text-tertiary uppercase">
        {title}
      </th>
    </tr>
  );
}
