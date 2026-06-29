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
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "rejected":
      case "declined":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "pending":
      default:
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    }
  };

  return (
    <div className="w-full rounded-[24px] border border-zinc-800/80 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-bold uppercase tracking-wider">
              <th className="py-4 px-6">Task Title</th>
              <th className="py-4 px-6">Budget Bid</th>
              <th className="py-4 px-6">Date Sent</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60 text-sm">
            {proposals.length > 0 ? (
              proposals.map((proposal) => {
                const proposalId = proposal._id?.toString() || proposal.id;
                return (
                  <tr
                    key={proposalId}
                    className="hover:bg-zinc-900/30 transition-colors group"
                  >
                    {/* Task Title (or fallback to ID reference if population path isn't expanded) */}
                    <td className="py-4 px-6 font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {proposal.task_title ||
                        proposal.task_id ||
                        "Project Assignment Link"}
                    </td>

                    {/* Budget Bid */}
                    <td className="py-4 px-6 font-mono text-zinc-300">
                      ${Number(proposal.proposed_budget || 0).toLocaleString()}{" "}
                      USD
                    </td>

                    {/* Date Sent */}
                    <td className="py-4 px-6 text-zinc-400 text-xs">
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
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getStatusStyle(
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
                <td colSpan={4} className="py-16 text-center text-zinc-500">
                  <p className="text-base font-medium">
                    No application documents located.
                  </p>
                  <p className="text-xs text-zinc-600 mt-1">
                    When you submit pitches on active task profiles, they will
                    render here.
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
