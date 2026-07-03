"use client";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Users, CheckCircle, BarChart3 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

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

  // Duplicate for seamless scrolling
  const duplicatedImages = [...images, ...images, ...images];

  // Scrolling animation
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

  // Don't render animation on server to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4EFEA] to-[#E8E0D8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Static placeholder with same structure */}
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
    <div className="min-h-screen bg-linear-to-br from-[#F4EFEA] to-[#E8E0D8] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Content */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#1C1E1B] leading-tight"
          >
            Get your tasks done by <br className="hidden md:inline" />
            <span className="text-[#4E654C]">skilled freelancers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-[#5A5E5A] max-w-2xl mx-auto"
          >
            The seamless, micro-task freelance marketplace engineered for swift,
            verified collaborative workflows. Post a small task or browse open
            gigs to start connecting instantly with global talent.
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1E1B] text-[#F4EFEA] font-medium rounded-full hover:bg-[#2A2D2A] transition-all hover:scale-105 shadow-lg"
              >
                Post a Task
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/tasks"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1E1B] text-[#F4EFEA] font-medium rounded-full hover:bg-[#2A2D2A] transition-all hover:scale-105 shadow-lg"
              >
                Browse Tasks
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        </div>

        {/* CURVED/WAVE IMAGE CAROUSEL */}
        <div className="relative py-8">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F4EFEA] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F4EFEA] to-transparent z-10" />

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
              const controls = animate(x, -1200, {
                ease: "linear",
                duration: 35,
                repeat: Infinity,
                repeatType: "loop",
              });
            }}
          >
            {duplicatedImages.map((image, index) => {
              // Use pre-calculated values for wave pattern
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

                  {/* Overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6"
                  >
                    <div className="text-white">
                      <p className="text-sm font-medium opacity-80">Featured</p>
                      <h3 className="text-xl font-semibold">{image.title}</h3>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 w-full max-w-6xl mx-auto px-4"
        >
          {/* MAIN OUTER CONTAINER: Matches the image layout exactly by grouping 
        the features into a single continuous segmented track block 
      */}
          <div className="overflow-hidden grid grid-cols-1 md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-[#b1a69c]">
            {/* Card 1 */}
            <div className="p-8 sm:p-10 flex flex-col items-start space-y-4 hover:bg-[#E6DDD4]/20 transition-colors duration-200">
              <div className="text-center">
                <h3 className="font-bold text-lg text-[#1C1E1B] mb-2 tracking-tight">
                  Real-Time Collaboration
                </h3>
                <p className="text-sm text-[#5A5E5A] leading-relaxed">
                  Communicate seamlessly and keep everyone in sync with built-in
                  messaging, file sharing, and live updates.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 sm:p-10 flex flex-col items-start space-y-4 hover:bg-[#E6DDD4]/20 transition-colors duration-200">
              <div className="text-center">
                <h3 className="font-bold text-lg text-[#1C1E1B] mb-2 tracking-tight">
                  Task & Project Tracking
                </h3>
                <p className="text-sm text-[#5A5E5A] leading-relaxed">
                  Assign tasks, set deadlines, and visualize progress with
                  boards, lists, and timelines tailored to your team's style.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 sm:p-10 flex flex-col items-start space-y-4 hover:bg-[#E6DDD4]/20 transition-colors duration-200">
              <div className="text-center">
                <h3 className="font-bold text-lg text-[#1C1E1B] mb-2 tracking-tight">
                  Performance Insights
                </h3>
                <p className="text-sm text-[#5A5E5A] leading-relaxed">
                  Make smarter decisions with analytics that show productivity
                  trends, bottlenecks, and team workload balance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
