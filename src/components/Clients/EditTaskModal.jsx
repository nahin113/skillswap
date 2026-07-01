"use client";

import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { updateTasks } from "@/lib/actions/tasks";

export default function EditTaskModal({
  task,
  isOpen,
  onClose,
  onSaveSuccess,
}) {
  const [updating, setUpdating] = useState(false);
  if (!isOpen || !task) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData(e.currentTarget);
    const updatedFields = Object.fromEntries(formData);

    // Format numeric budget type correctly
    if (updatedFields.budget) {
      updatedFields.budget = Number(updatedFields.budget);
    }

    try {
      const updatedPayload = {
        ...task,
        ...updatedFields,
      };

      console.log("Sending Modified Object Payload:", updatedPayload);

      const res = await updateTasks(task._id, updatedPayload);
      onSaveSuccess(updatedPayload);
      onClose();
    } catch (error) {
      console.error(
        "Failed to execute data modification pipeline update:",
        error
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border border-[#E6DDD4] rounded-2xl shadow-2xl p-6 space-y-5 relative">
        {/* Header with Close Anchor */}
        <div className="flex items-center justify-between border-b border-[#E6DDD4] pb-3">
          <div>
            <h3 className="text-base font-black text-[#1C1E1B]">
              Modify Task Manifest
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Update configuration fields for your open project slot.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Form Body Structure */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
              Task Title
            </label>
            <input
              name="title"
              type="text"
              required
              defaultValue={task.title}
              className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-medium"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
              Category
            </label>
            <select
              name="category"
              required
              defaultValue={task.category}
              className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-medium"
            >
              <option value="Web Development">Web & Systems Development</option>
              <option value="Data Science">Data Science & Analytics</option>
              <option value="UI UX Design">UI / UX Product Design</option>
              <option value="Machine Learning">
                AI & Machine Learning Engineering
              </option>
            </select>
          </div>

          {/* Budget & Deadline Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
                Budget (USD)
              </label>
              <input
                name="budget"
                type="number"
                min="1"
                required
                defaultValue={task.budget}
                className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
                Deadline Date
              </label>
              <input
                name="deadline"
                type="date"
                required
                defaultValue={task.deadline}
                className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-medium"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={task.description}
              className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-medium resize-none leading-relaxed"
            />
          </div>

          {/* Actions Footer Container */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E6DDD4]">
            <button
              type="button"
              disabled={updating}
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 bg-zinc-100 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-4 py-2 text-xs font-bold text-white bg-[#4E654C] hover:bg-[#3d503b] rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {updating ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Updates</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
