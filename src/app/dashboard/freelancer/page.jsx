import React from "react";
import { getUserSession } from "@/lib/core/session";
import FreelancerOverviewClient from "@/components/Freelancers/FreelancerOverviewClient";
import { getFreelancerDashboardStats } from "@/lib/api/users";

export const dynamic = "force-dynamic";

export default async function FreelancerDashboardPage() {
  const user = await getUserSession();

  let stats = {
    totalProposals: 0,
    pendingProposals: 0,
    acceptedProposals: 0,
    totalEarnings: 0,
  };

  if (user?.email) {
    try {
      const data = await getFreelancerDashboardStats(user?.email);
      if (data && !data.error) {
        stats = data;
      }
    } catch (err) {
      console.error("Failed to fetch primary freelancer data streams:", err);
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-6">
      {/* Dynamic Welcome Heading */}
      <div>
        <h1 className="text-xl font-black text-[#1C1E1B]">
          Welcome Back, {user?.name || "Freelancer"}
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Here is your live operations summary, current outstanding proposals,
          and total earnings layout.
        </p>
      </div>

      <FreelancerOverviewClient stats={stats} />
    </div>
  );
}
