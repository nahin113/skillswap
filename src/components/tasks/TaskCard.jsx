"use client";

import React from "react";
import { Card, Link } from "@heroui/react";
import { Calendar, CircleDollar, ArrowRight } from "@gravity-ui/icons";

export default function TaskCard({ task }) {
  // Guard clause in case the prop isn't passed or is loading
  if (!task) return null;

  // 🔒 Safely parse MongoDB BSON ObjectIDs, Hydrated Strings, or Meta $oids explicitly
  const taskId =
    task.id || (task._id?.$oid ? task._id.$oid : task._id?.toString());

  // Render a fallback string if client data payload attributes are empty
  const clientName = task.client_email || "Platform Client";

  const statusConfig = {
    "open": {
      bg: "bg-[#14A800]", // Brand Vibrant Green
      text: "text-white",
      label: "Open",
    },
    "In Progress": {
      bg: "bg-amber-500", // Smooth Pending Warning Amber
      text: "text-white",
      label: "In Progress",
    },
    "completed": {
      bg: "bg-[#1C1E1B]", // Premium Deep Charcoal Tone
      text: "text-[#F4EFEA]",
      label: "Completed",
    },
  };

  // Resolve current task status layout styles seamlessly
  const currentStatus = statusConfig[task.status] || statusConfig.open;

  return (
    <Card className="group relative w-full border border-[#E6DDD4] bg-white text-[#1C1E1B] rounded-[24px] p-7 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[360px]">
      <div>
        {/* --- Card Top Header Block --- */}
        <div className="flex flex-col gap-2.5 items-start">
          <h3 className="text-2xl font-black tracking-tight text-[#1C1E1B] leading-tight line-clamp-2 group-hover:text-[#14A800] transition-colors duration-200">
            {task.title}
          </h3>

          <div className="flex items-center gap-3">
            {/* Context-aware Application Status Pill */}
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${currentStatus.bg} ${currentStatus.text}`}
            >
              {currentStatus.label}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              Posted by {clientName}
            </span>
          </div>
        </div>

        {/* --- Two-Column High-Contrast Metadata Grid --- */}
        <div className="grid grid-cols-2 gap-4 my-6 py-4 border-y border-[#E6DDD4]/50">
          {/* Budget Block */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F4EFEA] rounded-xl shrink-0">
              <CircleDollar className="text-[#1C1E1B] w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-black text-[#1C1E1B]">
                ${task.budget} USD
              </div>
              <div className="text-xs text-zinc-500">Fixed Budget</div>
            </div>
          </div>

          {/* Timeline Block */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F4EFEA] rounded-xl shrink-0">
              <Calendar className="text-zinc-500 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#1C1E1B] line-clamp-1">
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : "No Deadline"}
              </div>
              <div className="text-xs text-zinc-500">Target Timeline</div>
            </div>
          </div>
        </div>

        {/* --- Main Snippet Description Paragraph --- */}
        {task.description && (
          <p className="text-sm text-zinc-600 line-clamp-3 leading-relaxed mb-6">
            {task.description}
          </p>
        )}

        {/* --- Bottom Attribute Category Pill --- */}
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-1.5 bg-[#F4EFEA]/60 px-3 py-1.5 rounded-full border border-[#E6DDD4]/80 text-xs font-bold text-zinc-600 capitalize">
            {task.category || "General Work"}
          </div>
        </div>
      </div>

      {/* --- Smooth Animated Reveal Action Link Area --- */}
      <div className="h-12 relative mt-4 flex items-center">
        <div className="absolute inset-x-0 bottom-0 xl:opacity-0 translate-y-3 xl:pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.25,1,0.35,1)]">
          <Link
            href={`/tasks/${taskId}`}
            className="w-full sm:w-fit inline-flex items-center justify-center gap-2 bg-[#14A800] hover:bg-[#118F00] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
