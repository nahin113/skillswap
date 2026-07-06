import { getAllTasks } from "@/lib/api/tasks";
import React from "react";
import ManageTasksClient from "./ManageTasksClient";

export const dynamic = "force-dynamic";

export default async function ManageTasksPage() {
  let tasks = [];
  let errorMsg = null;

  try {
    const data = await getAllTasks();
    
    tasks = Array.isArray(data) ? data : data?.tasks || [];
    
  } catch (err) {
    console.error("Error reading platform task records:", err);
    errorMsg =
      "Failed to synchronize operational task listings database pipelines.";
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 md:p-10 text-slate-800">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Manage Tasks
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Audit system-wide job listings, track live operational statuses, and
          remove policy-violating records.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {errorMsg ? (
          <div className="p-4 rounded-xl text-sm font-medium bg-rose-50 text-rose-600 border border-rose-200">
            {errorMsg}
          </div>
        ) : (
          <ManageTasksClient initialTasks={tasks} />
        )}
      </div>
    </div>
  );
}
