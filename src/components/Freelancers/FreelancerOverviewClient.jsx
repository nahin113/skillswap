"use client";

import React from "react";
import { Card } from "@heroui/react";
import {
  FileStack,
  Hourglass,
  CheckCircle,
  DollarSign,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function FreelancerOverviewClient({ stats }) {
  // Clean configuration dictionary for looping out stat grid cells
  const cards = [
    {
      label: "Total Proposals",
      value: stats.totalProposals,
      icon: FileStack,
      styles: "bg-zinc-50 border-zinc-200 text-zinc-900",
    },
    {
      label: "Pending Proposals",
      value: stats.pendingProposals,
      icon: Hourglass,
      styles: "bg-amber-50/50 border-amber-100 text-amber-700",
    },
    {
      label: "Accepted Proposals",
      value: stats.acceptedProposals,
      icon: CheckCircle,
      styles: "bg-emerald-50/50 border-emerald-100 text-[#4E654C]",
    },
    {
      label: "Total Earnings (USD)",
      value: `$${(stats.totalEarnings || 0).toLocaleString()}`,
      icon: DollarSign,
      styles: "bg-[#F4EFEA] border-[#E6DDD4] text-[#1C1E1B]",
    },
  ];

  // Calculate matching conversion rates for inner dashboard details
  const conversionRate =
    stats.totalProposals > 0
      ? Math.round((stats.acceptedProposals / stats.totalProposals) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* 4-Column Metric Grid System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between transition-transform hover:-translate-y-0.5 duration-200 ${card.styles}`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-75 block">
                  {card.label}
                </span>
                <span className="text-2xl font-black tracking-tight block font-mono">
                  {card.value}
                </span>
              </div>
              <div className="p-3 bg-white/90 rounded-xl border border-black/5 shadow-sm shrink-0">
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Conversion Banner Card */}
      <div className="bg-white border border-[#E6DDD4] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-black text-[#1C1E1B] flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#4E654C]" /> Proposal Win
            Density
          </h3>
          <p className="text-xs text-zinc-400">
            Percentage of total submitted pitches successfully accepted by
            clients.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-24 bg-zinc-100 h-2.5 rounded-full overflow-hidden">
            <div
              style={{ width: `${conversionRate}%` }}
              className="h-full bg-[#4E654C] rounded-full transition-all duration-500"
            />
          </div>
          <span className="text-sm font-black text-[#1C1E1B] font-mono">
            {conversionRate}% Rate
          </span>
        </div>
      </div>
    </div>
  );
}
