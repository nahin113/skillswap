import React from "react";
import TaskDetailsClient from "./TaskDetailsClient";
import { getTaskById } from "@/lib/api/tasks";

export const dynamic = "force-dynamic";

export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) {
    return (
      <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center text-[#1C1E1B]">
        <div className="text-center bg-white border border-[#E6DDD4] rounded-[2rem] p-8 max-w-sm mx-auto shadow-sm">
          <p className="text-zinc-500 text-sm font-medium">
            Task not found or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#1C1E1B] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <TaskDetailsClient task={task} />
      </div>
    </div>
  );
}
