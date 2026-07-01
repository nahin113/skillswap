"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button} from "@heroui/react";
import { updateProposal } from "@/lib/actions/proposals";
import { toast } from "react-toastify";

export default function ManageProposalsClient({ initialProposals }) {
  const router = useRouter();
  const [proposals, setProposals] = useState(initialProposals);
  const [processingId, setProcessingId] = useState(null);

  // 🔒 CRITICAL REQUIREMENT: Group accepted items to enforce single-acceptance constraints
  const acceptedTaskIds = proposals
    .filter(
      (p) =>
        p.status?.toLowerCase() === "accepted" ||
        p.task_status === "In Progress"
    )
    .map((p) => p.task_id);

  // Handle Reject Action
  const handleReject = async (proposalId) => {
    setProcessingId(proposalId);
    try {
      const result = await updateProposal(proposalId, { status: "Rejected" });
      if (result.modifiedCount) {
        toast.warning(`Proposal Rejected`);
      }
      // Update UI state cleanly
      setProposals((prev) =>
        prev.map((p) =>
          p._id === proposalId ? { ...p, status: "Rejected" } : p
        )
      );
    } catch (err) {
      alert(err.message || "An error occurred while rejecting the proposal.");
    } finally {
      setProcessingId(null);
    }
  };

  // Handle Accept Redirect to Stripe Checkout Loop
const handleAcceptRedirect = (proposal) => {
  const pId = proposal._id?.toString() || proposal.id;
  const tId = proposal.task_id;
  const amount = proposal.proposed_budget;

  // URL-encode strings to prevent breakages caused by spaces or special characters
  const title = encodeURIComponent(proposal.task_title || "Project Assignment");
  const fEmail = encodeURIComponent(proposal.freelancer_email || "");
  const cEmail = encodeURIComponent(proposal.client_email || "");

  // Route directly to your summary confirmation page with full context parameters
  router.push(
    `/payment/checkout?proposalId=${pId}&taskId=${tId}&amount=${amount}&taskTitle=${title}&freelancerEmail=${fEmail}&clientEmail=${cEmail}`
  );
};

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">Project / Freelancer</th>
              <th className="py-4 px-6">Budget Bid</th>
              <th className="py-4 px-6">Timeline</th>
              <th className="py-4 px-6">Cover Note Message</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {proposals.length > 0 ? (
              proposals.map((proposal) => {
                const proposalId = proposal._id?.toString() || proposal.id;
                console.log(proposalId)
                const isCurrentTaskLocked = acceptedTaskIds.includes(
                  proposal.task_id
                );
                const currentStatus =
                  proposal.status?.toLowerCase() || "pending";

                return (
                  <tr
                    key={proposalId}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Project & Freelancer Details */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">
                        {proposal.task_title || "Project Context Spec"}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        By: {proposal.freelancer_email}
                      </div>
                    </td>

                    {/* Budget Price */}
                    <td className="py-4 px-6 font-medium text-slate-900">
                      ${Number(proposal.proposed_budget).toLocaleString()} USD
                    </td>

                    {/* Completion Days */}
                    <td className="py-4 px-6 text-slate-600">
                      {proposal.estimated_days} Day
                      {proposal.estimated_days !== 1 && "s"}
                    </td>

                    {/* Message Note (Cover Note) */}
                    <td className="py-4 px-6 max-w-xs">
                      <p className="text-xs text-slate-500 line-clamp-2 hover:line-clamp-none transition-all cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {proposal.cover_note}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          currentStatus === "accepted" ||
                          proposal.task_status === "In Progress"
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                            : currentStatus === "rejected"
                            ? "text-rose-700 bg-rose-50 border-rose-200"
                            : "text-amber-700 bg-amber-50 border-amber-200"
                        }`}
                      >
                        {proposal.task_status === "In Progress"
                          ? "In Progress"
                          : proposal.status || "pending"}
                      </span>
                    </td>

                    {/* Operational Actions */}
                    <td className="py-4 px-6 text-right">
                      {currentStatus === "pending" &&
                      proposal.task_status !== "In Progress" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            isDisabled={processingId !== null}
                            onClick={() => handleReject(proposalId)}
                            className="font-medium text-xs rounded-lg"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            color="primary"
                            // 🔒 Disable action if another proposal has already filled this specific task slot
                            isDisabled={
                              isCurrentTaskLocked || processingId !== null
                            }
                            onClick={() => handleAcceptRedirect(proposal)}
                            className="font-semibold text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                          >
                            {isCurrentTaskLocked ? "Locked" : "Accept & Pay"}
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          No actions available
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No active freelancer proposals found for your active job
                  positions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
