// components/billing/BillingSummary.tsx
import React, { useState, useEffect, useRef } from "react";
import { Plan, App, ValidForType } from "@/@types/subscription";
import { formatPrice, calculatePricing } from "@/utils/pricing";

interface BillingSummaryProps {
  selectedPlan: Plan | null;
  selectedApps: App[];
  teamCount: number;
  onRemoveApp: (app: App) => void;
  onUpgrade: (validFor: ValidForType) => Promise<void> | void;
}

export const BillingSummary: React.FC<BillingSummaryProps> = ({
  selectedPlan,
  selectedApps,
  teamCount,
  onRemoveApp,
  onUpgrade,
}) => {
  const [validFor, setValidFor] = useState<ValidForType>("month");
  const totalRef = useRef<HTMLSpanElement | null>(null);

  const { appsTotal, teamCost, multiplier, discount, subtotal, total } =
    calculatePricing(selectedPlan, selectedApps, teamCount, validFor);

  useEffect(() => {
    if (totalRef.current && selectedPlan) {
      totalRef.current.classList.remove("total-bump");
      void totalRef.current.offsetWidth;
      totalRef.current.classList.add("total-bump");
    }
  }, [total, selectedPlan, validFor]);

  const validForOptions: {
    value: ValidForType;
    label: string;
    color: string;
  }[] = [
    { value: "month", label: "Monthly", color: " #1447e6 " },
    {
      value: "quarter",
      label: "Quarterly",
      color: " oklch(49.6% 0.265 301.924)",
    },
    {
      value: "6month",
      label: "6 Months",
      color: " oklch(55.3% 0.195 38.402) ",
    },
    { value: "year", label: "Yearly", color: "green" },
  ];

  const getButtonClass = (optionValue: ValidForType) => {
    const isSelected = validFor === optionValue;
    const color = validForOptions.find(
      (opt) => opt.value === optionValue
    )?.color;

    if (isSelected) {
      return `bg-${color}-500 text-white shadow-md`;
    }
    return "bg-gray-100 text-gray-600 hover:bg-gray-200";
  };

  if (!selectedPlan) {
    return (
      <div className="bg-white border border-gray-200  rounded-xl p-6 sticky top-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
          <div className="text-base font-bold text-navy">Billing summary</div>
          <div className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
            Monthly
          </div>
        </div>
        <div className="text-center py-6">
          <div className="text-3xl mb-2 opacity-35">📋</div>
          <div className="text-xs text-gray-400 leading-relaxed">
            Select a plan to see
            <br />
            your billing summary
          </div>
        </div>
        <button
          disabled
          className="w-full mt-5 py-3.5 rounded-md bg-gray-200 text-gray-400 font-bold text-sm cursor-not-allowed shadow-none"
        >
          Continue to payment →
        </button>
        <div className="flex items-center justify-center gap-1 text-[11.5px] text-gray-400 mt-3">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 4a1 1 0 110 2 1 1 0 010-2z"
              fill="currentColor"
              opacity=".5"
            />
          </svg>
          No contracts · Cancel anytime
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h2 className="text-base font-bold text-navy">Billing summary</h2>
      </div>

      <div className="flex gap-2 flex-wrap">
        {validForOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setValidFor(option.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all text-white ${getButtonClass(option.value)}`}
            style={{ backgroundColor: option.color }}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div>
        {/* Plan Section */}
        <div className="mb-4">
          <div className="text-[10.5px] font-bold tracking-wide uppercase text-gray-400 mb-1.5">
            Plan
          </div>
          <div className="flex justify-between items-start gap-2">
            <span className="text-sm text-gray-600 flex-1">
              {selectedPlan.name} Plan
            </span>
            <span className="text-sm font-semibold text-gray-800 shrink-0">
              {formatPrice(selectedPlan.price)}/mo
            </span>
          </div>
        </div>

        {/* Apps Section */}
        {selectedApps.length > 0 && (
          <div className="mb-4">
            <div className="text-[10.5px] font-bold tracking-wide uppercase text-gray-400 mb-1.5">
              Add-on apps
            </div>
            <div className="space-y-1">
              {selectedApps.map((app) => (
                <div
                  key={app._id}
                  className="flex justify-between items-center py-1 text-[12.5px]"
                >
                  <span className="text-gray-600">{app.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-800">
                      {formatPrice(app.price)}
                    </span>
                    <button
                      onClick={() => onRemoveApp(app)}
                      className="text-gray-300 hover:text-ternary text-base leading-4 font-bold transition"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        <div className="mb-3">
          <div className="text-[10.5px] font-bold tracking-wide uppercase text-gray-400 mb-1.5">
            Team
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{teamCount} × ₹500</span>
            <span className="text-sm font-semibold text-gray-800">
              {formatPrice(teamCost)}/mo
            </span>
          </div>
        </div>

        <hr className="my-3 border-gray-200" />

        <div className="flex justify-between items-baseline mb-2">
          <div className="flex flex-col w-full">
            <div>
              <span className="text-[15px] font-bold text-navy">
                Total Monthly Price
              </span>
              <div className="flex flex-col items-end">
                {discount > 0 && (
                  <span className="text-md font-medium line-through text-navy tracking-tight transition-all">
                    {formatPrice(subtotal / multiplier)}/mo
                  </span>
                )}
                <span
                  ref={totalRef}
                  className="text-xl font-bold text-navy tracking-tight transition-all"
                >
                  {formatPrice(total / multiplier)}/mo
                </span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-[15px] font-bold text-navy">
                Total Price for {multiplier} months
              </span>
              <div className="flex flex-col items-end">
                {discount > 0 && (
                  <span className="text-md font-medium line-through text-navy tracking-tight transition-all">
                    {formatPrice(subtotal)}
                  </span>
                )}
                <span className="text-xl font-bold text-navy tracking-tight transition-all">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {discount > 0 && (
          <p className="text-green-500 font-medium">
            {discount}% Discount applied
          </p>
        )}
      </div>

      <button
        onClick={() => onUpgrade(validFor)}
        className="w-full mt-5 py-3.5 rounded-md bg-primary text-white font-bold text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <span>Continue to payment</span>
        <span className="text-lg transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </button>

      <div className="flex items-center justify-center gap-1 text-[11.5px] text-gray-400 mt-3">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 4a1 1 0 110 2 1 1 0 010-2z"
            fill="currentColor"
            opacity=".5"
          />
        </svg>
        No contracts · Cancel anytime
      </div>
    </div>
  );
};
