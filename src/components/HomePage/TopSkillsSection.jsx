"use client";

import React from "react";
import LogoLoop from "../LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiFigma,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";

export default function TopSkillsSection() {
  const popularSkills = [
    {
      node: <SiReact className="text-xl transition-colors duration-300" />,
      title: "React Dev",
      href: "/tasks?skill=react",
    },
    {
      node: <SiNextdotjs className="text-xl transition-colors duration-300" />,
      title: "Next.js",
      href: "/tasks?skill=nextjs",
    },
    {
      node: <SiTypescript className="text-xl transition-colors duration-300" />,
      title: "TypeScript",
      href: "/tasks?skill=typescript",
    },
    {
      node: (
        <SiTailwindcss className="text-xl transition-colors duration-300" />
      ),
      title: "Tailwind UI",
      href: "/tasks?skill=tailwindcss",
    },
    {
      node: <SiPython className="text-xl transition-colors duration-300" />,
      title: "Python Backend",
      href: "/tasks?skill=python",
    },
    {
      node: <SiFigma className="text-xl transition-colors duration-300" />,
      title: "UI/UX Design",
      href: "/tasks?skill=figma",
    },
    {
      node: <SiNodedotjs className="text-xl transition-colors duration-300" />,
      title: "Node Ecosystem",
      href: "/tasks?skill=nodejs",
    },
    {
      node: <SiPostgresql className="text-xl transition-colors duration-300" />,
      title: "PostgreSQL DB",
      href: "/tasks?skill=postgresql",
    },
  ];

  return (
    <div className="w-full mt-12 mb-6 font-sans bg-transparent select-none">
      {/* Modern Single-Line Inline Flex Container */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Clean Left Title Prefix */}
        <div className="shrink-0 flex items-center min-h-[56px]">
          <span className="text-xs font-black text-[#1C1E1B] uppercase tracking-wider whitespace-nowrap">
            Trending Expertise :
          </span>
        </div>

        {/* Marquee Wrapper Area (Fills the remaining horizontal space) */}
        <div className="relative bg-transparent group flex-1 min-w-0 overflow-hidden">
          {/* Premium Dark Tone Style Overrides without Green Accents */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .featured-loop-wrapper a {
              display: inline-flex !important;
              align-items: center !important;
              gap: 10px !important;
              background-color: #F4EFEA !important;
              border: 1px solid #E6DDD4 !important;
              padding: 10px 22px !important;
              border-radius: 9999px !important;
              color: #1C1E1B !important;
              font-size: 0.825rem !important;
              font-weight: 700 !important;
              text-decoration: none !important;
              transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1) !important;
            }
            .featured-loop-wrapper a:hover {
              background-color: #1C1E1B !important;
              border-color: #1C1E1B !important;
              color: #ffffff !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px rgba(28, 30, 27, 0.08) !important;
            }
            .featured-loop-wrapper a:hover svg {
              color: #ffffff !important;
            }
            .featured-loop-wrapper svg {
              color: #5A5E5A; /* High contrast, clean medium-dark gray tone */
              transition: color 0.3s ease !important;
            }
          `,
            }}
          />

          <div className="featured-loop-wrapper relative h-14 overflow-hidden">
            <LogoLoop
              logos={popularSkills}
              speed={35}
              direction="left"
              logoHeight={44}
              gap={20}
              hoverSpeed={0} // Freezes marquee instantly when specific nodes are hovered
              scaleOnHover={false}
              fadeOut={true}
              fadeOutColor="#ffffff" // Clean alpha fade on edges into your white section
              ariaLabel="Trending expertise horizontal pipeline"
              useCustomRender={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
