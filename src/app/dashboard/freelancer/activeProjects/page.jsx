import ActiveProjectsClient from "@/components/Freelancers/ActiveProjectsClient";
import { getTasksByFreelancerEmail } from "@/lib/api/freelancers";
import { getUserSession } from "@/lib/core/session";

export const dynamic = "force-dynamic";

export default async function ActiveProjectsPage() {
  let projects = [];

  try {
    const user = await getUserSession();
    const fetchedData = await getTasksByFreelancerEmail(user?.email);
    projects = Array.isArray(fetchedData)
      ? fetchedData
      : fetchedData?.tasks || [];
    
  } catch (error) {
    console.error("Failed to compile project ledger streams:", error);
  }

  // Filter into discrete active vs completed work pools
  const activeProjects = projects.filter(
    (p) =>
      p.status?.toLowerCase() === "in-progress" ||
      p.status?.toLowerCase() === "in progress"
  );

  const completedProjects = projects.filter(
    (p) => p.status?.toLowerCase() === "completed"
  );
  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <div className="border-b border-[#E6DDD4] pb-4">
        <h1 className="text-xl font-black text-[#1C1E1B]">
          Project Workspace Delivery
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Track continuous contracts, submit structural build deliverables, and
          view completed historical milestones.
        </p>
      </div>

      <ActiveProjectsClient
        activeList={activeProjects}
        completedList={completedProjects}
      />
    </div>
  );
}
