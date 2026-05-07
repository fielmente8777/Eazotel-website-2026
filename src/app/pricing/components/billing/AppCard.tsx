// components/billing/AppCard.tsx
import React from 'react';
import { formatPrice } from '@/utils/pricing';
import { App } from '@/@types/subscription';

interface AppCardProps {
  app: App;
  isSelected: boolean;
  onToggle: () => void;
  locked: boolean;
}

const IconMap: Record<string, string> = {
  "WhatsApp Chat": "💬",
  "Lead Management": "🎯",
  "Exotel Integration": "📞",
  CRM: "🗂️",
  "Booking Engine + Reservation Desk": "🏨",
  Eazbot: "🤖",
  Webhook: "🔗",
  "WordPress Webhook": "🧩",
  GRM: "📊",
  "Meta Leads": "📈",
};

export const AppCard: React.FC<AppCardProps> = ({ app, isSelected, onToggle, locked }) => {
  return (
    <div
      className={`bg-white border rounded-xl p-3 flex items-center justify-between gap-3 transition-all duration-200 ${
        locked 
          ? "opacity-50 pointer-events-none border-gray-200" 
          : isSelected 
            ? "border-ternary bg-ternary-pale" 
            : "border-gray-200 hover:border-navy-muted hover:-translate-y-0.5"
      }`}
    >
      <div className={`w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-base shrink-0 ${isSelected ? "bg-ternary/10" : ""}`}>
        {IconMap[app.name] || "🔌"}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-gray-800 truncate">
          {app.name}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {formatPrice(app.price)}/month
        </div>
      </div>
      
      <button
        onClick={onToggle}
        disabled={locked}
        className={`app-toggle shrink-0 w-16 py-1.5 px-2 rounded-full text-xs font-semibold border-2 transition-all text-center ${
          isSelected 
            ? "bg-primary border-primary text-white hover:bg-ternary-light" 
            : "border-gray-300 bg-transparent text-gray-600 hover:border-navy hover:text-navy"
        }`}
      >
        {isSelected ? "Remove" : "Add"}
      </button>
    </div>
  );
};