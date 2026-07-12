"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  // Dynamic reviews data matching the cluster personas
  const reviews = [
    {
      id: 1,
      name: "Olivia Vance",
      role: "Founder, TechGrow",
      quote:
        "Finding high-quality developers used to take weeks. With this platform, we hired a vetted React engineer within 48 hours. The workflow was incredibly seamless!",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      size: "w-28 h-28 md:w-36 md:h-36", // Main central bubble
      offset: "lg:mt-0",
    },
    {
      id: 2,
      name: "Marcus Brody",
      role: "Freelance UI Designer",
      quote:
        "I love the micro-task approach here. I get paid immediately once the milestones are verified. It completely cuts out the typical client payment chase.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      size: "w-20 h-20 md:w-24 md:h-24",
      offset: "lg:-mt-12",
    },
    {
      id: 3,
      name: "Amara Diallo",
      role: "Marketing Director",
      quote:
        "The visual project boards make tracking multi-stage deliverables a breeze. Performance insights helped our internal team optimize workloads safely.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
      size: "w-24 h-24 md:w-32 md:h-32",
      offset: "lg:mt-16",
    },
    {
      id: 4,
      name: "Sophia Martinez",
      role: "E-commerce Owner",
      quote:
        "Incredible community of skilled specialists. Our store's SEO traffic increased by 140% after implementing the content strategy designed by our freelancer.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      size: "w-16 h-16 md:w-20 md:h-20",
      offset: "lg:-mt-8",
    },
    {
      id: 5,
      name: "Liam Henderson",
      role: "Full-Stack Dev",
      quote:
        "The direct collaboration tools are standard-setting. Clear scope tracking prevents project drift and makes technical integrations simple.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      size: "w-20 h-20 md:w-26 md:h-26",
      offset: "lg:mt-8",
    },
  ];

  // Set the first item active by default
  const [activeReview, setActiveReview] = useState(reviews[0]);

  return (
    <section className="w-full bg-[#F4EFEA] py-24 font-sans overflow-hidden border-t border-[#E6DDD4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* CENTERED HEADER BLOCK */}
        <div className="text-center max-w-2xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1C1E1B] tracking-tight">
            What People Say <span className="text-[#108A00]">About Us</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5A5E5A]">
            Click on any member of our global network below to read their
            verified platform testimonial.
          </p>
        </div>

        {/* FLOATING BUBBLE CLUSTER HORIZON (Matches image layout style exactly) */}
        <div className="w-full flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 min-h-[180px] px-2">
          {reviews.map((person) => {
            const isActive = activeReview.id === person.id;
            return (
              <motion.button
                key={person.id}
                onClick={() => setActiveReview(person)}
                // Hover micro-float adjustments
                whileHover={{ y: -6, scale: 1.05 }}
                animate={{
                  y: isActive ? [0, -4, 0] : 0,
                }}
                transition={{
                  y: isActive
                    ? { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    : {},
                }}
                className={`relative rounded-full overflow-hidden transition-all duration-300 shrink-0 cursor-pointer ${
                  person.size
                } ${person.offset} ${
                  isActive
                    ? "ring-4 ring-[#108A00] ring-offset-4 ring-offset-[#F4EFEA] scale-105 z-20 shadow-md"
                    : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0 z-10"
                }`}
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100px, 150px"
                />
              </motion.button>
            );
          })}

          {/* Static Clean Empty Hub Asset to match "View More" element in image */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-[#108A00]/40 flex items-center justify-center bg-white/30 text-center lg:-mt-14 shrink-0">
            <span className="text-[10px] md:text-xs font-bold text-[#4E654C]">
              Join Us
            </span>
          </div>
        </div>

        {/* ACTIVE REVIEW DISPLAY PANEL */}
        <div className="mt-16 w-full max-w-3xl min-h-[180px] flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white border border-[#E6DDD4] rounded-[2.5rem] p-8 md:p-10 shadow-sm text-center flex flex-col items-center relative"
            >
              {/* Decorative Large Quotation Mark Accent */}
              <span className="absolute top-4 left-6 text-7xl font-serif text-[#4E654C]/10 select-none">
                “
              </span>

              <p className="text-base sm:text-lg text-[#1C1E1B] font-medium leading-relaxed max-w-2xl italic mb-6">
                "{activeReview.quote}"
              </p>

              <div className="mt-auto">
                <h4 className="text-base font-bold text-[#1C1E1B] tracking-tight">
                  {activeReview.name}
                </h4>
                <p className="text-xs text-[#5A5E5A] font-semibold mt-0.5 uppercase tracking-wider">
                  {activeReview.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
