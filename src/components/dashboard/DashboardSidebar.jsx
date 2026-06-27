import { getUserSession } from "@/lib/core/session";
import {
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Bookmark,
  FileText,
  CreditCard,
} from "@gravity-ui/icons";
import { Building, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileNavWrapper from "./MobileNavWrapper"; // 🛠️ Import our clean trigger file

export async function DashboardSidebar() {
  const user = await getUserSession();

  const freelancerNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const clientNavLinks = [
    { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
    {
      icon: Bookmark,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },
    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Users, href: "/dashboard/admin/users", label: "Users" },
    { icon: Building, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navLinksMap = {
    client: clientNavLinks,
    freelancer: freelancerNavLinks,
    admin: adminNavLinks,
  };

  const currentRole = user?.accountType || "client";
  const navItems = navLinksMap[currentRole];

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        <div className="px-3 py-1 flex items-center gap-3 border-b border-[#E6DDD4] pb-5">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#1C1E1B] border border-[#323632]/20 flex-shrink-0">
            <Image
              src={
                user?.image ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
              }
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-black text-[#1C1E1B] truncate">
              {user?.name || "User"}
            </h4>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#4E654C] block mt-0.5 bg-[#4E654C]/10 px-1.5 py-0.5 rounded w-max">
              {currentRole}
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-zinc-600 transition-all hover:bg-[#4E654C]/10 hover:text-[#4E654C] group"
              href={item.href}
            >
              <item.icon className="size-5 text-zinc-400 group-hover:text-[#4E654C] transition-colors" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* 🖥️ DESKTOP VIEW: Pure CSS sidebar alignment, no position sticky traps */}
      <aside className="hidden w-64 shrink-0 border-r border-[#E6DDD4] bg-white p-5 lg:block shadow-sm">
        {navContent}
      </aside>

      {/* 📱 MOBILE VIEW: Passes the nav contents into a Client State handler to fix freeze bugs */}
      <MobileNavWrapper>{navContent}</MobileNavWrapper>
    </>
  );
}
