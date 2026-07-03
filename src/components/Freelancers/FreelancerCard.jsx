import Image from "next/image";
import { Star, Briefcase, } from "lucide-react";
import Link from "next/link";

const FreelancerCard = ({ freelancer }) => {
  let skillsArray = [];
  try {
    if (freelancer.skills) {
      skillsArray =
        typeof freelancer.skills === "string"
          ? JSON.parse(freelancer.skills)
          : freelancer.skills;
    }
  } catch (e) {
    // Fallback if string is comma-separated instead of JSON object
    skillsArray = freelancer.skills.split(",").map((s) => s.trim());
  }

  return (
    <Link href={`/browseFreelancers/${freelancer._id}`}>
      <div className="bg-white border border-[#E6DDD4] h-full rounded-[2.5rem] p-7 shadow-sm group transition-all duration-300 hover:border-[#4E654C]/60 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between cursor-pointer">
        <div>
          <div className="flex items-center gap-4">
            {/* Avatar Image Wrapper Frame */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#F4EFEA] border border-[#E6DDD4] flex-shrink-0 shadow-sm">
              <Image
                src={
                  freelancer.image ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                }
                alt={freelancer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#1C1E1B] truncate">
                {freelancer.name}
              </h3>
              <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5 capitalize">
                <Briefcase className="w-3.5 h-3.5 text-[#4E654C]" />
                {freelancer.accountType || "Freelancer"}
              </p>
            </div>
          </div>

          {/* Clean Bio Statement Block */}
          <p className="text-xs text-zinc-600 mt-5 line-clamp-2 min-h-[2.5rem] bg-[#F4EFEA]/50 p-3 rounded-xl border border-[#E6DDD4]">
            {freelancer.bio || "Crafting digital experiences."}
          </p>

          {/* Skill Badging Modules */}
          {skillsArray.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {skillsArray.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-[#4E654C]/10 border border-[#4E654C]/20 rounded-lg text-[10px] font-bold text-[#4E654C]"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Meta Tracking Row */}
        <div className="mt-7 pt-4 border-t border-[#E6DDD4] flex items-center justify-between">
          <div className="flex items-center gap-1 text-zinc-500 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-[#1C1E1B]">5.0</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-bold">
              Hourly Rate
            </span>
            <span className="text-base font-black text-[#4E654C]">
              ${freelancer.rate || "0"}/hr
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FreelancerCard;
