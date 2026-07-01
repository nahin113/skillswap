import React from "react";
import { getUsersList } from "@/lib/api/users";
import { getAllTasks } from "@/lib/api/tasks";
import { getPayments } from "@/lib/api/payments";
import AdminOverviewClient from "@/components/admin/AdminOverviewClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let users = [];
  let tasks = [];
  let payments = [];

  try {
    const [usersData, tasksData, paymentsData] = await Promise.all([
      getUsersList(),
      getAllTasks(),
      getPayments(),
    ]);

    users = Array.isArray(usersData) ? usersData : usersData?.users || [];
    tasks = Array.isArray(tasksData) ? tasksData : tasksData?.tasks || [];
    payments = Array.isArray(paymentsData)
      ? paymentsData
      : paymentsData?.payments || [];
  } catch (err) {
    console.error("Failed to load admin overview metrics:", err);
  }

  // --- 1. Total Overview Metrics ---
  const totalUsers = users.length;
  const totalTasks = tasks.length;

  const activeTasks = tasks.filter(
    (t) =>
      t.status?.toLowerCase() === "open" ||
      t.status?.toLowerCase() === "in progress"
  ).length;

  const totalRevenue = payments.reduce((sum, payment) => {
    if (payment.payment_status?.toLowerCase() === "paid") {
      return sum + Number(payment.amount || 0);
    }
    return sum;
  }, 0);

  // --- 2. Dynamic Revenue Chart (Last 6 Months) ---
  // Generate an array representing the last 6 months automatically
  const revenueChartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return {
      monthIndex: d.getMonth(),
      year: d.getFullYear(),
      name: d.toLocaleString("en-US", { month: "short" }), // e.g., "Jan", "Feb"
      revenue: 0,
    };
  });

  // Loop through real payments and slot them into the correct month
  payments.forEach((p) => {
    if (p.payment_status?.toLowerCase() !== "paid" || !p.paid_at) return;

    const pDate = new Date(p.paid_at);
    const match = revenueChartData.find(
      (m) => m.monthIndex === pDate.getMonth() && m.year === pDate.getFullYear()
    );

    if (match) {
      match.revenue += Number(p.amount || 0);
    }
  });

  // --- 3. Dynamic Task Distribution (Pie Chart) ---
  const openTasksCount = tasks.filter(
    (t) => t.status?.toLowerCase() === "open"
  ).length;
  const inProgressTasksCount = tasks.filter(
    (t) => t.status?.toLowerCase() === "in progress"
  ).length;
  const completedTasksCount = tasks.filter(
    (t) =>
      t.status?.toLowerCase() === "completed" ||
      t.status?.toLowerCase() === "closed"
  ).length;

  const taskDistributionData = [
    { name: "Open", value: openTasksCount, color: "#0015ff" }, // Vibrant blue
    { name: "In Progress", value: inProgressTasksCount, color: "#1e293b" }, // Dark slate
    { name: "Completed", value: completedTasksCount, color: "#10b981" }, // Emerald green
  ];

  // --- 4. Dynamic Platform Activity (Top Categories) ---
  const categoryCounts = {};
  tasks.forEach((t) => {
    const cat = t.category || "Uncategorized";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const activityColors = ["#0015ff", "#1e293b", "#cbd5e1"];
  const categoryStats = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by highest count
    .slice(0, 3) // Grab only the top 3 categories
    .map(([name, count], index) => ({
      name,
      percentage: totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0,
      color: activityColors[index] || activityColors[0],
    }));

  return (
    <AdminOverviewClient
      metrics={{ totalUsers, totalTasks, activeTasks, totalRevenue }}
      revenueData={revenueChartData}
      taskData={taskDistributionData}
      categoryStats={categoryStats} // Passing dynamic categories down!
    />
  );
}
