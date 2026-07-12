"use client";

import React, { useEffect, useState } from "react";
import { getTaskByCategory } from "@/lib/api/tasks";
import TaskCard from "./TaskCard";

export default function TaskSuggestion({ task }) {
  const [similarTasks, setSimilarTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Safely grab the current task's unique ID for filtering out duplicates
  const currentTaskId = task?.id || task?._id?.toString();

  useEffect(() => {
    async function loadSuggestions() {
      // Guard clause to ensure task data exists before triggering API
      if (!task || !task.category) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fix 1: Read category directly from the 'task' prop
        const encodedCategory = encodeURIComponent(task.category);

        // Call your custom dataFetch wrapper utility
        const suggestionsData = await getTaskByCategory(encodedCategory);

        // Fix 2: Dynamically filter using your safely parsed currentTaskId
        const filteredTasks = Array.isArray(suggestionsData)
          ? suggestionsData.filter(
              (item) => (item.id || item._id?.toString()) !== currentTaskId
            )
          : [];

        // Pull the top 3 matches
        setSimilarTasks(filteredTasks.slice(0, 3));
      } catch (error) {
        console.error("Error loading task suggestions matrix:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSuggestions();
  }, [task, currentTaskId]); // Fix 3: Updated dependency array to track the task prop changes

  if (loading)
    return (
      <div className="text-sm py-6 text-zinc-500 text-center">
        Loading similar projects...
      </div>
    );
  if (!task) return null;

  return (
    <div className="w-full bg-[#F4EFEA] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* --- SIMILAR TASKS SUGGESTION MODULE --- */}
        {similarTasks.length > 0 ? (
          <div className="pt-12 border-t border-[#E6DDD4]">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-[#1C1E1B] tracking-tight">
                Explore similar jobs on{" "}
                <span className="text-[#14A800]">SkillSwap</span>
              </h3>
              <p className="text-sm text-[#5A5E5A] mt-1">
                Explore alternative open listings matching the{" "}
                <span className="font-semibold text-zinc-700">
                  "{task.category}"
                </span>{" "}
                domain.
              </p>
            </div>

            {/* Render Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarTasks.map((similarTask) => (
                <TaskCard
                  key={similarTask.id || similarTask._id?.toString()}
                  task={similarTask}
                  clientName={similarTask.client_email || "Platform Client"}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-12 border-t border-[#E6DDD4] text-center">
            <p className="text-sm text-zinc-400 font-medium">
              No other open tasks found in this category right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
