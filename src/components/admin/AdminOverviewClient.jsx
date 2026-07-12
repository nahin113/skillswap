"use client";

import React from "react";
import { Users, Briefcase, DollarSign, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminOverviewClient({
  metrics,
  revenueData,
  taskData,
  categoryStats,
}) {
  // Helper to format currency
  const formatCurrency = (val) => `$${Number(val).toLocaleString()}`;

  // Fallback map modification in case incoming data array uses raw blue hexes dynamically
  const sanitizedTaskData =
    taskData?.map((item) => {
      if (item.color === "#0015ff" || item.color?.includes("blue")) {
        return { ...item, color: "#14A800" };
      }
      return item;
    }) || [];

  return (
    <div className="w-full min-h-screen bg-[#F4EFEA] p-6 md:p-8 font-sans text-slate-800">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1C1E1B] tracking-tight">
          Admin Overview
        </h1>
        <p className="text-[#5A5E5A] text-sm mt-1">
          Platform analytics and global metrics
        </p>
      </div>

      {/* TOP METRIC CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E6DDD4] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#14A800]/10 flex items-center justify-center text-[#14A800]">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Users
            </p>
            <h3 className="text-2xl font-bold text-[#1C1E1B]">
              {metrics.totalUsers.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Total Tasks Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E6DDD4] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#4E654C]/10 flex items-center justify-center text-[#4E654C]">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Tasks
            </p>
            <h3 className="text-2xl font-bold text-[#1C1E1B]">
              {metrics.totalTasks.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Active Tasks Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E6DDD4] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Tasks
            </p>
            <h3 className="text-2xl font-bold text-[#1C1E1B]">
              {metrics.activeTasks.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Revenue Card (Updated from Blue to Premium Brand Green Palette) */}
        <div className="bg-[#108A00] p-6 rounded-2xl shadow-lg shadow-green-950/20 flex items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-green-100 uppercase tracking-wider">
              Earnings
            </p>
            <h3 className="text-2xl font-bold">
              {formatCurrency(metrics.totalRevenue)}
            </h3>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN AREA CHART (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E6DDD4] shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#1C1E1B]">
              Revenue Overview
            </h3>
            <p className="text-xs text-slate-400">
              Monthly financial performance
            </p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  {/* Clean emerald theme gradient track configuration */}
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14A800" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#14A800" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#14A800", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#14A800"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SIDE PIE CHART & PROGRESS BARS */}
        <div className="flex flex-col gap-6">
          {/* Pie Chart Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E6DDD4] shadow-sm flex-1">
            <h3 className="text-lg font-bold text-[#1C1E1B] mb-4">
              Task Distribution
            </h3>
            <div className="h-[180px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sanitizedTaskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {sanitizedTaskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Inner text for the donut chart */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Total Tasks
                </span>
                <span className="text-xl font-black text-[#1C1E1B]">
                  {metrics.totalTasks}
                </span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {sanitizedTaskData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-slate-500 font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Stats / Platform Activity Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E6DDD4] shadow-sm flex-1">
            <h3 className="text-lg font-bold text-[#1C1E1B] mb-4">
              Platform Activity
            </h3>
            <div className="space-y-4">
              {categoryStats && categoryStats.length > 0 ? (
                categoryStats.map((stat, i) => {
                  // Dynamically overwrite blue tags targeting database entry updates if present
                  const barColor =
                    stat.color === "#0015ff" || stat.color?.includes("blue")
                      ? "#14A800"
                      : stat.color;

                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-600">
                          {stat.name}
                        </span>
                        <span className="text-slate-400">
                          {stat.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${stat.percentage}%`,
                            backgroundColor: barColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-xs text-slate-400 text-center py-4">
                  No task categories recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
