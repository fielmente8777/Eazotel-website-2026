// app/billing/page.tsx
"use client";

import React from "react";
import { PlanCard } from "./components/billing/PlanCard";
import { AppCard } from "./components/billing/AppCard";
import { BillingSummary } from "./components/billing/BillingSummary";
import { TeamSelector } from "./components/billing/TeamSelector";
import { useBilling } from "@/hooks/useBilling";
import { ValidForType } from "@/@types/subscription";

export default function BillingPage() {
  const {
    selectedPlan,
    selectedApps,
    teamCount,
    plans,
    apps,
    loading,
    handlePlanSelect,
    handleToggleApp,
    handleRemoveApp,
    handleTeamChange,
    isPlanSelected,
    appsLocked,
    handleUpgrade,
  } = useBilling();

  if (loading) {
    return (
      <div className="bg-[#f8f9fc] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ternary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-ternary-pale text-ternary text-[11px] font-semibold tracking-wide uppercase px-3.5 py-1 rounded-full border border-ternary-border mb-4">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9-2.1-2 2.9-.4L6 1z"
                fill="currentColor"
              />
            </svg>
            Hotel Growth Platform
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy tracking-tight leading-tight mb-2">
            Choose your plan &amp; customize your tools
          </h1>
          <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
            Start with a base plan, then add only the tools you need.
            Transparent pricing, no surprises.
          </p>
        </header>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Plans Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400">
                  Base plan — required
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {plans.map((plan) => {
                  if (!plan.price) return null;
                  return (
                    <PlanCard
                      key={plan._id}
                      plan={plan}
                      isSelected={isPlanSelected(plan._id)}
                      onSelect={() => handlePlanSelect(plan)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Apps Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400">
                  Add apps to your plan
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Locked banner */}
              {appsLocked && (
                <div className="flex items-center gap-2.5 bg-gray-100 border border-dashed border-gray-400 rounded-xl p-3 mb-3 text-sm text-gray-600">
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-sm shrink-0">
                    🔒
                  </div>
                  <span>Select a base plan above to enable add-on apps</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {apps.map((app) => (
                  <AppCard
                    key={app._id}
                    app={app}
                    isSelected={selectedApps.some(
                      (selectedApp) => selectedApp._id === app._id
                    )}
                    onToggle={() => handleToggleApp(app)}
                    locked={appsLocked}
                  />
                ))}
              </div>
            </div>

            {/* Team Section */}
            <TeamSelector
              teamCount={teamCount}
              onTeamChange={handleTeamChange}
            />
          </div>

          {/* Right Column - Billing Summary */}
          <BillingSummary
            selectedPlan={selectedPlan}
            selectedApps={selectedApps}
            teamCount={teamCount}
            onRemoveApp={handleRemoveApp}
            onUpgrade={
              handleUpgrade as (validFor: ValidForType) => Promise<void>
            } // Add type assertion
          />
        </div>
      </div>
    </div>
  );
}
