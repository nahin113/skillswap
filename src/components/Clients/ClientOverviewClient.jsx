"use client";

import React from "react";
import {
  FolderKanban,
  Radio,
  Activity,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

export default function ClientOverviewClient({
  metrics,
  spendingData,
  distribution,
}) {
//   console.log(metrics, spendingData, distribution);
  const cardConfigs = [
    {
      label: "Total Tasks",
      value: metrics.totalTasks,
      icon: FolderKanban,
      color: "bg-zinc-50 border-zinc-200 text-zinc-900",
    },
    {
      label: "Open Tasks",
      value: metrics.openTasks,
      icon: Radio,
      color: "bg-emerald-50/50 border-emerald-100 text-[#4E654C]",
    },
    {
      label: "Tasks In Progress",
      value: metrics.inProgressTasks,
      icon: Activity,
      color: "bg-amber-50/40 border-amber-100 text-amber-700",
    },
    {
      label: "Total Spent (USD)",
      value: `$${metrics.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-[#F4EFEA] border-[#E6DDD4] text-[#1C1E1B]",
    },
  ];

  // Find peak spending to accurately scale chart bar heights dynamically
  const maxSpent = Math.max(...spendingData.map((d) => d.spent), 1);

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div>
        <h1 className="text-xl font-black text-[#1C1E1B]">
          Workspace Overview
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Review your project pipeline allocation, tracking indicators, and real
          financial investments.
        </p>
      </div>

      {/* Grid Stat Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardConfigs.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between transition-transform hover:-translate-y-0.5 duration-200 ${card.color}`}
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold tracking-wider uppercase opacity-70 block">
                  {card.label}
                </span>
                <span className="text-2xl font-black tracking-tight block">
                  {card.value}
                </span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-black/5 shadow-sm shrink-0">
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Visualization Group */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Spending Timeline Chart */}
        <div className="md:col-span-2 bg-white border border-[#E6DDD4] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-black text-[#1C1E1B]">
                  Capital Expenditure
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Monthly breakdown of cleared project allocations
                </p>
              </div>
            </div>

            {/* Visual Dynamic Bars */}
            <div className="h-44 flex items-end justify-between gap-3 mt-8 px-2">
              {spendingData.map((data, idx) => {
                // 💡 Ensure numeric fallback and set a clear minimum visible pillar height (e.g., 6px)
                const spentAmount = Number(data.spent || 0);
                const calculatedHeight =
                  maxSpent > 0 ? (spentAmount / maxSpent) * 100 : 0;
                  
                console.log(idx, " : ", typeof spentAmount,typeof calculatedHeight)

                // If amount is greater than 0, give it a base height so it physically shows up
                const barHeight =
                  spentAmount > 0 ? `${Math.max(calculatedHeight, 8)}%` : "6px";
                const barColor =
                  spentAmount > 0 ? "bg-[#4E654C]" : "bg-zinc-200/60";

                return (
                  <div
                    key={idx}
                    className="h-full flex-1 flex flex-col items-center justify-end gap-2 group relative"
                  >
                    {/* Tooltip Hover Value */}
                    <div className="absolute -top-7 scale-0 group-hover:scale-100 transition-all duration-150 bg-slate-900 text-white font-mono text-[10px] px-2 py-0.5 rounded shadow-md pointer-events-none z-10">
                      ${spentAmount}
                    </div>

                    {/* Column Pillar Container */}
                    <div className="w-full flex-1 flex items-end min-h-0">
                      <div
                        style={{ height: barHeight }}
                        className={`w-full rounded-t-md transition-all duration-300 shadow-sm ${barColor} group-hover:bg-[#1C1E1B]`}
                      />
                    </div>

                    <span className="text-[10px] font-bold text-zinc-400 group-hover:text-[#1C1E1B] uppercase mt-1 shrink-0">
                      {data.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status Pipeline Health Distribution Card */}
        <div className="bg-white border border-[#E6DDD4] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-[#1C1E1B]">
              Pipeline Density
            </h3>
            <p className="text-[11px] text-zinc-400 mb-6">
              Proportional breakdown of open vs active tracks
            </p>

            <div className="space-y-4">
              {/* Open Track Share */}
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-zinc-600">Open Backlog</span>
                  <span className="text-[#1C1E1B]">
                    {distribution.openPercentage}%
                  </span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${distribution.openPercentage}%` }}
                    className="h-full bg-[#4E654C] rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              {/* In Progress Track Share */}
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-zinc-600">In Progress Flow</span>
                  <span className="text-[#1C1E1B]">
                    {distribution.progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${distribution.progressPercentage}%` }}
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-4 text-[10px] text-zinc-400 font-medium leading-relaxed">
            Data reflects assignments associated with your registered email and
            verified invoice records.
          </div>
        </div>
      </div>
    </div>
  );
}
