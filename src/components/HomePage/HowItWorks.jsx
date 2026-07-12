"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "../CountUp";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      tag: "step 01",
      title: "Post a Task",
      shortTitle: "1. Post a Task",
      description:
        "Describe what you need done in minutes. Set your budget, specify your deadlines, and outline requirements to attract specialized professionals.",
      metricValue: "10k+",
      metricLabel: "Daily Tasks Posted",
      bgImage:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      tag: "step 02",
      title: "Get Proposals",
      shortTitle: "2. Get Proposals",
      description:
        "Receive instant customized bids from verified talent across the globe. Compare ratings, completed task metrics, and reviews to find your perfect match.",
      metricValue: "5 Min",
      metricLabel: "Avg Response Time",
      bgImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      tag: "step 03",
      title: "Hire and Pay Safely",
      shortTitle: "3. Hire & Pay",
      description:
        "Collaborate directly on milestones. Funds are securely bound in escrow and only released to your freelancer once you review and approve the finalized task.",
      metricValue: "100%",
      metricLabel: "Secure Escrow",
      bgImage:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="w-full bg-[#F4EFEA] py-24 font-sans overflow-hidden border-t border-[#E6DDD4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1C1E1B] tracking-tight">
            How It <span className="text-[#14A800]">Works</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5A5E5A]">
            Your seamless micro-task route from initial posting straight to
            secure project completion.
          </p>
        </div>

        {/* 
          FIX: Replaced min-h- with an explicit fixed height on desktop (lg:h-[480px]), 
          and forced h-auto on mobile layouts to isolate component geometry.
        */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-5 h-auto lg:h-[480px] w-full overflow-hidden">
          {steps.map((step) => {
            const isOpen = activeStep === step.id;

            return (
              <motion.div
                key={step.id}
                layout
                onMouseEnter={() => setActiveStep(step.id)}
                transition={{
                  duration: 0.75,
                  ease: [0.25, 1, 0.35, 1],
                }}
                className={`group relative rounded-[2.5rem] border border-[#E6DDD4] overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-500 h-auto lg:h-full ${
                  isOpen
                    ? "flex-[3.5] bg-white p-8 md:p-10 shadow-md border-zinc-300"
                    : "flex-[0.5] bg-[#E6DDD4]/30 hover:bg-[#E6DDD4]/70 hover:border-zinc-400 p-6 items-center justify-center min-w-[85px] hidden lg:flex"
                }`}
              >
                {/* --- 1. FULL VIEW DISPLAY (When card is hovered/expanded) --- */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className="h-full flex flex-col md:flex-row gap-8 items-center w-full overflow-hidden"
                  >
                    {/* Left Frame Content */}
                    <div className="flex-1 flex flex-col justify-between h-full py-2 space-y-6">
                      <div className="space-y-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#14A800]">
                          {step.tag}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#1C1E1B] tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5A5E5A] leading-relaxed max-w-md">
                          {step.description}
                        </p>
                      </div>

                      {/* Pill Mini Badge and Action Tracker */}
                      <div className="flex items-center gap-4 bg-[#F4EFEA] border border-[#E6DDD4] rounded-2xl p-4 w-fit shrink-0">
                        <div>
                          <div className="text-xl font-black text-[#1C1E1B]">
                            <CountUp
                              from={0}
                              to={step.metricValue}
                              separator=","
                              direction="up"
                              duration={1.2}
                              className="count-up-text"
                              delay={0.1}
                            />
                          </div>
                          <div className="text-[11px] font-bold text-[#5A5E5A] uppercase tracking-wider">
                            {step.metricLabel}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Frame Content: Media Card */}
                    <div className="w-full md:w-[48%] h-48 md:h-full relative rounded-3xl overflow-hidden border border-[#E6DDD4] shadow-inner shrink-0">
                      <img
                        src={step.bgImage}
                        alt={step.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1E1B]/30 to-transparent" />
                    </div>
                  </motion.div>
                )}

                {/* --- 2. COMPRESSED VERTICAL TAB VIEW (When closed on Desktop) --- */}
                {!isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-between h-full py-5 pointer-events-none w-full"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1C1E1B] group-hover:bg-[#14A800] transition-colors duration-300 flex items-center justify-center text-[#F4EFEA] text-xs font-extrabold shadow-sm">
                      {step.id}
                    </div>

                    {/* Rotated text layout */}
                    <p className="text-sm font-black text-[#1C1E1B] group-hover:text-black tracking-tight whitespace-nowrap rotate-90 my-20 origin-center transition-colors duration-300">
                      {step.shortTitle}
                    </p>

                    <div className="w-2 h-2 rounded-full bg-[#1C1E1B]/30 group-hover:bg-[#14A800]/60 transition-colors duration-300" />
                  </motion.div>
                )}

                {/* --- 3. MOBILE FALLBACK LAYOUT (Stacked rows triggerable on tap below lg viewport) --- */}
                <div className="lg:hidden block w-full">
                  {!isOpen && (
                    <div
                      className="flex items-center justify-between py-3 px-1"
                      onClick={() => setActiveStep(step.id)}
                    >
                      <span className="font-extrabold text-[#1C1E1B]">
                        {step.shortTitle}
                      </span>
                      <span className="text-xs text-[#14A800] font-bold tracking-wide uppercase">
                        View Step
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
