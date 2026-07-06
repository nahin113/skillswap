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
    <div className="w-full min-h-screen bg-[#F1EFEB] p-6 md:p-12 text-zinc-950 antialiased">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 pb-8 border-b border-zinc-200">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
          My Proposals
        </h1>
        <p className="text-zinc-500 mt-2 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
          Monitor, track, and audit the real-time status evaluations of your
          submitted project bids.
        </p>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto">
        {errorMsg ? (
          <div className="flex items-center gap-3 p-4 rounded-xl text-sm font-semibold bg-red-50 text-red-700 border border-red-200/60 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {errorMsg}
          </div>
        ) : (
          /* Clean and direct injection - the new MyProposalsClient card handles its own white container */
          <MyProposalsClient initialProposals={proposals} />
        )}
      </div>
    </div>
  );
}
