import React from "react";
import TaskDetailsClient from "./TaskDetailsClient";
import { getTaskById } from "@/lib/api/tasks";

export const dynamic = "force-dynamic";


export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
  const task = await getTaskById(id);
  console.log(task)

  if (!task) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <p className="text-zinc-500 text-lg">
          Task not found or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <TaskDetailsClient task={task} />
      </div>
    </div>
  );
}
