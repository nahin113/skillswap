"use client";

import React, { useState } from "react";
import { Card, Input, Button, TextArea } from "@heroui/react";
import { Calendar, CircleDollar, Briefcase, Envelope } from "@gravity-ui/icons";
import { postProposals } from "@/lib/actions/proposals";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function TaskDetailsClient({ task }) {
  const { data: session } = authClient.useSession();
  const userDetails = session?.user;
  const user = {
    email: userDetails?.email,
    role: userDetails?.accountType,
  };

  const isFreelancer = user && user.role === "freelancer";
  const taskIdString = task._id?.$oid ? task._id.$oid : task._id?.toString();

  // UX Interaction State Hooks
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    // Construct backend payload explicitly pairing fixed security properties
    const payload = {
      task_title : task.title,
      task_id: taskIdString,
      freelancer_email: user.email,
      proposed_budget: formValues.proposed_budget,
      estimated_days: formValues.estimated_days,
      cover_note: formValues.cover_note,
    };

    try {
      const res = await postProposals(payload);
      if (res.acknowledged) {
        toast.success("Proposal Sent successfully!");
        e.target.reset();
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
    redirect("/dashboard/freelancer/myProposals");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT PANEL: Task Profile Info Display Structure */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Category & Status Row */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4E654C] bg-[#4E654C]/10 px-3 py-1 rounded-full border border-[#4E654C]/20">
            {task.category || "General Requirement"}
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              task.status === "open"
                ? "text-blue-600 bg-blue-50 border-blue-200"
                : "text-zinc-500 bg-zinc-100 border-zinc-200"
            }`}
          >
            Status: {task.status || "open"}
          </span>
        </div>

        {/* Main Project Title */}
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1C1E1B] mt-2 leading-tight">
            {task.title}
          </h1>
        </div>

        {/* Technical Metadata Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-600 border-y border-[#E6DDD4] py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Envelope className="w-4 h-4 text-[#4E654C]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Client Contact
              </span>
            </div>
            <span className="text-[#1C1E1B] font-medium break-all text-sm">
              {task.client_email}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Calendar className="w-4 h-4 text-[#4E654C]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Submission Deadline
              </span>
            </div>
            <span className="text-[#1C1E1B] font-medium text-sm">
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No Limit"}
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2 pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                Posted On
              </span>
            </div>
            <span className="text-zinc-500 text-xs font-medium">
              {task.createdAt
                ? new Date(task.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Detailed Project Specifications Layout */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-[#1C1E1B] tracking-tight">
            Position Specifications
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line bg-white border border-[#E6DDD4] p-5 rounded-2xl shadow-sm">
            {task.description ||
              "No description details specified for this project listing profile."}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: Proposal Submission Section */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Baseline Budget Summary Widget Card */}
        <Card className="bg-white border border-[#E6DDD4] p-6 rounded-[24px] shadow-sm">
          <p className="text-zinc-400 text-xs uppercase font-bold tracking-wider">
            Client Baseline Budget Allocation
          </p>
          <div className="flex items-center gap-2 mt-1">
            <CircleDollar className="text-[#4E654C] w-6 h-6" />
            <span className="text-2xl font-black text-[#1C1E1B]">
              ${task.budget} USD
            </span>
          </div>
        </Card>

        {/* Freelancer Evaluation Guard Switch Row */}
        {isFreelancer ? (
          <Card className="bg-white border border-[#E6DDD4] p-6 rounded-[24px] shadow-sm">
            <h2 className="text-xl font-black tracking-tight text-[#1C1E1B] mb-1">
              Submit Your Proposal
            </h2>
            <p className="text-xs text-zinc-400 font-medium mb-6">
              Pitch your terms directly to the issuing client.
            </p>

            {message.text && (
              <div
                className={`p-4 rounded-xl text-xs font-medium mb-4 ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleProposalSubmit}>
              <fieldset
                disabled={loading}
                className="flex flex-col gap-6 border-none p-0 m-0"
              >
                {/* Task ID - Disabled */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="task_id"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                  >
                    Task ID
                  </label>
                  <input
                    id="task_id"
                    name="task_id"
                    value={taskIdString}
                    disabled
                    className="bg-[#F4EFEA] border border-[#E6DDD4] text-zinc-500 rounded-xl px-4 py-2.5 opacity-70 pointer-events-none w-full outline-none text-xs font-medium"
                  />
                </div>

                {/* Freelancer Email - Disabled */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="freelancer_email"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                  >
                    Freelancer Email
                  </label>
                  <input
                    id="freelancer_email"
                    name="freelancer_email"
                    value={user.email}
                    disabled
                    className="bg-[#F4EFEA] border border-[#E6DDD4] text-zinc-500 rounded-xl px-4 py-2.5 opacity-70 pointer-events-none w-full outline-none text-xs font-medium"
                  />
                </div>

                {/* Budget and Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="proposed_budget"
                      className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                    >
                      Proposed Budget (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">
                        $
                      </span>
                      <input
                        id="proposed_budget"
                        name="proposed_budget"
                        type="number"
                        defaultValue="e.g. 500"
                        required
                        className="bg-white border border-[#E6DDD4] focus:border-[#4E654C] text-[#1C1E1B] font-medium rounded-xl pl-8 pr-4 py-2.5 w-full outline-none transition-colors shadow-sm text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="estimated_days"
                      className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                    >
                      Estimated Timeline (Days)
                    </label>
                    <input
                      id="estimated_days"
                      name="estimated_days"
                      type="number"
                      defaultValue="e.g. 7"
                      required
                      className="bg-white border border-[#E6DDD4] focus:border-[#4E654C] text-[#1C1E1B] font-medium rounded-xl px-4 py-2.5 w-full outline-none transition-colors shadow-sm text-sm"
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="cover_note"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                  >
                    Cover Letter
                  </label>
                  <textarea
                    id="cover_note"
                    name="cover_note"
                    placeholder="Introduce yourself, highlight your relevant experience, and briefly explain your approach..."
                    required
                    rows={5}
                    className="bg-white border border-[#E6DDD4] focus:border-[#4E654C] text-[#1C1E1B] font-medium rounded-xl px-4 py-3 w-full outline-none transition-colors resize-y shadow-sm text-sm"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full font-bold mt-2 bg-[#1C1E1B] hover:bg-zinc-800 text-[#F4EFEA] rounded-xl py-6 transition-all shadow-sm"
                >
                  {loading ? "Submitting..." : "Submit Proposal"}
                </Button>
              </fieldset>
            </form>
          </Card>
        ) : (
          /* Locked State Placeholder Box */
          <div className="bg-white border border-dashed border-[#E6DDD4] p-6 rounded-[24px] text-center shadow-sm">
            <Briefcase className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
            <h4 className="text-sm font-black text-[#1C1E1B]">
              Proposal Submission Locked
            </h4>
            <p className="text-xs text-zinc-400 max-w-[280px] mx-auto mt-1 font-medium leading-relaxed">
              Only profiles registered under a **Freelancer role identity** can
              submit active proposal parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
