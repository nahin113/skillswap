import React from "react";
import { getUserSession } from "@/lib/core/session";
import { getEarnings } from "@/lib/api/freelancers";
import EarningsClientTable from "@/components/Clients/EarningsClientTable";

export const dynamic = "force-dynamic";

export default async function MyEarningsPage() {
  const user = await getUserSession();
  let earningsLedger = [];

  if (user?.email) {
    try {
      earningsLedger = await getEarnings(user?.email)
    } catch (err) {
      console.error("Error collecting payments history stream:", err);
    }
  }

  // Calculate gross total summation metrics
  const aggregateTotal = earningsLedger.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DDD4] pb-4">
        <div>
          <h1 className="text-xl font-black text-[#1C1E1B]">Earnings Ledger</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Review detailed financial records of your finalized workspace
            contract distributions.
          </p>
        </div>

        {/* Gross Earnings Banner Metric Card */}
        <div className="bg-[#F4EFEA] border border-[#E6DDD4] px-5 py-3 rounded-xl min-w-[200px]">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            Net Revenue Made
          </span>
          <span className="text-2xl font-black text-[#4E654C] font-mono">
            ${aggregateTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <EarningsClientTable ledger={earningsLedger} />
    </div>
  );
}
