"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Custom Mobile Stack state logic tracker
  const [mobileStack, setMobileStack] = useState(steps);

  const handleMobileCardClick = () => {
    // React Bitz implementation style: cycle the top card to the back of the stack array
    setMobileStack((prev) => {
      const copy = [...prev];
      const first = copy.shift();
      if (first) copy.push(first);
      return copy;
    });
  };

  return (
    <section className="w-full bg-[#F4EFEA] py-16 lg:py-24 font-sans overflow-hidden border-t border-[#E6DDD4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading Layout Frame */}
        <div className="text-center max-w-xl mx-auto mb-12 lg:mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1C1E1B] tracking-tight">
            How It <span className="text-[#14A800]">Works</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5A5E5A]">
            Your seamless micro-task route from initial posting straight to
            secure project completion.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. MOBILE REACT-BITZ INSPIRED STACK SYSTEM (Visible below lg break frames) */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-col items-center justify-center w-full min-h-[500px] py-4 relative select-none">
          {/* Card Stack Deck Canvas container */}
          <div className="relative w-full max-w-[340px] h-[440px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {mobileStack.map((step, index) => {
                // Stack layout index calculations
                const isTopCard = index === 0;

                return (
                  <motion.div
                    key={step.id}
                    style={{
                      transformOrigin: "bottom center",
                      zIndex: mobileStack.length - index,
                    }}
                    animate={{
                      y: index * -12, // Stack cascading offsets
                      scale: 1 - index * 0.04,
                      opacity: index > 2 ? 0 : 1,
                    }}
                    exit={{
                      x: 240,
                      opacity: 0,
                      scale: 0.9,
                      rotate: 10,
                      transition: { duration: 0.35, ease: "easeInOut" },
                    }}
                    onClick={isTopCard ? handleMobileCardClick : undefined}
                    className={`absolute inset-0 w-full h-full rounded-[2rem] border border-[#E6DDD4] bg-white p-6 shadow-xl flex flex-col justify-between overflow-hidden ${
                      isTopCard
                        ? "cursor-pointer active:scale-98 transition-transform"
                        : "pointer-events-none"
                    }`}
                  >
                    {/* Media Card Preview Background Track */}
                    <div className="w-full h-36 relative rounded-2xl overflow-hidden border border-[#E6DDD4] shrink-0">
                      <img
                        src={step.bgImage}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#14A800] border border-[#E6DDD4]">
                        {step.tag}
                      </div>
                    </div>

                    {/* Step Text Fields Content */}
                    <div className="flex-1 flex flex-col justify-center py-2 space-y-2">
                      <h3 className="text-xl font-black text-[#1C1E1B] tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#5A5E5A] leading-relaxed line-clamp-3">
                        {step.description}
                      </p>
                    </div>

                    {/* Footer Metrics Panel */}
                    <div className="flex items-center justify-between border-t border-[#F4EFEA] pt-3 mt-auto">
                      <div>
                        <div className="text-lg font-black text-[#1A800] text-[#14A800]">
                          <CountUp
                            from={0}
                            to={step.metricValue}
                            separator=","
                            direction="up"
                            duration={1}
                            delay={0.1}
                          />
                        </div>
                        <div className="text-[9px] font-bold text-[#949894] uppercase tracking-wider">
                          {step.metricLabel}
                        </div>
                      </div>

                      <div className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                        Next Step &rarr;
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. DESKTOP ACCORDION GRID COMPONENT FRAME (Visible above lg viewports) */}
        {/* ==================================================================== */}
        <div className="hidden lg:flex flex-col lg:flex-row items-stretch justify-center gap-5 h-[480px] w-full overflow-hidden">
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
                className={`group relative rounded-[2.5rem] border border-[#E6DDD4] overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-500 h-full ${
                  isOpen
                    ? "flex-[3.5] bg-white p-8 md:p-10 shadow-md border-zinc-300"
                    : "flex-[0.5] bg-[#E6DDD4]/30 hover:bg-[#E6DDD4]/70 hover:border-zinc-400 p-6 items-center justify-center min-w-[85px] flex"
                }`}
              >
                {/* --- FULL OPEN CARD LAYOUT --- */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className="h-full flex flex-col md:flex-row gap-8 items-center w-full overflow-hidden"
                  >
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

                {/* --- CLOSED VERTICAL ACCORDION TAB LAYOUT --- */}
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

                    <p className="text-sm font-black text-[#1C1E1B] group-hover:text-black tracking-tight whitespace-nowrap rotate-90 my-20 origin-center transition-colors duration-300">
                      {step.shortTitle}
                    </p>

                    <div className="w-2 h-2 rounded-full bg-[#1C1E1B]/30 group-hover:bg-[#14A800]/60 transition-colors duration-300" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
