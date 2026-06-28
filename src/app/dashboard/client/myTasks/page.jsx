"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Chip } from "@heroui/react";
import { Edit3, Trash2, Calendar, DollarSign } from "lucide-react";
import { getTasksByemail } from "@/lib/api/tasks";
import EditTaskModal from "@/components/Clients/EditTaskModal";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEditTask, setSelectedEditTask] = useState(null);

  // 🔌 Fetch real data from your Express backend on component mount
  useEffect(() => {
    const fetchMyTasks = async () => {
      setLoading(true);
      try {
        // ✅ Your fetching logic goes right here
        const data = await getTasksByemail();
        setTasks(data || []);
      } catch (error) {
        console.error("Failed to load backend tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, []);

  const handleEditIntentInit = (task) => {
    setSelectedEditTask(task);
    setIsEditOpen(true);
  };

  const handleEditSaveSuccess = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) =>
        (t.id || t._id) === (updatedTask.id || updatedTask._id)
          ? updatedTask
          : t
      )
    );
  };

  const handleDeleteClick = async (taskId) => {
    if (!confirm("Are you sure you want to permanently remove this job block?"))
      return;
    try {
      // await serverMutation(`/api/tasks/${taskId}`, {}, "DELETE");
      setTasks((prev) => prev.filter((t) => (t.id || t._id) !== taskId));
    } catch (error) {
      console.error("Delete sequence failure:", error);
    }
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "open":
        return "success";
      case "in-progress":
        return "warning";
      case "completed":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      <div className="border-b border-[#E6DDD4] pb-4">
        <h1 className="text-xl font-black text-[#1C1E1B]">My Posted Tasks</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Monitor your active project streams, modify open manifests, or drop
          unassigned registry rows.
        </p>
      </div>

      <Table
        aria-label="Client Personal Posted Task Stream Management Deck"
        className="bg-white rounded-2xl border border-[#E6DDD4] shadow-sm p-2"
      >
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column
                isRowHeader
                className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4"
              >
                Project Parameters
              </Table.Column>
              <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                Budget
              </Table.Column>
              <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                Deadline
              </Table.Column>
              <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                Status
              </Table.Column>
              <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4 text-center">
                Actions Available
              </Table.Column>
            </Table.Header>

            <Table.Body loadingState={loading ? "loading" : "idle"}>
              {tasks.map((task) => {
                // Handle both normalized 'id' or raw Mongo '_id' property fields safely
                const rowId = task.id || task._id;
                const isEditable = task.status === "open";
                const isDeletable =
                  task.proposalsCount === 0 || !task.proposalsCount;

                return (
                  <Table.Row
                    key={String(rowId)}
                    className="border-b border-[#E6DDD4]/40 hover:bg-[#F4EFEA]/20 transition-colors"
                  >
                    <Table.Cell className="px-6 py-4">
                      <div className="space-y-1">
                        <span className="font-bold text-sm text-[#1C1E1B] block">
                          {task.title}
                        </span>
                        <span className="text-xs text-zinc-400 font-medium capitalize bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md inline-block">
                          {task.category}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="px-6 py-4">
                      <span className="text-sm font-black text-[#1C1E1B] flex items-center gap-0.5">
                        <DollarSign className="w-3.5 h-3.5 text-[#4E654C]" />{" "}
                        {task.budget}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-6 py-4">
                      <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />{" "}
                        {task.deadline}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-6 py-4">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={getStatusChipColor(task.status)}
                        className="font-bold uppercase tracking-wider text-[10px] px-1.5"
                      >
                        {task.status || "open"}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* 🔒 Show edit icon button ONLY if task status is open */}
                        {task.status === "open" ? (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => handleEditIntentInit(task)}
                            className="rounded-xl text-zinc-600 hover:bg-[#F4EFEA] hover:text-[#4E654C]"
                            title="Edit Open Task Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        ) : (
                          <div
                            className="w-8 h-8 flex items-center justify-center text-zinc-200 select-none cursor-not-allowed"
                            title="Edits locked for active tasks"
                          >
                            <Edit3 className="w-4 h-4 opacity-20" />
                          </div>
                        )}

                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          disabled={!isDeletable}
                          onPress={() => handleDeleteClick(rowId)}
                          className={`rounded-xl ${
                            isDeletable
                              ? "text-zinc-600 hover:bg-red-50 hover:text-red-600"
                              : "text-zinc-200 cursor-not-allowed"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* Mounted Overlay Edit Portal Modal */}
      <EditTaskModal
        task={selectedEditTask}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedEditTask(null);
        }}
        onSaveSuccess={handleEditSaveSuccess}
      />
    </div>
  );
}
