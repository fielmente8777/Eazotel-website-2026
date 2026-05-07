// components/billing/PlanCard.tsx
import React from 'react';
import { formatPrice } from '@/utils/pricing';
import { Plan } from '@/@types/subscription';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean | string;
  onSelect: () => void;
}

const formatModuleName = (key: string): string => {
  const map: Record<string, string> = {
    corePlatform: "Core Platform",
    aiLayer: "AI Layer",
    analytics: "Analytics",
    automation: "Automation",
    integrations: "Integrations",
    unlimitedLocation: "Unlimited Location",
  };
  return map[key] || key;
};

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect }) => {
  const priceFormatted = formatPrice(plan.price);
  const planDisplayName = plan.planName || plan.name;

  return (
    <div
      className={`relative bg-white border rounded-xl p-5 cursor-pointer transition-all duration-200 hover:border-primary hover:-translate-y-1 ${
        isSelected === plan._id 
          ? "border-navy bg-navy shadow-lg -translate-y-1" 
          : "border-gray-200"
      } ${planDisplayName === "PRO" && isSelected !== plan._id ? "border-primary" : ""}`}
      onClick={onSelect}
    >
      {planDisplayName === "PRO" && isSelected !== plan._id && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-bold tracking-wide uppercase px-3.5 py-1 rounded-full whitespace-nowrap shadow-md z-10">
          Most popular
        </div>
      )}
      
      <div className="text-[11px] font-bold tracking-wider uppercase mb-1.5 text-gray-400">
        {planDisplayName}
      </div>
      
      <div className="flex items-baseline gap-0.5">
        <span className="text-3xl font-bold tracking-tight">{priceFormatted}</span>
        <span className="text-xs font-medium text-gray-400">/mo</span>
      </div>
      
      <div className="text-[12.5px] leading-snug mt-2 mb-4 text-gray-600">
        {planDisplayName === "BASIC" &&
          "Perfect for small hotels starting their journey toward direct bookings and digital growth."}
        {planDisplayName === "PRO" &&
          "Best value for growing hotels with multichannel automation and advanced tools."}
        {planDisplayName === "ENTERPRISE" &&
          "Full-suite for large properties needing advanced integrations and dedicated support."}
      </div>
      
      <button
        className={`w-full py-2.5 px-3 rounded-sm text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
          isSelected === plan._id 
            ? "border border-white/35 bg-white/15 text-gray-600 hover:bg-white/25" 
            : "border border-navy bg-transparent text-navy hover:bg-navy"
        }`}
      >
        <span className={`check-icon ${isSelected === plan._id ? "inline-flex items-center justify-center w-3.5 h-3.5 bg-green-500 rounded-full" : "hidden"}`}>
          <svg className="w-2 h-2 text-white" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1.5 5.5 4.5 8.5 10.5 2"></polyline>
          </svg>
        </span>
        <span>{isSelected === plan._id ? "Selected" : "Select plan"}</span>
      </button>

      {plan.modules && Object.values(plan.modules).some(Boolean) && (
        <div className="mt-4">
          <div className="text-[10.5px] font-bold tracking-wide uppercase text-gray-400 mb-1.5">
            Includes
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {Object.entries(plan.modules)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <li key={key} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  {formatModuleName(key)}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};