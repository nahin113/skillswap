"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TopFreelancersSection() {
  // Mock Data: Array of Top Freelancers
  const topFreelancers = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Senior UI/UX Designer",
      rating: 4.9,
      reviews: 128,
      jobsCompleted: 145,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      skills: ["Figma", "Web Design", "UI/UX"],
    },
    {
      id: 2,
      name: "David Chen",
      role: "Full-Stack Developer",
      rating: 5.0,
      reviews: 89,
      jobsCompleted: 94,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "SEO Specialist",
      rating: 4.8,
      reviews: 210,
      jobsCompleted: 230,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      skills: ["Copywriting", "SEO", "Blogs"],
    },
    {
      id: 4,
      name: "Marcus Thorne",
      role: "Brand Designer",
      rating: 4.9,
      reviews: 156,
      jobsCompleted: 162,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      skills: ["Logos", "Illustrator", "Brand"],
    },
  ];

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-[#F4EFEA] py-24 lg:py-32 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 lg:mb-20 space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1E1B] tracking-tight">
            Work with <span className="text-[#4E654C]">Top Talent</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5A5E5A] max-w-2xl leading-relaxed">
            Connect with highly rated professionals who consistently deliver
            exceptional quality on our marketplace.
          </p>
          <Link
            href="/freelancers"
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#1C1E1B] hover:text-[#4E654C] transition-colors group pt-2"
          >
            <span>Explore All Freelancers</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
        </div>

        {/* Scattered / Staggered Freelancer Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pb-16"
        >
          {topFreelancers.map((freelancer, index) => {
            // Apply different top margins to create the "scattered here and there" look on desktop
            const staggeredOffsets = [
              "lg:mt-0", // Card 1: Normal
              "lg:mt-16", // Card 2: Pushed down heavily
              "lg:mt-6", // Card 3: Pushed down slightly
              "lg:mt-24", // Card 4: Pushed down the most
            ];

            return (
              <motion.div
                key={freelancer.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                // Extreme rounding with rounded-[3rem] and staggered margin array applied
                className={`bg-white border border-[#E6DDD4] rounded-[3rem] p-8 flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl ${staggeredOffsets[index]}`}
              >
                {/* Card Header: Avatar & Info */}
                <div className="flex flex-col items-center text-center space-y-4 mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#F4EFEA] shadow-sm shrink-0">
                    <Image
                      src={freelancer.image}
                      alt={`${freelancer.name} Profile Picture`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C1E1B] leading-tight truncate">
                      {freelancer.name}
                    </h3>
                    <p className="text-sm text-[#5A5E5A] font-medium mt-1">
                      {freelancer.role}
                    </p>
                  </div>
                </div>

                {/* Stats Row: Rating & Jobs Completed */}
                <div className="flex flex-col items-center space-y-2 mb-6 bg-[#F4EFEA]/60 rounded-3xl p-4 border border-[#E6DDD4]/50">
                  <div className="flex items-center space-x-1.5">
                    <svg
                      className="w-5 h-5 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-base font-bold text-[#1C1E1B]">
                      {freelancer.rating}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-[#5A5E5A]">
                    <span className="text-[#1C1E1B] font-bold">
                      {freelancer.jobsCompleted}
                    </span>{" "}
                    Jobs Done
                  </div>
                </div>

                {/* Skills Tag Cloud */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 mt-auto">
                  {freelancer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1.5 bg-[#EBF0EC] text-[#4E654C] text-xs font-bold rounded-full border border-[#D4DCCE]/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Link
                  href={`/freelancers/${freelancer.id}`}
                  className="w-full inline-flex justify-center items-center py-3.5 bg-[#1C1E1B] text-[#F4EFEA] hover:bg-[#4E654C] text-sm font-semibold rounded-full transition-colors duration-200"
                >
                  View Profile
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
