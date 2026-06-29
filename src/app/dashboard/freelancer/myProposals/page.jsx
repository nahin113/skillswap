import React from "react";
import MyProposalsClient from "./MyProposalsClient";
import { getProposalByEmail } from "@/lib/api/proposals";

export const dynamic = "force-dynamic";

export default async function MyProposalsPage() {
  let proposals = [];
  let errorMsg = null;

  try {
    const responseData = await getProposalByEmail();
    // Normalize array structures to handle both raw lists and object payloads safely
    proposals = Array.isArray(responseData)
      ? responseData
      : responseData?.proposals || [];
  } catch (err) {
    console.error("Error loading freelancer proposals:", err);
    errorMsg = "Failed to synchronize your proposal portfolio applications.";
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-black tracking-tight">My Proposals</h1>
        <p className="text-zinc-400 mt-2 text-sm">
          Monitor, track, and audit the real-time status evaluations of your
          submitted project bids.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {errorMsg ? (
          <div className="p-4 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20">
            {errorMsg}
          </div>
        ) : (
          <MyProposalsClient initialProposals={proposals} />
        )}
      </div>
    </div>
  );
}
