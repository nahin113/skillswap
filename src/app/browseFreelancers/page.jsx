import FreelancerCard from "@/components/Freelancers/FreelancerCard";
import { getFreelancersList } from "@/lib/api/freelancers";
import React from "react";

export default async function FreelancersPage() {
  const data = await getFreelancersList();

  return (
    <div className="min-h-screen bg-[#F4EFEA] p-6 sm:p-10 text-[#1C1E1B]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Dynamic Headings Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DDD4] pb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#1C1E1B]">
              Freelance Experts
            </h1>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1.5">
              Explore available talent in the SkillSwap workspace
            </p>
          </div>

          <div className="bg-white border border-[#E6DDD4] px-5 py-2.5 rounded-2xl text-xs font-bold text-zinc-500 self-start sm:self-auto shadow-sm">
            Available Profiles:{" "}
            <span className="text-[#1C1E1B] font-black pl-1">
              {data.length}
            </span>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        {data.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#E6DDD4] rounded-[2.5rem] shadow-sm">
            <p className="text-sm text-zinc-400">
              No active freelancers found in the directory database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {data.map((freelancer) => (
              <FreelancerCard key={freelancer._id} freelancer={freelancer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
