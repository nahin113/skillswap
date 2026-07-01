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

  return (
    <div className="w-full min-h-screen bg-[#f4f7fe] p-6 md:p-8 font-sans text-slate-800">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Admin Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Platform analytics and global metrics
        </p>
      </div>

      {/* TOP METRIC CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Users
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {metrics.totalUsers.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Total Tasks Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-700">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Tasks
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {metrics.totalTasks.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Active Tasks Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Tasks
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {metrics.activeTasks.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Revenue Card (Styled like the blue card in your image) */}
        <div className="bg-[#0015ff] p-6 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
              Earning
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
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
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
                  {/* The exact vibrant blue gradient from the image */}
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0015ff" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#0015ff" stopOpacity={0} />
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
                  itemStyle={{ color: "#0015ff", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0015ff"
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
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Task Distribution
            </h3>
            <div className="h-[180px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {taskData.map((entry, index) => (
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
                <span className="text-xl font-black text-slate-900">
                  {metrics.totalTasks}
                </span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="flex justify-center gap-4 mt-2">
              {taskData.map((item) => (
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
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Platform Activity
            </h3>
            <div className="space-y-4">
              {categoryStats && categoryStats.length > 0 ? (
                categoryStats.map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-600">
                        {stat.name}
                      </span>
                      <span className="text-slate-400">{stat.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${stat.percentage}%`,
                          backgroundColor: stat.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))
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
