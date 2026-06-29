"use client";

import React from "react";
import { Card, Link } from "@heroui/react";
import { MapPin, Calendar, CircleDollar, ArrowRight } from "@gravity-ui/icons";

export default function TaskCard({ task }) {
  // Guard clause in case the prop isn't passed or is loading
  if (!task) return null;

  // 🔒 FIX: Safely parse MongoDB BSON ObjectIDs, Hydrated Strings, or Meta $oids explicitly
  const taskId =
    task.id || (task._id?.$oid ? task._id.$oid : task._id?.toString());

  // Render a fallback string if client data payload attributes are empty
  const clientName = task.client_email || "Platform Client";

  return (
    <Card className="p-6 w-full max-w-[440px] border-none bg-zinc-900 text-zinc-100 rounded-[32px] shadow-2xl hover:scale-[1.01] transition-transform duration-200">
      {/* Card Header: Client Info & Task Title */}
      <Card.Header className="flex flex-col items-start gap-3 p-0 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#4E654C]/20 border border-[#4E654C]/40 flex items-center justify-center text-[10px] text-emerald-400 font-bold uppercase">
            {clientName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-zinc-400">
            {clientName}
          </span>
        </div>

        <Card.Title className="text-2xl font-black tracking-tight text-white leading-tight line-clamp-2">
          {task.title}
        </Card.Title>
      </Card.Header>

      {/* Card Content: Field Attributes & Meta Descriptors */}
      <Card.Content className="flex flex-col gap-4 p-0 py-3">
        {/* Short Text snippet summary field */}
        {task.description && (
          <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Dynamic Badge Tag Layout Group */}
        <div className="flex flex-wrap gap-2 pt-2">
          {/* Category Tag */}
          <div className="flex items-center gap-1.5 bg-zinc-800/60 px-3 py-1.5 rounded-full border border-zinc-800">
            <span className="text-xs font-bold text-zinc-300 capitalize">
              {task.category || "General Work"}
            </span>
          </div>

          {/* Budget Tag */}
          <div className="flex items-center gap-1.5 bg-[#4E654C]/10 px-3 py-1.5 rounded-full border border-[#4E654C]/30 w-fit">
            <CircleDollar className="text-emerald-400 w-3.5 h-3.5" />
            <span className="text-xs font-black text-emerald-400">
              ${task.budget} USD
            </span>
          </div>

          {/* Deadline Tag */}
          <div className="flex items-center gap-1.5 bg-zinc-800/60 px-3 py-1.5 rounded-full border border-zinc-800">
            <Calendar className="text-zinc-400 w-3.5 h-3.5" />
            <span className="text-xs font-medium text-zinc-300">
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString()
                : "No Deadline"}
            </span>
          </div>
        </div>
      </Card.Content>

      {/* Card Footer: Detailed Route Click Redirection Link */}
      <Card.Footer className="p-0 pt-4 border-t border-zinc-800/60 mt-2">
        <Link
          href={`/tasks/${taskId}`}
          className="group flex justify-start items-center gap-2 bg-transparent hover:bg-zinc-800/40 p-0 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200"
          variant="light"
          disableRipple
        >
          View Details
          <ArrowRight className="group-hover:translate-x-1 text-zinc-400 group-hover:text-white w-4 h-4 transition-transform duration-200" />
        </Link>
      </Card.Footer>
    </Card>
  );
}
