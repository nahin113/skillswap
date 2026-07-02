import React from "react";
import { getTasksByemail } from "@/lib/api/tasks";
import { getPaymentsByemail } from "@/lib/api/payments";
import ClientOverviewClient from "@/components/Clients/ClientOverviewClient";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  let tasks = [];
  let payments = [];

  try {
    // 🔌 Fetch real data from your backend simultaneously
    const [tasksData, paymentsData] = await Promise.all([
      getTasksByemail(),
      getPaymentsByemail(),
    ]);

    tasks = Array.isArray(tasksData) ? tasksData : tasksData?.tasks || [];
    payments = Array.isArray(paymentsData)
      ? paymentsData
      : paymentsData?.payments || [];
  } catch (err) {
    console.error("Failed to load client overview metrics:", err);
  }

  // --- 1. Total Metrics Math ---
  const totalTasks = tasks.length;
  const openTasks = tasks.filter(
    (t) => t.status?.toLowerCase() === "open"
  ).length;
  const inProgressTasks = tasks.filter(
    (t) =>
      t.status?.toLowerCase() === "in-progress" ||
      t.status?.toLowerCase() === "in progress"
  ).length;

  // Calculate real total spent based strictly on successful payments
  const totalSpent = payments.reduce((sum, p) => {
    if (p.payment_status?.toLowerCase() === "paid") {
      return sum + Number(p.amount || 0);
    }
    return sum;
  }, 0);

  // --- 2. Dynamic Spending Chart (Last 6 Months Timeline) ---
const spendingChartData = Array.from({ length: 6 }, (_, i) => {
  const d = new Date();
  // Adjust the month cleanly without rolling over year boundaries unexpectedly
  d.setMonth(d.getMonth() - (5 - i));
  return {
    monthIndex: d.getMonth(), // June will be 5
    year: d.getFullYear(), // 2026
    name: d.toLocaleString("en-US", { month: "short" }), // "Jun"
    spent: 0,
  };
});

  // Distribute payments into chart timeline boxes
  payments.forEach((p) => {
    // Safe validation matching your DB structure exactly
    if (p.payment_status?.toLowerCase() !== "paid" || !p.paid_at) return;

    const pDate = new Date(p.paid_at);
    const pMonth = pDate.getMonth();
    const pYear = pDate.getFullYear();

    // Find the exact matching bucket in our 6-month array
    const match = spendingChartData.find(
      (m) => m.monthIndex === pMonth && m.year === pYear
    );

    if (match) {
      match.spent += Number(p.amount || 0);
    }
  });

  // --- 3. Platform Distribution Stats ---
  const openPercentage =
    totalTasks > 0 ? Math.round((openTasks / totalTasks) * 100) : 0;
  const progressPercentage =
    totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;

  return (
    <ClientOverviewClient
      metrics={{ totalTasks, openTasks, inProgressTasks, totalSpent }}
      spendingData={spendingChartData}
      distribution={{ openPercentage, progressPercentage }}
    />
  );
}
