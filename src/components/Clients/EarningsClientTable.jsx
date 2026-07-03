"use client";

import React from "react";
import { Table } from "@heroui/react";
import { DollarSign, Calendar, User } from "lucide-react";

export default function EarningsClientTable({ ledger }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Table
      aria-label="Freelancer payments received list ledger"
      className="bg-white rounded-2xl border border-[#E6DDD4] shadow-sm p-2"
    >
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column
              isRowHeader
              className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4"
            >
              Task Title
            </Table.Column>
            <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
              Client Email
            </Table.Column>
            <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
              Amount Made
            </Table.Column>
            <Table.Column className="bg-[#F4EFEA] text-[#1C1E1B] font-bold text-xs px-6 py-4">
              Completion Date
            </Table.Column>
          </Table.Header>

          <Table.Body emptyContent="No cleared payment revenue distributions logged to this account profile.">
            {ledger.map((item) => (
              <Table.Row
                key={item._id}
                className="border-b border-[#E6DDD4]/40 hover:bg-[#F4EFEA]/20 transition-colors"
              >
                <Table.Cell className="px-6 py-4">
                  <span className="font-bold text-sm text-[#1C1E1B] block">
                    {item.taskTitle}
                  </span>
                </Table.Cell>

                <Table.Cell className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{item.clientEmail}</span>
                  </div>
                </Table.Cell>

                <Table.Cell className="px-6 py-4">
                  <div className="inline-flex items-center gap-0.5 font-black text-sm text-[#4E654C] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                    <DollarSign className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{item.amount}</span>
                  </div>
                </Table.Cell>

                <Table.Cell className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{formatDate(item.completionDate)}</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
