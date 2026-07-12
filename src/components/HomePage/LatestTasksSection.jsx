"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  FolderOpen,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Target,
  Layout,
  BrainCircuit,
  Database,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllTasks } from "@/lib/api/tasks";
import TopSkillsSection from "./TopSkillsSection";

const LatestTasksSection = () => {
  const [leftTasks, setLeftTasks] = useState([]);
  const [rightTasks, setRightTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const allTasks = await getAllTasks();

        // Safely segment your incoming backend task arrays
        const firstThree = (allTasks || []).slice(0, 3);
        const secondThree = (allTasks || []).slice(3, 6);

        setLeftTasks(firstThree);
        setRightTasks(secondThree);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const allTasks = [...leftTasks, ...rightTasks];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No Limit";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Maps live category text strings safely to Lucide icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Web Development":
        return Layout;
      case "Data Science":
        return Database;
      case "Machine Learning":
        return BrainCircuit;
      case "UI UX Design":
        return Target;
      default:
        return Briefcase;
    }
  };

  const getStatusColor = (status) => {
    const normalize = status?.toLowerCase() || "open";
    if (normalize === "open") return "bg-green-100 text-green-700 font-bold";
    return "bg-zinc-100 text-zinc-600 font-bold";
  };

  const TaskCard = ({ task, delay }) => {
    const IconComponent = getCategoryIcon(task.category);
    const taskId = task._id?.$oid || task._id;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="group bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 border border-[#E6DDD4]/50 hover:border-[#D4CCC4]"
      >
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Dynamic Icon Wrapper */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1C1E1B]/5 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C1E1B]" />
          </div>

          {/* Content Structure */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#1C1E1B] truncate">
                {task.title}
              </h4>
              <span
                className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full capitalize ${getStatusColor(
                  task.status
                )} flex-shrink-0 whitespace-nowrap`}
              >
                {task.status || "open"}
              </span>
            </div>

            <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 truncate font-medium">
              {task.client_email}
            </p>

            <div className="flex items-center flex-wrap gap-1.5 sm:gap-3 mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-[#5A5E5A] font-semibold">
              <span className="flex items-center gap-1">
                <FolderOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-400" />
                {task.category || "General Requirement"}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[#4E654C]">
                <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                {formatCurrency(task.budget)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-400" />
                {formatDate(task.deadline)}
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-100 flex justify-end">
              <Link
                href={`/tasks/${taskId}`}
                className="text-[10px] uppercase font-bold tracking-wider text-[#1C1E1B] flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity"
              >
                View Task{" "}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="w-full py-24 bg-[#F4EFEA] flex justify-center items-center text-zinc-400 font-medium text-sm">
        Loading latest active opportunities...
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#F4EFEA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1C1E1B] mb-2 sm:mb-3 tracking-tight">
            Featured Tasks
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-medium">
            Discover the latest open tasks from your database collection
          </p>
        </motion.div>

        <TopSkillsSection/>

        {/* Mobile Layout (< 768px) */}
        <div className="block lg:hidden space-y-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-full max-w-[300px] h-[200px] sm:max-w-[400px] sm:h-[300px] mx-auto">
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=center"
                  alt="Team collaboration at work"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1E1B]/90 via-[#1C1E1B]/40 to-[#1C1E1B]/10" />
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                  <div className="text-center text-[#F4EFEA]">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F4EFEA]/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-[#F4EFEA]/10">
                      <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold drop-shadow-lg">
                      Live Tasks
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F4EFEA]/80 font-medium">
                      Available Now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {allTasks.map((task, index) => (
            <TaskCard
              key={task._id?.$oid || task._id}
              task={task}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Tablet Layout (768px - 1024px) */}
        <div className="hidden md:block lg:hidden">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              {leftTasks.map((task, index) => (
                <TaskCard
                  key={task._id?.$oid || task._id}
                  task={task}
                  delay={index * 0.1}
                />
              ))}
            </div>
            <div className="space-y-4">
              {rightTasks.map((task, index) => (
                <TaskCard
                  key={task._id?.$oid || task._id}
                  task={task}
                  delay={index * 0.1 + 0.3}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout (≥ 1024px) */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6 items-center">
          <div className="lg:col-span-2 space-y-4">
            {leftTasks.map((task, index) => (
              <TaskCard
                key={task._id?.$oid || task._id}
                task={task}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="relative w-96 h-96 xl:w-[400px] xl:h-[400px]">
              <div className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=center"
                  alt="Team collaboration at work"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1E1B]/90 via-[#1C1E1B]/40 to-[#1C1E1B]/10" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center text-[#F4EFEA]">
                    <div className="w-16 h-16 bg-[#F4EFEA]/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border border-[#F4EFEA]/10">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black drop-shadow-lg">
                      Live Board
                    </h3>
                    <p className="text-sm text-[#F4EFEA]/80 font-medium drop-shadow-lg">
                      Active Projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {rightTasks.map((task, index) => (
              <TaskCard
                key={task._id?.$oid || task._id}
                task={task}
                delay={index * 0.1 + 0.3}
              />
            ))}
          </div>
        </div>

        {/* View All Redirection Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#1C1E1B] text-[#F4EFEA] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#108A00] transition-all hover:scale-105 shadow-sm"
          >
            View All Tasks
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTasksSection;
