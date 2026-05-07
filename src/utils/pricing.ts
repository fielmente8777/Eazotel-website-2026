import { App, Plan } from "@/@types/subscription";

// utils/pricing.ts
export const formatPrice = (num: number): string => 
  `₹${num.toLocaleString("en-IN")}`;

export const getValidForMultiplier = (validFor: string): number => {
  switch (validFor) {
    case "month": return 1;
    case "quarter": return 3;
    case "6month": return 6;
    case "year": return 12;
    default: return 1;
  }
};

export const getDiscountPercentage = (validFor: string): number => {
  switch (validFor) {
    case "month": return 5;
    case "quarter": return 10;
    case "6month": return 15;
    case "year": return 30;
    default: return 5;
  }
};

export const calculatePricing = (
  selectedPlan: Plan | null,
  selectedApps: App[],
  teamCount: number,
  validFor: string
) => {
  const appsTotal = selectedApps?.reduce((sum, app) => sum + app.price, 0) || 0;
  const teamCost = teamCount * 500;
  const multiplier = getValidForMultiplier(validFor);
  const discount = getDiscountPercentage(validFor);
  
  const subtotal = selectedPlan
    ? (selectedPlan.price + appsTotal + teamCost) * multiplier
    : 0;
  
  const total = subtotal - (subtotal * discount) / 100;
  
  return {
    appsTotal,
    teamCost,
    multiplier,
    discount,
    subtotal,
    total,
  };
};