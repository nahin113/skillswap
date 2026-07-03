"use client";

import React, { useState } from "react";
import { Table, Button, Chip } from "@heroui/react";
import { CheckCircle2, ExternalLink, Globe, FileUp, Zap } from "lucide-react";
import { toast } from "react-toastify";
import { updateTasks } from "@/lib/actions/tasks";

export default function ActiveProjectsClient({ activeList, completedList }) {
  const [activeProjects, setActiveProjects] = useState(activeList);
  const [completedProjects, setCompletedProjects] = useState(completedList);

  // Submission Modal state trackers
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenSubmission = (project) => {
    setSelectedProject(project);
    setIsSubmitOpen(true);
  };

  const handleDeliveryPipeline = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const deliverableUrl = formData.get("deliverable_url")?.trim();

    if (!deliverableUrl) {
      toast.error("Please provide a valid deliverable reference link.");
      setSubmitting(false);
      return;
    }

    const projectId = selectedProject._id || selectedProject.id;

    try {
      // COMMENT FOR DEV:
      // This action hits your app.patch("/api/tasks/:id") endpoint.
      // Payload sent: { status: "completed", deliverable_url: "..." }
      const res = await updateTasks(projectId, {
        status: "completed",
        deliverable_url: deliverableUrl,
      });

      if(res.acknowledged) {
        toast.success("Submitted Successfully")
      }

      // Optimistically move record from active stream to completed dock
      const updatedProject = {
        ...selectedProject,
        status: "completed",
        deliverable_url: deliverableUrl,
        completed_at: new Date(),
      };

      setActiveProjects((prev) =>
        prev.filter((p) => (p._id || p.id) !== projectId)
      );
      setCompletedProjects((prev) => [updatedProject, ...prev]);

      setIsSubmitOpen(false);
      setSelectedProject(null);
    } catch (err) {
      console.error(err);
      toast.error(
        "Operational breakdown occurred during file delivery registry."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* 🚀 SECTION ONE: ACTIVE ASSIGNMENTS */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-[#1C1E1B] tracking-wider uppercase flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Active
          Operations ({activeProjects.length})
        </h2>

        <Table
          aria-label="Active ongoing assignments grid"
          className="bg-white rounded-2xl border border-[#E6DDD4] shadow-sm p-2"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4"
                >
                  Manifest Context
                </Table.Column>
                <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                  Client Contact
                </Table.Column>
                <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                  Budget Valuation
                </Table.Column>
                <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4 text-center">
                  Actions Available
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent="No ongoing active deployment tokens found.">
                {activeProjects.map((project) => (
                  <Table.Row
                    key={String(project._id || project.id)}
                    className="border-b border-[#E6DDD4]/40 hover:bg-[#F4EFEA]/20 transition-colors"
                  >
                    <Table.Cell className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-sm text-[#1C1E1B] block">
                          {project.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono tracking-tight block">
                          ID: {project._id || project.id}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-xs font-semibold text-zinc-600">
                      {project.client_email}
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-sm font-black text-[#4E654C]">
                      ${project.budget}
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-center">
                      <Button
                        size="sm"
                        onClick={() => handleOpenSubmission(project)}
                        className="bg-[#4E654C] hover:bg-[#3d503b] text-white font-bold text-xs rounded-xl shadow-sm px-4 py-2 flex items-center gap-1.5 mx-auto transition-colors"
                      >
                        <FileUp className="w-3.5 h-3.5" /> Submit Work
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* 🏁 SECTION TWO: COMPLETED ARCHIVE */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-[#1C1E1B] tracking-wider uppercase flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4E654C]" /> Finalized
          Deliveries ({completedProjects.length})
        </h2>

        <Table
          aria-label="Completed pipeline metrics history table"
          className="bg-white rounded-2xl border border-[#E6DDD4] shadow-sm p-2"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4"
                >
                  Completed Task Title
                </Table.Column>
                <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                  Compensation Status
                </Table.Column>
                <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                  Delivery Node Resource
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent="No archived deliveries registered to this profile configuration.">
                {completedProjects.map((project) => (
                  <Table.Row
                    key={String(project._id || project.id)}
                    className="border-b border-[#E6DDD4]/40 hover:bg-[#F4EFEA]/10 transition-colors"
                  >
                    <Table.Cell className="px-6 py-4 font-bold text-sm text-zinc-700">
                      {project.title}
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4">
                      <Chip
                        size="sm"
                        variant="flat"
                        color="success"
                        className="font-bold text-[10px] uppercase tracking-wider"
                      >
                        Paid & Cleared
                      </Chip>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4">
                      {project.deliverable_url ? (
                        <a
                          href={project.deliverable_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#4E654C] hover:text-[#1C1E1B] underline underline-offset-4 decoration-dotted transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" /> View Deliverable{" "}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-zinc-400 italic">
                          No access link documented
                        </span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* 🔮 DOCK FLOATING MODAL OVERLAY PORTAL FOR DELIVERABLE SUBMISSION */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white border border-[#E6DDD4] rounded-2xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-base font-black text-[#1C1E1B]">
                Transmit Operational Deliverable
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Provide a secure web resource link containing source nodes,
                assets, or document packages for{" "}
                <span className="text-[#1C1E1B] font-semibold">
                  "{selectedProject?.title}"
                </span>
                .
              </p>
            </div>

            <form onSubmit={handleDeliveryPipeline} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider block">
                  Production Build / Deployment Link
                </label>
                <input
                  name="deliverable_url"
                  type="url"
                  required
                  placeholder="https://github.com/... or https://docs.google.com/..."
                  className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E6DDD4]">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    setIsSubmitOpen(false);
                    setSelectedProject(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 bg-[#F4EFEA] border border-[#E6DDD4] rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#4E654C] hover:bg-[#3d503b] rounded-xl transition-all inline-flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Finalize Submission"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
