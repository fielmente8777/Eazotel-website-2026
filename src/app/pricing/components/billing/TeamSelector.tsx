// components/billing/TeamSelector.tsx
import React from 'react';

interface TeamSelectorProps {
  teamCount: number;
  onTeamChange: (delta: number) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({ teamCount, onTeamChange }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400">
          Team members
        </span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-gray-800">
            Additional seats
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            ₹500 per member / month
          </div>
        </div>
        <div className="flex items-center bg-gray-100 border-2 border-gray-200 rounded-sm overflow-hidden">
          <button
            onClick={() => onTeamChange(-1)}
            className="w-9 h-9 flex items-center justify-center text-lg text-gray-800 hover:bg-navy hover:text-white transition-all"
          >
            −
          </button>
          <div className="w-12 text-center text-sm font-bold text-navy border-l border-r border-gray-200">
            {teamCount}
          </div>
          <button
            onClick={() => onTeamChange(1)}
            className="w-9 h-9 flex items-center justify-center text-lg text-gray-800 hover:bg-navy hover:text-white transition-all"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};