import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Briefcase,
  Mail,
  DollarSign,
  Calendar,
  ShieldCheck,
  Sparkles,
  Globe,
  MessageSquare,
  FolderGit2,
} from "lucide-react";
import { getFreelancerDetails } from "@/lib/api/freelancers";

export default async function FreelancerDetailsPage({ params }) {
  // Await params block to safely read dynamic segments in Next.js
  const {id} = await params;
  const freelancer = await getFreelancerDetails(id);
  console.log(freelancer)

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-[#1C1E1B] flex flex-col items-center justify-center text-[#F4EFEA] gap-4">
        <p className="text-sm text-zinc-400">
          Profile directory index not found.
        </p>
        <Link
          href="/browseFreelancer"
          className="text-xs font-bold text-[#4E654C] hover:underline"
        >
          ← Back to List
        </Link>
      </div>
    );
  }

  // Parse skills safely
  let skillsArray = [];
  try {
    if (freelancer.skills) {
      skillsArray =
        typeof freelancer.skills === "string"
          ? JSON.parse(freelancer.skills)
          : freelancer.skills;
    }
  } catch (e) {
    skillsArray = freelancer.skills?.split(",").map((s) => s.trim()) || [];
  }

  console.log("skills array",skillsArray, freelancer.skills)

  return (
    <main className="min-h-screen bg-[#F4EFEA] text-[#1C1E1B] relative overflow-hidden">
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#4E654C]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#4E654C]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Global Navigation Bar */}
      <nav className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#E6DDD4] backdrop-blur-md relative z-10">
        <Link
          href="/browseFreelancers"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#1C1E1B] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Directory</span>
        </Link>
        <div className="text-xs font-semibold tracking-wider text-[#4E654C] uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-[#4E654C]/10" /> SkillSwap
          Profile Verified
        </div>
      </nav>

      {/* Two-Column Sprawling Modern Layout */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        {/* LEFT COLUMN: Floating Bio Card Block (Sticky Layout) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 self-start space-y-8">
          {/* Main Floating Identity Anchor */}
          <div className="bg-white border border-[#E6DDD4] rounded-[2.5rem] p-8 backdrop-blur-xl flex flex-col items-center text-center shadow-sm relative group">
            {/* Avatar Glow Ring */}
            <div className="absolute top-12 w-36 h-36 bg-[#4E654C]/10 rounded-full blur-xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[#4E654C]/60 p-1 bg-[#F4EFEA] mb-6 shadow-sm">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={
                    freelancer.image ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
                  }
                  alt={freelancer.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <h1 className="text-2xl font-black tracking-tight text-[#1C1E1B] flex items-center justify-center gap-1.5">
                {freelancer.name}
              </h1>
              <p className="text-sm text-zinc-500 font-medium tracking-wide">
                {freelancer.bio?.split(".")[0] || "Expert UI Developer"}
              </p>

              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-zinc-100 text-[10px] font-medium text-zinc-500 uppercase tracking-wider border border-zinc-200">
                <Globe className="w-3 h-3 text-[#4E654C]" /> Remote / Global
              </div>
            </div>

            {/* Crucial Pricing Analytics Block */}
            <div className="w-full border-t border-[#E6DDD4] mt-8 pt-6 flex justify-around items-center">
              <div className="text-center">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-widest mb-0.5">
                  Rate
                </span>
                <span className="text-xl font-black text-[#1C1E1B]">
                  From ${freelancer.rate || "0"}/hr
                </span>
              </div>
              <div className="h-8 w-px bg-[#E6DDD4]" />
              <div className="text-center">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-widest mb-0.5">
                  Rating
                </span>
                <span className="text-xl font-black text-[#1C1E1B] flex items-center gap-1 justify-center">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 5.0
                </span>
              </div>
            </div>

            {/* Interaction Call to Actions */}
            <div className="w-full space-y-3 mt-8">
              <button className="w-full bg-[#1C1E1B] text-[#F4EFEA] hover:bg-zinc-800 font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm active:scale-[0.99]">
                Hire {freelancer.name.split(" ")[0]}
              </button>
              <button className="w-full bg-[#F4EFEA] border border-[#E6DDD4] text-[#1C1E1B] hover:bg-zinc-100 font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#4E654C]" />
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sprawling Modern Details Panel Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Section 1: Detailed Profile Bio */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[#1C1E1B] tracking-tight flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#4E654C]" /> About the Expert
            </h2>
            <div className="text-sm text-zinc-600 leading-relaxed font-normal bg-white border border-[#E6DDD4] p-6 sm:p-8 rounded-[2rem] space-y-4 shadow-sm">
              <p>
                {freelancer.bio ||
                  "No long-form description profile statement generated yet."}
              </p>
              <p className="text-zinc-400 text-xs pt-2 border-t border-[#E6DDD4]">
                Whether managing deadlines or interpreting wireframe concepts,
                this expert brings dedicated architectural vision directly into
                execution parameters.
              </p>
            </div>
          </section>

          {/* Section 2: Complete Capability Tags */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[#1C1E1B] tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4E654C]" /> Verified Skills
            </h2>
            {skillsArray.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border border-[#E6DDD4] rounded-xl text-xs font-bold text-zinc-600 transition-colors hover:border-[#4E654C] hover:text-[#4E654C] cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">
                No custom credentials mapped to this directory entity.
              </p>
            )}
          </section>

          {/* Core Institutional Registry Timestamps */}
          <footer className="pt-8 border-t border-[#E6DDD4] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Contact Route: {freelancer.email}</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>
                Registered Workspace Member Since{" "}
                {new Date(freelancer.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
