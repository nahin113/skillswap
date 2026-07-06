"use client";

import React, { useState } from "react";

export default function MyProposalsClient({ initialProposals }) {
  const [proposals] = useState(initialProposals);

  // Status Chip Badge Styler Matrix
const getStatusStyle = (status) => {
  const normalize = status?.toLowerCase() || "pending";
  switch (normalize) {
    case "accepted":
    case "approved":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "rejected":
    case "declined":
      return "text-red-700 bg-red-50 border-red-200";
    case "pending":
    default:
      return "text-amber-700 bg-amber-50 border-amber-200";
  }
};


  return (
    <div className="w-full bg-white rounded-2xl border border-zinc-200 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[700px] text-left border-separate border-spacing-0">
          <thead>
            {/* Soft warm-beige header row matching your screenshot */}
            <tr className="bg-[#FAF8F5] text-zinc-800 text-xs font-extrabold uppercase tracking-wide">
              <th className="py-4 px-6 rounded-l-xl border-y border-l border-zinc-100">
                Task Title
              </th>
              <th className="py-4 px-6 border-y border-zinc-100">Budget Bid</th>
              <th className="py-4 px-6 border-y border-zinc-100">Date Sent</th>
              <th className="py-4 px-6 text-right rounded-r-xl border-y border-r border-zinc-100">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-zinc-900">
            {proposals.length > 0 ? (
              proposals.map((proposal) => {
                const proposalId = proposal._id?.toString() || proposal.id;
                return (
                  <tr
                    key={proposalId}
                    className="hover:bg-zinc-50/50 transition-colors duration-150 group"
                  >
                    {/* Task Title */}
                    <td className="py-5 px-6 font-bold text-zinc-950 border-b border-zinc-100 max-w-[280px] truncate">
                      {proposal.task_title ||
                        proposal.task_id ||
                        "Project Assignment Link"}
                    </td>

                    {/* Budget Bid styled inside a crisp capsule block */}
                    <td className="py-5 px-6 border-b border-zinc-100">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700 bg-emerald-50/60 border border-emerald-100 px-3 py-1 rounded-lg">
                        $
                        {Number(proposal.proposed_budget || 0).toLocaleString()}
                        <span className="text-[10px] text-emerald-600/70 font-sans ml-0.5">
                          USD
                        </span>
                      </span>
                    </td>

                    {/* Date Sent with explicit icons if you use Lucide or simple styles */}
                    <td className="py-5 px-6 text-zinc-500 font-medium text-xs border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        {/* Inline SVG Calendar Icon from your screenshot */}
                        <svg
                          className="w-4 h-4 text-zinc-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {proposal.submitted_at
                          ? new Date(proposal.submitted_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-6 text-right border-b border-zinc-100">
                      <span
                        className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${getStatusStyle(
                          proposal.status
                        )}`}
                      >
                        {proposal.status || "pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-20 text-center text-zinc-400">
                  <p className="text-base font-bold text-zinc-800">
                    No application documents located.
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    When you submit pitches on active tasks, they will appear
                    here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
