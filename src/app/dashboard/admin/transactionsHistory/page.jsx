import React from "react";
import TransactionsClient from "./TransactionsClient";
import { getPayments } from "@/lib/api/payments";

export const dynamic = "force-dynamic";

export default async function TransactionsHistoryPage() {
  let payments = [];
  let errorMsg = null;

  try {
    const responseData = await getPayments();
    payments = Array.isArray(responseData)
      ? responseData
      : responseData?.payments || [];
  } catch (err) {
    console.error("Error loading historical payment records ledger:", err);
    errorMsg = "Failed to synchronize global ledger transaction pipelines.";
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 md:p-10 text-slate-800">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Transactions History
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Audit and inspect system-wide financial movements, Stripe session
          collections, and escrow payouts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {errorMsg ? (
          <div className="p-4 rounded-xl text-sm font-medium bg-rose-50 text-rose-600 border border-rose-200">
            {errorMsg}
          </div>
        ) : (
          <TransactionsClient initialPayments={payments} />
        )}
      </div>
    </div>
  );
}
