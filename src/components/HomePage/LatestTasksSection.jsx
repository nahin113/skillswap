'use client'
import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  User,
  FolderOpen,
  Clock,
  ArrowRight,
  TrendingUp,
  Target,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LatestTasksSection = () => {
  // Raw data - replace with your database fetch later
  const leftTasks = [
    {
      id: 1,
      title: "Brand Identity Design",
      client: "NovaTech Solutions",
      category: "Design & Branding",
      budget: 8500,
      dueDate: "2026-07-15",
      status: "In Progress",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "E-Commerce Website Dev",
      client: "GreenLeaf Organics",
      category: "Web Development",
      budget: 12500,
      dueDate: "2026-07-28",
      status: "Open",
      icon: Target,
    },
    {
      id: 3,
      title: "Social Media Campaign",
      client: "FitnessFirst App",
      category: "Marketing",
      budget: 4200,
      dueDate: "2026-08-05",
      status: "Open",
      icon: Briefcase,
    },
  ];

  const rightTasks = [
    {
      id: 4,
      title: "Mobile App UI/UX Redesign",
      client: "HealthTrack Medical",
      category: "UI/UX Design",
      budget: 9800,
      dueDate: "2026-08-12",
      status: "In Review",
      icon: TrendingUp,
    },
    {
      id: 5,
      title: "Content Marketing Strategy",
      client: "EcoWave Sustainability",
      category: "Content Creation",
      budget: 3600,
      dueDate: "2026-07-22",
      status: "Open",
      icon: Target,
    },
    {
      id: 6,
      title: "CRM System Integration",
      client: "SalesForce Solutions",
      category: "Development",
      budget: 15000,
      dueDate: "2026-08-20",
      status: "Open",
      icon: Briefcase,
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status) => {
    const colors = {
      Open: "bg-green-100 text-green-700",
      "In Progress": "bg-blue-100 text-blue-700",
      "In Review": "bg-yellow-100 text-yellow-700",
      Completed: "bg-gray-100 text-gray-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const TaskCard = ({ task, delay }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-[#E6DDD4]/50 hover:border-[#D4CCC4]"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-[#1C1E1B]/5 flex items-center justify-center flex-shrink-0 mt-1">
          <task.icon className="w-5 h-5 text-[#1C1E1B]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-[#1C1E1B] truncate">
              {task.title}
            </h4>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                task.status
              )} flex-shrink-0`}
            >
              {task.status}
            </span>
          </div>

          <p className="text-xs text-[#5A5E5A] mt-0.5">{task.client}</p>

          <div className="flex items-center gap-3 mt-2 text-xs text-[#5A5E5A]">
            <span className="flex items-center gap-1">
              <FolderOpen className="w-3 h-3" />
              {task.category}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {formatCurrency(task.budget)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 lg:py-24 bg-[#F4EFEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block text-sm font-medium text-[#5A5E5A] bg-white/50 px-4 py-1.5 rounded-full mb-3">
            Latest Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1E1B] mb-3">
            Featured Tasks
          </h2>
          <p className="text-lg text-[#5A5E5A]">
            Discover the latest open tasks from your database collection
          </p>
        </motion.div>

        {/* Split Layout: Left Cards | Center Image | Right Cards */}
        <div className="relative grid lg:grid-cols-5 gap-6 items-center">
          {/* Left Column - Tasks */}
          <div className="lg:col-span-2 space-y-4">
            {leftTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} delay={index * 0.1} />
            ))}
          </div>

          {/* Center - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="relative w-120 h-120 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px]">
              <div className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden">
                {/* Unsplash Image - Team collaboration/workspace */}
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=center"
                  alt="Team collaboration at work"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Gradient Overlay - keeps text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1E1B]/90 via-[#1C1E1B]/40 to-[#1C1E1B]/10" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center text-[#F4EFEA]">
                    <div className="w-16 h-16 bg-[#F4EFEA]/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border border-[#F4EFEA]/10">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold drop-shadow-lg">
                      Live Tasks
                    </h3>
                    <p className="text-sm text-[#F4EFEA]/80 drop-shadow-lg">
                      6 Open Positions
                    </p>
                    <div className="mt-4 flex justify-center gap-3">
                      <span className="text-xs px-3 py-1 bg-[#1C1E1B]/60 backdrop-blur-sm border border-[#F4EFEA]/10 rounded-full">
                        New
                      </span>
                      <span className="text-xs px-3 py-1 bg-[#1C1E1B]/60 backdrop-blur-sm border border-[#F4EFEA]/10 rounded-full">
                        Urgent
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-12 h-12 border border-[#F4EFEA]/15 rounded-full" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border border-[#F4EFEA]/10 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tasks */}
          <div className="lg:col-span-2 space-y-4">
            {rightTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} delay={index * 0.1 + 0.3} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1C1E1B] text-[#F4EFEA] font-medium rounded-full hover:bg-[#2A2D2A] transition-all hover:scale-105 shadow-lg"
          >
            View All Tasks
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTasksSection;