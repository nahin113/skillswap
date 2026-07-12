"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, Star } from "lucide-react";
import { getFreelancersList } from "@/lib/api/freelancers";

export default function TopFreelancersSection() {
  const [topFreelancers, setTopFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const allFreelancers = await getFreelancersList();
        // Slice the first 4 freelancers to fit the desktop scattered layout perfectly
        const start = allFreelancers.length-4 ;
        const end = allFreelancers.length ;
        setTopFreelancers((allFreelancers || []).slice(3, 7));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

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

  if (loading) {
    return (
      <div className="w-full py-24 bg-[#F4EFEA] flex justify-center items-center text-zinc-400 font-medium text-sm">
        Discovering elite platform talent...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-24 bg-[#F4EFEA] flex justify-center items-center text-red-500 font-medium text-sm">
        Failed to load freelancers: {error}
      </div>
    );
  }

  return (
    <section className="w-full bg-[#F4EFEA] py-24 lg:py-32 font-sans overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 lg:mb-20 space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1E1B] tracking-tight">
            Work with <span className="text-[#108A00]">Top Talent</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5A5E5A] max-w-2xl leading-relaxed font-medium">
            Connect with highly rated professionals who consistently deliver
            exceptional quality on our marketplace.
          </p>
          <Link
            href="/browseFreelancers"
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
            // Apply staggered offsets on large screens
            const staggeredOffsets = [
              "lg:mt-0", // Card 1
              "lg:mt-16", // Card 2
              "lg:mt-6", // Card 3
              "lg:mt-24", // Card 4
            ];

            const freelancerId = freelancer._id?.$oid || freelancer._id;

            return (
              <motion.div
                key={freelancerId}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-white border border-[#E6DDD4] rounded-[3rem] p-8 flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl ${
                  staggeredOffsets[index % staggeredOffsets.length]
                }`}
              >
                {/* Card Header: Avatar & Info */}
                <div className="flex flex-col items-center text-center space-y-4 mb-5">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#F4EFEA] shadow-sm shrink-0">
                    <Image
                      src={
                        freelancer.image ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
                      }
                      alt={`${freelancer.name || "Freelancer"} Profile Picture`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1C1E1B] leading-tight truncate max-w-[200px]">
                      {freelancer.name || "Anonymous User"}
                    </h3>
                    <p className="text-xs text-[#4E654C] font-bold uppercase tracking-wider mt-1">
                      {freelancer.skills?.[0]
                        ? `${freelancer.skills[0]} Expert`
                        : "Verified Provider"}
                    </p>
                  </div>
                </div>

                {/* Bio Snippet Area */}
                {freelancer.bio && (
                  <p className="text-xs text-zinc-500 font-medium text-center line-clamp-2 mb-4 leading-relaxed px-1">
                    "{freelancer.bio}"
                  </p>
                )}

                {/* Stats Row: Rating & Hourly Rate */}
                <div className="flex justify-between items-center space-x-2 mb-6 bg-[#F4EFEA]/60 rounded-2xl p-3.5 border border-[#E6DDD4]/50 mt-auto">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black text-[#1C1E1B]">
                      5.0
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#4E654C] flex items-center bg-[#EBF0EC] px-2.5 py-1 rounded-full border border-[#D4DCCE]/50">
                    <DollarSign className="w-3 h-3 shrink-0" />
                    <span>{freelancer.rate || "25"}/hr</span>
                  </div>
                </div>

                {/* Skills Tag Cloud */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                  {(freelancer.skills || []).slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-block px-2.5 py-1 bg-[#F4EFEA]/40 text-zinc-600 text-[11px] font-semibold rounded-full border border-[#E6DDD4]/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Link
                  href={`/browseFreelancers/${freelancerId}`}
                  className="w-full inline-flex justify-center items-center py-3.5 bg-[#1C1E1B] text-[#F4EFEA] hover:bg-[#108A00] text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-200 shadow-sm"
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
