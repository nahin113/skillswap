import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  User,
  Briefcase,
  ShieldAlert,
  Star,
  Mail,
  Calendar,
  ShieldCheck,
  Settings,
  PlusCircle,
  ListFilter,
  Activity,
  LayoutDashboard,
} from "lucide-react";
import { getUserSession } from "@/lib/core/session";

export default async function MyProfilePage() {
  // 🔐 Fetch the current user session
  const user = await getUserSession();
  // Redirect to unauthorized route if no user is actively authenticated
  if (!user) {
    redirect("/unauthorized");
  }

  // Normalize structural fields from your DB (handling role overrides safely)
  const explicitRole =
    user.role === "admin" ? "admin" : user.accountType || "client";

  let skillsArray = [];
  try {
    if (user.skills) {
      skillsArray =
        typeof user.skills === "string" ? JSON.parse(user.skills) : user.skills;
    }
  } catch (e) {
    skillsArray = user.skills?.split(",").map((s) => s.trim()) || [];
  }

  return (
    <main className="min-h-screen bg-[#F4EFEA] text-[#1C1E1B] relative overflow-hidden">
      {/* Premium Theme Accent Underglow Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#4E654C]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-zinc-200/40 rounded-full blur-[150px] pointer-events-none" />

      {/* Profile Container Canvas Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        {/* LEFT COMPONENT: Common Profile Base Identity Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E6DDD4] rounded-[2.5rem] p-8 backdrop-blur-xl flex flex-col items-center text-center shadow-sm">
            {/* User Avatar Circle */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#4E654C] p-1 bg-[#F4EFEA] mb-6 shadow-md">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={
                    user.image ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
                  }
                  alt={user.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Profile Context Badging Headers */}
            <div className="space-y-2 w-full">
              <h1 className="text-2xl font-black tracking-tight text-[#1C1E1B] truncate">
                {user.name}
              </h1>

              {/* Dynamic Badges Based on Account Identity Subsets */}
              {explicitRole === "admin" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[11px] font-black text-red-600 uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" /> System Administrator
                </span>
              )}
              {explicitRole === "freelancer" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4E654C]/10 border border-[#4E654C]/30 text-[11px] font-bold text-[#4E654C] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E654C]" />{" "}
                  Verified Freelancer
                </span>
              )}
              {explicitRole === "client" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5" /> Project Client
                </span>
              )}
            </div>

            {/* General Settings Workspace Tools Row */}
            <div className="w-full border-t border-[#E6DDD4] mt-8 pt-6 space-y-3">
              <button className="w-full bg-[#F4EFEA] border border-[#E6DDD4] hover:bg-zinc-100 text-zinc-700 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2">
                <Settings className="w-4 h-4 text-[#4E654C]" />
                Edit Profile Settings
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT: Role-Dependent Dashboard Action Modules */}
        <div className="lg:col-span-8 space-y-10">
          {/* Module Block 1: Overview System Data Fields */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
              Account Registry Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E6DDD4] p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                <Mail className="w-5 h-5 text-[#4E654C]" />
                <div className="min-w-0">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">
                    Email Address
                  </span>
                  <span className="text-sm text-zinc-700 font-medium truncate block">
                    {user.email}
                  </span>
                </div>
              </div>
              <div className="bg-white border border-[#E6DDD4] p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                <Calendar className="w-5 h-5 text-[#4E654C]" />
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">
                    Workspace Term
                  </span>
                  <span className="text-sm text-zinc-700 font-medium">
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* DYNAMIC VIEWPORTS: Conditional Rendering Logic Blocks based on explicitRole */}

          {/* VIEWPORT A: FREELANCER DASHBOARD CONSOLE VIEW */}
          {explicitRole === "freelancer" && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <section className="space-y-4">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  Professional Overview
                </h2>
                <div className="bg-white border border-[#E6DDD4] p-6 rounded-[2rem] space-y-4 shadow-sm">
                  <div className="flex justify-between items-center pb-4 border-b border-[#E6DDD4]">
                    <span className="text-xs text-zinc-500">
                      Current Freelance Hourly Rate:
                    </span>
                    <span className="text-base font-black text-[#1C1E1B]">
                      ${user.rate || "0"}/hr
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block font-bold uppercase tracking-wider mb-2">
                      Bio Statement
                    </span>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {user.bio || "No profile bio written yet."}
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  My Configured Capabilities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.length > 0 ? (
                    skillsArray.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 bg-[#4E654C]/10 border border-[#4E654C]/20 rounded-xl text-xs font-bold text-[#4E654C]"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-400 italic">
                      No custom skills saved to account.
                    </p>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* VIEWPORT B: CLIENT CONSOLE PROJECTS MODULE PANEL */}
          {explicitRole === "client" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <section className="space-y-4">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  Project Procurement Operations
                </h2>
                <div className="bg-white border border-[#E6DDD4] p-8 rounded-[2rem] text-center space-y-4 flex flex-col items-center justify-center min-h-[220px] shadow-sm">
                  <Briefcase className="w-8 h-8 text-zinc-300" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-zinc-700">
                      Looking for Talent?
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Publish new project proposals or requirements directly out
                      onto the standard marketplace timeline.
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-2 bg-[#1C1E1B] text-[#F4EFEA] hover:bg-zinc-800 font-black py-2.5 px-5 rounded-xl text-xs transition-colors shadow-sm mt-2">
                    <PlusCircle className="w-4 h-4" /> Post a Project Brief
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* VIEWPORT C: MASTER SYSTEM ADMINISTRATION PLATFORM VIEW */}
          {explicitRole === "admin" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <section className="space-y-4">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  Administrative Actions Panel
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href="/admin/dashboard"
                    className="bg-white border border-[#E6DDD4] hover:border-red-400 p-6 rounded-2xl flex items-center gap-4 group transition-colors shadow-sm"
                  >
                    <LayoutDashboard className="w-5 h-5 text-red-500" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-700 group-hover:text-red-500 transition-colors">
                        Master Operations Control
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Manage roles, logs, permissions and bans.
                      </p>
                    </div>
                  </Link>
                  <div className="bg-white border border-[#E6DDD4] p-6 rounded-2xl flex items-center gap-4 shadow-sm">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-700">
                        System Monitoring Status
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Application Health Matrix: Stable
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
