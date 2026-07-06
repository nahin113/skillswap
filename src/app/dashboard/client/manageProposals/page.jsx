import React from "react";
import { getTasksByemail } from "@/lib/api/tasks";
import { getProposalByTaskId } from "@/lib/api/proposals";
import ManageProposalsClient from "./ManageProposalsClient";

export const dynamic = "force-dynamic";

async function getClientReceivedProposals() {
  try {
    // 1. Fetch all jobs posted by the logged-in client
    const myTasks = await getTasksByemail();
    if (!myTasks || myTasks.length === 0) return [];

    // 2. Use Promise.all to cleanly resolve all async fetch requests in parallel
    const proposalsNestedArrays = await Promise.all(
      myTasks.map(async (task) => {
        const taskIdString = task._id?.toString() || task._id;

        // Fetch proposals for this specific task
        const proposals = await getProposalByTaskId(taskIdString);
   

        // Inject the task title and current status directly into each proposal object
        // so your frontend table component can easily display it!
        if (Array.isArray(proposals)) {
          return proposals.map((proposal) => ({
            ...proposal,
            task_title: task.title,
            task_status: task.status,
            client_email: task.client_email,
          }));
        }
        return [];
      })
    );

    // 3. Flatten the array of arrays into a single clean list of proposals
    const receivedProposals = proposalsNestedArrays.flat();
    return receivedProposals;
  } catch (error) {
    console.error("Error aggregating client proposals:", error);
    return [];
  }
}
export default async function ManageProposalsPage() {
  const proposals = await getClientReceivedProposals();

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 md:p-10 text-slate-800">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Manage Proposals
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Review contractor pitches, assess completion timelines, and securely
          fund project scopes.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <ManageProposalsClient initialProposals={proposals} />
      </div>
    </div>
  );
}
