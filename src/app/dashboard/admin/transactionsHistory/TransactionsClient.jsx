"use client";

import React, { useState } from "react";

export default function TransactionsClient({ initialPayments }) {
  const [payments] = useState(initialPayments);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">Client Email</th>
              <th className="py-4 px-6">Freelancer Email</th>
              <th className="py-4 px-6">Payout Size</th>
              <th className="py-4 px-6">Payment Date</th>
              <th className="py-4 px-6 text-right">Payment Status Label</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {payments.length > 0 ? (
              payments.map((payment) => {
                const paymentId =
                  payment._id?.toString() || payment.transaction_id;
                const normalizedStatus =
                  payment.payment_status?.toLowerCase() || "paid";

                return (
                  <tr
                    key={paymentId}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Client Email */}
                    <td className="py-4 px-6 font-mono text-xs text-slate-700 font-medium">
                      {payment.client_email || "N/A"}
                    </td>

                    {/* Freelancer Email */}
                    <td className="py-4 px-6 font-mono text-xs text-slate-500">
                      {payment.freelancer_email || "N/A"}
                    </td>

                    {/* Payout Size */}
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      $
                      {Number(payment.amount || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      USD
                    </td>

                    {/* Payment Date Formatting */}
                    <td className="py-4 px-6 text-xs text-slate-500">
                      {payment.paid_at
                        ? new Date(payment.paid_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </td>

                    {/* Status Pill Indicator */}
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          normalizedStatus === "paid" ||
                          normalizedStatus === "succeeded"
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                            : "text-amber-700 bg-amber-50 border-amber-200"
                        }`}
                      >
                        {payment.payment_status || "paid"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-16 text-center text-slate-400">
                  No transaction settlements logged inside the platform
                  databases currently.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
