"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Table, Button, toast } from "@heroui/react";
import { Mail, ShieldAlert, ShieldCheck } from "lucide-react";
import { updateUserStatus } from "@/lib/actions/users";


export default function UserTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);

  const handleBanToggle = async (userId,status) => {
    try {
      await updateUserStatus(userId, status);

      setUsers((prev) =>
        prev.map((u) => {
          const currentId = u._id || u.id;
          console.log("curent",currentId)
          return currentId === userId ? { ...u, banned: status } : u;
        })
      );
    } catch (error) {
      toast("Failed to update user status")
    }
  };

  return (
    <Table
      aria-label="User Management Table"
      className="bg-white rounded-2xl border border-[#E6DDD4] shadow-sm p-2"
    >
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            {/* 🛡️ FIX: Added isRowHeader to the primary identity cell column */}
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
              // Ensure we fallback to a safe string identifier for keys
              const rowId = user.id || user._id;

              return (
                // 🔑 FIX: Added explicit unique string key parameters
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
                      onPress={()=> {handleBanToggle(user.id, !user.banned);}}
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
  );
}
