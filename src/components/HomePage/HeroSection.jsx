"use client";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import SplitText from "../SplitText";

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  // Pre-calculated wave values to avoid Math.random() during render
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=500&fit=crop",
      title: "Team Collaboration",
      height: "h-96",
      offset: -40,
      rotation: -5,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=350&fit=crop",
      title: "Project Board",
      height: "h-72",
      offset: 30,
      rotation: 4,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=450&fit=crop",
      title: "Analytics Dashboard",
      height: "h-80",
      offset: -35,
      rotation: -3,
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=320&fit=crop",
      title: "Team Meeting",
      height: "h-64",
      offset: 25,
      rotation: 3,
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=480&fit=crop",
      title: "Workspace",
      height: "h-88",
      offset: -45,
      rotation: -6,
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=380&fit=crop",
      title: "Planning",
      height: "h-72",
      offset: 20,
      rotation: 2,
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=440&fit=crop",
      title: "Strategy Session",
      height: "h-84",
      offset: -30,
      rotation: -4,
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&h=360&fit=crop",
      title: "Innovation Lab",
      height: "h-68",
      offset: 35,
      rotation: 5,
    },
  ];

  const duplicatedImages = [...images, ...images, ...images];
  const x = useMotionValue(0);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.accountType;

  useEffect(() => {
    setIsClient(true);
    const controls = animate(x, -1200, {
      ease: "linear",
      duration: 35,
      repeat: Infinity,
      repeatType: "loop",
    });
    return controls.stop;
  }, [x]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4EFEA] to-[#E8E0D8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="h-8 w-48 bg-gray-200/30 rounded-full mx-auto mb-4" />
            <div className="h-16 w-3/4 bg-gray-200/30 rounded-lg mx-auto mb-6" />
            <div className="h-6 w-1/2 bg-gray-200/30 rounded-lg mx-auto" />
          </div>
          <div className="h-[400px] bg-gray-200/20 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-start items-center overflow-hidden -mt-[76px] pb-24">
      {/* 1. MASTER IMMERSIVE BACKGROUND CANVAS */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner1.jpg"
          alt="Premium campus housing interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Modern dark mask overlays to protect text content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-zinc-950/50 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/60" />

        {/* PREMIUM FEATHERED GRADIENT FLUID BOTTOM: Blends your image seamlessly into your layout base color (#F1EFEB) */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#F1EFEB] via-[#F1EFEB]/70 to-transparent" />
      </div>

      <div className="pt-30 space-y-30">
        {/* 2. FLOATING DATA SHIFT BADGES */}
        <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none hidden md:block z-10">
          <div className="absolute top-[26%] left-[10%] bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-400 flex items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
            Verified Talent
          </div>
          <div className="absolute top-[34%] right-[12%] bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-amber-400 flex items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />{" "}
            Swift Workflows
          </div>
          <div className="absolute bottom-[48%] left-[6%] bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-sky-400 flex items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />{" "}
            Micro-Tasks
          </div>
          <div className="absolute bottom-[50%] right-[6%] bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-purple-400 flex items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />{" "}
            Secure Escrow
          </div>
        </div>

        {/* 3. STRUCTURAL WRAPPER CONTAINER */}
        <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-36 flex flex-col items-center">
          {/* Typography Block: Changed text colors to highly visible white/emerald variants */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              <SplitText
                text="Get your tasks done by"
                className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15]"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                showCallback
              />
              <br className="hidden md:inline" />
              <span>
                <SplitText
                  text="skilled freelancers"
                  className="text-[#108A00]"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  showCallback
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-medium drop-shadow-sm"
            >
              The seamless, micro-task freelance marketplace engineered for
              swift, verified collaborative workflows. Post a small task or
              browse open gigs to start connecting instantly with global talent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {role === "client" ? (
                <Link
                  href="/dashboard/client/postTasks"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#108A00] text-white font-bold rounded-full hover:bg-[#14A800] transition-all hover:scale-105 shadow-xl shadow-green-950/20"
                >
                  Post a Task
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              ) : (
                <Link
                  href="/tasks"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#108A00] text-white font-bold rounded-full hover:bg-[#14A800] transition-all hover:scale-105 shadow-xl shadow-green-950/20"
                >
                  Browse Tasks
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              )}
            </motion.div>
          </div>

          {/* 4. SEAMLESS INFINITE TRACK ROW CAROUSEL */}
          <div className="relative w-full py-12 my-8 overflow-hidden">
            {/* Fading left & right horizontal edge covers */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none" />

            <motion.div
              ref={containerRef}
              style={{ x }}
              className="flex gap-6 items-center cursor-grab active:cursor-grabbing"
              whileHover={{ animationPlayState: "paused" }}
              onMouseEnter={() => {
                const controls = animate(x, x.get(), { duration: 0 });
                controls.stop();
              }}
              onMouseLeave={() => {
                animate(x, -1200, {
                  ease: "linear",
                  duration: 35,
                  repeat: Infinity,
                  repeatType: "loop",
                });
              }}
            >
              {duplicatedImages.map((image, index) => {
                const waveOffset = image.offset;
                const rotation = image.rotation;

                return (
                  <motion.div
                    key={`${image.id}-${index}`}
                    className={`relative flex-shrink-0 w-64 rounded-3xl overflow-hidden shadow-2xl group ${image.height}`}
                    style={{
                      transform: `translateY(${waveOffset}px) rotate(${rotation}deg)`,
                      backgroundColor: "#F4EFEA",
                    }}
                    whileHover={{
                      scale: 1.08,
                      zIndex: 20,
                      transition: { duration: 0.3 },
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Glassmorphic floating meta overlay card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 20,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6"
                    >
                      <div className="text-white">
                        <p className="text-sm font-medium opacity-80">
                          Featured
                        </p>
                        <h3 className="text-xl font-semibold">{image.title}</h3>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default HeroSection;
