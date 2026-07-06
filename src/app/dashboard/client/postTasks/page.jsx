"use client";

import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { postTasks } from "@/lib/actions/tasks";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function PostTaskPage() {
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 📦 Automatically parse input fields into a clean object
    const formData = new FormData(e.currentTarget);
    const formFields = Object.fromEntries(formData);

    // 🗺️ Formulate the complete payload matching your precise database schema
    const taskPayload = {
      title: formFields.title,
      category: formFields.category,
      description: formFields.description,
      budget: Number(formFields.budget) || 0,
      deadline: formFields.deadline,

      // ✨ Injected Schema Requirements
      client_email: user?.email, // Replace with your session context email variable
      status: "open", // Enforced mandatory default state
    };

    try {
    

      const res = await postTasks(taskPayload);


      if (res.acknowledged) {
        e.target.reset();
        toast.success("Task posted successfully!");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
    redirect("/dashboard/client/myTasks");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="border-b border-[#E6DDD4] pb-4">
        <h1 className="text-xl font-black text-[#1C1E1B]">Post a New Task</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Publish a new job block on the website database marketplace registry.
        </p>
      </div>

      {/* Styled Theme Form */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-2xl border border-[#E6DDD4] shadow-sm p-6 space-y-5"
      >
        {/* Task Title */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
            Task Title
          </label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g., Build a Python Data Processing Script"
            className="w-full text-sm bg-zinc-50/50 border border-[#E6DDD4] rounded-xl px-4 py-3 text-[#1C1E1B] placeholder-zinc-400 focus:outline-none focus:border-[#4E654C] focus:bg-white transition-all font-medium"
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
            className="w-full text-sm bg-zinc-50/50 border border-[#E6DDD4] rounded-xl px-4 py-3 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white transition-all font-medium appearance-none"
          >
            <option value="Web Development">Web & Systems Development</option>
            <option value="Data Science">Data Science & Analytics</option>
            <option value="UI UX Design">UI / UX Product Design</option>
            <option value="Machine Learning">
              AI & Machine Learning Engineering
            </option>
          </select>
        </div>

        {/* Budget & Deadline Split Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Budget */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
              Budget (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                $
              </span>
              <input
                name="budget"
                type="number"
                min="1"
                required
                placeholder="250"
                className="w-full text-sm bg-zinc-50/50 border border-[#E6DDD4] rounded-xl pl-8 pr-4 py-3 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white transition-all font-bold"
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
              Deadline Date
            </label>
            <input
              name="deadline"
              type="date"
              required
              className="w-full text-sm bg-zinc-50/50 border border-[#E6DDD4] rounded-xl px-4 py-3 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white transition-all font-medium"
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
            rows={5}
            placeholder="Outline structural parameters, technology dependencies, and output deliverable conditions..."
            className="w-full text-sm bg-zinc-50/50 border border-[#E6DDD4] rounded-xl px-4 py-3 text-[#1C1E1B] placeholder-zinc-400 focus:outline-none focus:border-[#4E654C] focus:bg-white transition-all font-medium resize-none leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#4E654C] hover:bg-[#3d503b] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2 uppercase tracking-wider"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Publish Task</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
