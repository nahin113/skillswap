"use client";

import React, { useState } from "react";
import { Button, toast } from "@heroui/react";
import { deleteTaskById } from "@/lib/actions/tasks";


export default function ManageTasksClient({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null); // Stores target task object
  const [isDeleting, setIsDeleting] = useState(false);

  // Trigger modal open sequence instead of browser default popup
  const openDeleteModal = (task) => {
    setPendingDelete(task);
    setIsConfirmOpen(true);
  };

  const closeDeleteModal = () => {
    setIsConfirmOpen(false);
    setPendingDelete(null);
  };

  // Execution flow after clicking Confirm inside the modal
  const confirmDelete = async () => {
    if (!pendingDelete) return;

    setIsDeleting(true);
    const taskId = pendingDelete._id?.toString() || pendingDelete.id;

    try {
      const result = await deleteTaskById(taskId);

      if (result.deletedCount > 0) {
        toast.success("Task Deleted Successfully")
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
        closeDeleteModal();
      } else {
        throw new Error("Target document record was not located or removed.");
      }
    } catch (err) {
      alert(
        err.message ||
          "An operational failure occurred while deleting the task."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden relative">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">Task Information</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Budget</th>
              <th className="py-4 px-6">Client Email</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {tasks.length > 0 ? (
              tasks.map((task) => {
                const taskId = task._id?.toString() || task.id;
                const statusLower = task.status?.toLowerCase() || "open";

                return (
                  <tr
                    key={taskId}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 max-w-xs">
                      <div
                        className="font-semibold text-slate-900 truncate"
                        title={task.title}
                      >
                        {task.title}
                      </div>
                      <div
                        className="text-xs text-slate-400 truncate mt-0.5"
                        title={task.description}
                      >
                        {task.description || "No descriptions attached."}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium border border-slate-200/60">
                        {task.category || "General"}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-semibold text-slate-900">
                      ${Number(task.budget || 0).toLocaleString()} USD
                    </td>

                    <td className="py-4 px-6 text-slate-500 font-mono text-xs">
                      {task.client_email || "N/A"}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          statusLower === "open"
                            ? "text-blue-700 bg-blue-50 border-blue-200"
                            : statusLower === "in progress" ||
                              statusLower === "accepted"
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                            : "text-slate-600 bg-slate-100 border-slate-300"
                        }`}
                      >
                        {task.status || "open"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        onClick={() => openDeleteModal(task)}
                        className="font-medium text-xs rounded-lg"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-16 text-center text-slate-400">
                  No active task profiles deployed to the platform indexes
                  currently.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* LIGHT THEMED RE-STYLED CONFIRMATION MODAL OVERLAY */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                Confirm Task Deletion
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to completely remove{" "}
                <span className="text-slate-900 font-semibold italic">
                  "{pendingDelete?.title}"
                </span>{" "}
                posted by{" "}
                <span className="text-slate-700 font-mono text-[11px] font-medium">
                  {pendingDelete?.client_email}
                </span>
                ? This completely cleanses the task record and terminates
                matching applications immediately.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 text-xs font-semibold">
              <button
                disabled={isDeleting}
                onClick={closeDeleteModal}
                className="px-4 py-2 text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm disabled:opacity-50 min-w-[76px] flex items-center justify-center"
              >
                {isDeleting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Delete Task"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
