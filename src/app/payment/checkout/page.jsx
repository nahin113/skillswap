import React from "react";
import { Card } from "@heroui/react";

export const dynamic = "force-dynamic";

export default async function CheckoutSummaryPage({ searchParams }) {
  const params = await searchParams;
  const {
    proposalId,
    taskId,
    amount,
    taskTitle,
    freelancerEmail,
    clientEmail,
  } = params;

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
      <Card className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Confirm Payment Project Scope
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review escrow deposit parameters before routing to secure checkout
          processing.
        </p>

        <div className="my-6 space-y-4 border-t border-b border-slate-100 py-4 text-sm">
          <div className="flex justify-between items-start gap-4">
            <span className="text-slate-400 font-medium">Position Title</span>
            <span className="text-slate-800 font-semibold text-right">
              {taskTitle || "Project Job Assignment"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">
              Assigned Contractor
            </span>
            <span className="text-slate-800 font-mono text-xs font-semibold">
              {freelancerEmail}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-dashed border-slate-100 items-baseline">
            <span className="text-slate-900 font-bold">Total Funding Cost</span>
            <span className="text-2xl font-black text-blue-600">
              ${Number(amount).toLocaleString()} USD
            </span>
          </div>
        </div>

        {/* Form routing variables out to the API handler handler */}
        <form action="/api/checkout_sessions" method="POST">
          <input type="hidden" name="proposal_id" value={proposalId} />
          <input type="hidden" name="task_id" value={taskId} />
          <input type="hidden" name="task_title" value={taskTitle} />
          <input type="hidden" name="amount" value={amount} />
          <input
            type="hidden"
            name="freelancer_email"
            value={freelancerEmail}
          />
          <input type="hidden" name="client_email" value={clientEmail} />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors text-sm shadow-sm"
          >
            Proceed to Secure Stripe Payment
          </button>
        </form>
      </Card>
    </div>
  );
}
