"use client";

import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4EFEA] px-4">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#14A800]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center max-w-xs text-center space-y-6 relative">
        {/* Modern Compound Loading Ring Geometric Structure */}
        <div className="relative w-16 h-16">
          {/* External Track */}
          <div className="absolute inset-0 rounded-full border-4 border-[#E6DDD4]" />

          {/* Active Spinning Segment */}
          <div className="absolute inset-0 rounded-full border-4 border-t-[#14A800] border-r-transparent border-b-transparent border-l-transparent animate-spin duration-700" />

          {/* Core Stationary Brand Point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#1C1E1B] rounded-full" />
        </div>

        {/* Status Copy Information */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-black text-[#1C1E1B] tracking-tight">
            Syncing Workspace
          </h3>
          <p className="text-xs text-[#5A5E5A] font-medium max-w-[200px] leading-relaxed mx-auto">
            Fetching secure assets and matching skill records...
          </p>
        </div>

        {/* Minimal Progress Track Line Accent */}
        <div className="w-24 h-[3px] bg-[#E6DDD4] rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 bg-[#14A800] w-1/2 rounded-full animate-[loading-bar_1.5s_infinite_ease-in-out]" />
        </div>
      </div>

      {/* Injecting smooth custom keyframes directly inline without cluttering tailwind.config */}
      <style jsx global>{`
        @keyframes loading-bar {
          0% {
            left: -50%;
            width: 30%;
          }
          50% {
            width: 60%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }
      `}</style>
    </div>
  );
}
