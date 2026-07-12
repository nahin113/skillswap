"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  // Fixes hydration by rendering a safe default fallback, then mounting the system year safely
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-[#F4EFEA] border-t border-[#E6DDD4] pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Main Footer Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-[#E6DDD4]">
          {/* Column 1: Brand Identifier Block */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#4E654C] flex items-center justify-center">
                <span className="text-[#F4EFEA] font-bold text-sm">S</span>
              </div>
              <span className="text-[#1C1E1B] font-bold text-xl tracking-tight">
                SkillSwap
              </span>
            </Link>
            <p className="text-sm text-[#5A5E5A] leading-relaxed max-w-xs">
              The seamless, micro-task freelance marketplace engineered for
              swift, verified collaborative workflows.
            </p>
          </div>

          {/* Column 2: Platform Navigation Track */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1C1E1B] tracking-wider uppercase">
              Explore Marketplace
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[#5A5E5A] hover:text-[#4E654C] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tasks"
                  className="text-sm text-[#5A5E5A] hover:text-[#4E654C] transition-colors"
                >
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link
                  href="/freelancers"
                  className="text-sm text-[#5A5E5A] hover:text-[#4E654C] transition-colors"
                >
                  Browse Freelancers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Communication & Support Parameters */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1C1E1B] tracking-wider uppercase">
              Connect With Us
            </h4>
            <ul className="space-y-2.5">
              <li className="flex flex-col space-y-0.5">
                <span className="text-xs text-[#5A5E5A]/70 uppercase tracking-tight">
                  Direct Support
                </span>
                <a
                  href="mailto:support@skillswap.com"
                  className="text-sm text-[#1C1E1B] font-medium hover:text-[#4E654C] transition-colors"
                >
                  support@skillswap.com
                </a>
              </li>
              <li className="flex flex-col space-y-0.5">
                <span className="text-xs text-[#5A5E5A]/70 uppercase tracking-tight">
                  Corporate Hotline
                </span>
                <a
                  href="tel:+8801714333624"
                  className="text-sm text-[#1C1E1B] font-medium hover:text-[#4E654C] transition-colors"
                >
                  (+880) 1714333624 
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: System Integrations / Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1C1E1B] tracking-wider uppercase">
              Corporate Trust
            </h4>
            <p className="text-sm text-[#5A5E5A] leading-relaxed">
              Safe transactions processing live and protected under global
              standard enterprise encryption pathways.
            </p>
          </div>
        </div>

        {/* Lower Sub-Footer Wrapper */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Copyright Dynamic String */}
          <p className="text-xs text-[#5A5E5A]">
            &copy; {currentYear} SkillSwap Marketplace Inc. All rights reserved
            globally.
          </p>

          {/* Social Media Link Grid: Modern Geometric X Icon Mapping */}
          <div className="flex items-center space-x-5">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-[#5A5E5A] hover:text-[#1C1E1B] hover:bg-[#EBF0EC] transition-all duration-200"
              aria-label="Follow SkillSwap on X"
            >
              <BsTwitterX/>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-[#5A5E5A] hover:text-[#1C1E1B] hover:bg-[#EBF0EC] transition-all duration-200"
              aria-label="Connect on LinkedIn"
            >
              <FaLinkedin/>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-[#5A5E5A] hover:text-[#1C1E1B] hover:bg-[#EBF0EC] transition-all duration-200"
              aria-label="View Project Source Code"
            >
              <FaGithub/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
