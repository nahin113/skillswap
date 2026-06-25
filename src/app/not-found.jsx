"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="w-full min-h-screen bg-[#F4EFEA] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 font-sans overflow-hidden relative">
      {/* BACKGROUND DECORATIVE ORBS - Mimicking the soft organic pathways */}
      <div className="absolute w-[500px] h-[500px] bg-[#E6DDD4]/60 rounded-full blur-3xl -z-10 translate-x-12 -translate-y-12" />
      <div className="absolute w-[300px] h-[300px] bg-[#D4DCCE]/30 rounded-full blur-2xl -z-10 -translate-x-24 translate-y-24" />

      {/* MAIN CONTENT BLOCK */}
      <div className="max-w-xl w-full text-center flex flex-col items-center space-y-8 z-10">
        {/* INTERACTIVE 3D-STYLE CLAY NUMERIC HUB */}
        <div className="relative flex items-center justify-center min-h-[160px] md:min-h-[200px] w-full">
          {/* Subtle floating background track */}
          <div className="absolute inset-0 max-w-xs mx-auto border-4 border-dashed border-[#4E654C]/10 rounded-full -z-10 animate-spin-slow" />

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[10rem] md:text-[13rem] font-black text-[#1C1E1B] tracking-tighter leading-none select-none flex items-center justify-center drop-shadow-sm"
          >
            4{/* The Animated Middle '0' Orb */}
            <motion.span
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block text-[#4E654C] mx-[-10px] md:mx-[-15px]"
            >
              0
            </motion.span>
            4
          </motion.h1>
        </div>

        {/* TYPOGRAPHY TEXT RUN */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-[#1C1E1B] tracking-tight">
            Oops! You've lost the path.
          </h2>
          <p className="text-sm sm:text-base text-[#5A5E5A] max-w-md mx-auto leading-relaxed">
            The task or profile you are looking for seems to have swap'd places
            with a different URL. No worries, we can get you back on track.
          </p>
        </motion.div>

        {/* ACTION NAVIGATION CONTROLS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2"
        >
          {/* Primary Action */}
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#4E654C] text-[#F4EFEA] hover:bg-[#4E654C]/90 font-semibold rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Back to Dashboard
          </Link>

          {/* Secondary Text Link */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-8 py-3.5 border-2 border-[#1C1E1B] text-[#1C1E1B] hover:bg-[#1C1E1B] hover:text-[#F4EFEA] font-semibold rounded-full text-sm transition-all duration-200"
          >
            <span>Home Page</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
