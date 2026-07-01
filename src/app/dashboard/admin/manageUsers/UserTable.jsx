"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Table, Button} from "@heroui/react";
import { Mail, ShieldAlert, ShieldCheck } from "lucide-react";
import { updateUserStatus } from "@/lib/actions/users";
import { toast } from "react-toastify";

export default function UserTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);

  // 🔘 Modal & Loading States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);

  // Intercepts the click, saves target data, and launches confirmation modal overlay
  const initiateBanToggleRequest = (userId, userName, targetBanStatus) => {
    setPendingChange({
      userId,
      userName,
      targetBanStatus,
    });
    setIsConfirmOpen(true);
  };

  // Triggered when user commits 'Confirm' inside the portal layer
  const confirmUserStatusUpdate = async () => {
    if (!pendingChange) return;

    const { userId, targetBanStatus } = pendingChange;
    setIsUpdating(true);

    try {
      await updateUserStatus(userId, targetBanStatus);

      setUsers((prev) =>
        prev.map((u) => {
          const currentId = u._id || u.id;
          return currentId === userId ? { ...u, banned: targetBanStatus } : u;
        })
      );

      toast.success("User configuration status modified successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status");
    } finally {
      setIsUpdating(false);
      setIsConfirmOpen(false);
      setPendingChange(null);
    }
  };

  return (
    <>
      <Table
        aria-label="User Management Table"
        className="bg-white rounded-2xl border border-[#E6DDD4] shadow-sm p-2"
      >
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column
                isRowHeader
                className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4"
              >
                User
              </Table.Column>
              <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                Role
              </Table.Column>
              <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
                Status
              </Table.Column>
              <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4 text-right">
                Action
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {users.map((user) => {
                const rowId = user.id || user._id;

                return (
                  <Table.Row
                    key={String(rowId)}
                    className="border-b border-[#E6DDD4]/40 hover:bg-[#F4EFEA]/20 transition-colors"
                  >
                    <Table.Cell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/60 flex-shrink-0">
                          <Image
                            src={
                              user.image ||
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                            }
                            alt="Avatar"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-sm text-[#1C1E1B] block truncate">
                            {user.name}
                          </span>
                          <span className="text-xs text-zinc-400 flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="px-6 py-4">
                      <span className="text-xs font-bold capitalize text-zinc-600 px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded-md">
                        {user.accountType || "client"}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-6 py-4">
                      {user.banned ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-red-700 bg-red-50 text-[11px] font-bold">
                          <ShieldAlert className="w-3 h-3" /> Banned
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-emerald-700 bg-emerald-50 text-[11px] font-bold">
                          <ShieldCheck className="w-3 h-3" /> Active
                        </span>
                      )}
                    </Table.Cell>

                    <Table.Cell className="px-6 py-4 text-right">
                      <Button
                        onPress={() => {
                          initiateBanToggleRequest(
                            rowId,
                            user.name,
                            !user.banned
                          );
                        }}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                          user.banned
                            ? "bg-[#4E654C] text-white hover:bg-[#3d503b]"
                            : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                        }`}
                        size="sm"
                      >
                        {user.banned ? "Unblock" : "Block User"}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* 🛠️ Confirmation Modal Overlay */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-zinc-100">
                Confirm Restriction State Mutation
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Are you sure you want to change the status of{" "}
                <span className="text-zinc-200 font-medium">
                  {pendingChange?.userName}
                </span>{" "}
                to{" "}
                <span
                  className={`font-bold uppercase ${
                    pendingChange?.targetBanStatus
                      ? "text-red-400"
                      : "text-emerald-400"
                  }`}
                >
                  {pendingChange?.targetBanStatus ? "Banned" : "Active"}
                </span>
                ? This alters platform system access tokens and application
                workspace layout pipelines immediately.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 text-xs font-medium">
              <button
                disabled={isUpdating}
                onClick={() => {
                  setIsConfirmOpen(false);
                  setPendingChange(null);
                }}
                className="px-4 py-2 text-zinc-400 hover:text-zinc-200 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isUpdating}
                onClick={confirmUserStatusUpdate}
                className={`px-4 py-2 text-white rounded-md transition-colors shadow-lg disabled:opacity-50 min-w-19 flex items-center justify-center font-bold ${
                  pendingChange?.targetBanStatus
                    ? "bg-red-600 hover:bg-red-500 shadow-red-600/10"
                    : "bg-[#4E654C] hover:bg-[#3d503b] shadow-emerald-900/10"
                }`}
              >
                {isUpdating ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
