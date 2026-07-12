import Image from "next/image";
import { Star, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

const FreelancerCard = ({ freelancer }) => {
  // Graceful prop loading safeguard
  if (!freelancer) return null;

  let skillsArray = [];
  try {
    if (freelancer.skills) {
      skillsArray =
        typeof freelancer.skills === "string"
          ? JSON.parse(freelancer.skills)
          : freelancer.skills;
    }
  } catch (e) {
    // Fallback if string is comma-separated instead of JSON array string
    skillsArray = freelancer.skills.split(",").map((s) => s.trim());
  }

  return (
    <Link
      href={`/browseFreelancers/${freelancer._id}`}
      className="block h-full"
    >
      <div className="group relative bg-white border border-[#E6DDD4] h-full rounded-[24px] p-7 shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden flex flex-col justify-between min-h-[380px]">
        <div>
          {/* --- TOP HEADER BLOCK: Identity & Domain Title --- */}
          <div className="flex items-center gap-4">
            {/* Round Avatar Container Frame */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#F4EFEA] border border-[#E6DDD4] shrink-0 shadow-sm">
              <Image
                src={
                  freelancer.image ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                }
                alt={freelancer.name || "Freelancer Avatar"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="space-y-0.5 overflow-hidden">
              <h3 className="text-xl font-black text-[#1C1E1B] truncate group-hover:text-[#14A800] transition-colors duration-200">
                {freelancer.name}
              </h3>
              <p className="text-xs text-zinc-500 font-semibold flex items-center gap-1.5 capitalize">
                <Briefcase className="w-3.5 h-3.5 text-[#4E654C]" />
                {freelancer.accountType || "Professional"}
              </p>
            </div>
          </div>

          {/* --- DUAL METADATA GRID (Upwork Style Integration) --- */}
          <div className="grid grid-cols-2 gap-4 my-5 py-3.5 border-y border-[#E6DDD4]/50">
            {/* Rating Track */}
            <div className="flex items-start gap-2.5">
              <div className="p-2 bg-[#F4EFEA] rounded-xl shrink-0">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <div className="text-sm font-black text-[#1C1E1B]">
                  5.0 Rating
                </div>
                <div className="text-[11px] text-zinc-500 font-medium">
                  Top Rated
                </div>
              </div>
            </div>

            {/* Price Rate Track */}
            <div className="flex items-start gap-2.5">
              <div className="p-2 bg-[#F4EFEA] rounded-xl shrink-0">
                <span className="text-xs font-black text-[#4E654C]">$</span>
              </div>
              <div>
                <div className="text-sm font-black text-[#1C1E1B]">
                  ${freelancer.rate || "0"} / hr
                </div>
                <div className="text-[11px] text-zinc-500 font-medium">
                  Starting Rate
                </div>
              </div>
            </div>
          </div>

          {/* --- CLEAN PROFESSIONAL BIO ELEMENT --- */}
          {freelancer.bio && (
            <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed mb-5">
              {freelancer.bio}
            </p>
          )}

          {/* --- HORIZONTAL SKILL PILLS --- */}
          {skillsArray.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skillsArray.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-zinc-100 border border-zinc-200/60 rounded-full text-xs font-medium text-zinc-600 capitalize"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* --- HOVER ACTION TRANSLATION COMPONENT --- */}
        <div className="h-12 relative mt-5 flex items-center">
          <div className="absolute inset-x-0 bottom-0 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.25,1,0.35,1)]">
            <div className="w-full sm:w-fit inline-flex items-center justify-center gap-2 bg-[#14A800] hover:bg-[#118F00] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm shadow-[#14A800]/10">
              View Profile
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FreelancerCard;
