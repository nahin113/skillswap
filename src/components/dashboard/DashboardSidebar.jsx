import { getUserSession } from "@/lib/core/session";
import {
  Bell,
  Briefcase,
  Envelope,
  Gear,
  Magnifier,
  Person,
  Bookmark,
  FileText,
  CreditCard,
  PersonGear,
} from "@gravity-ui/icons";
import { Building, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileNavWrapper from "./MobileNavWrapper"; 

export async function DashboardSidebar() {
  const user = await getUserSession();

  const freelancerNavLinks = [
    {
      icon: PersonGear,
      href: "/dashboard/freelancer",
      label: "Overview Statistics",
    },
    {
      icon: Magnifier,
      href: "/tasks",
      label: "Browse Tasks View",
    },
    {
      icon: Bell,
      href: "/dashboard/freelancer/myProposals",
      label: "My Proposals Page",
    },
    {
      icon: Briefcase,
      href: "/dashboard/freelancer/activeProjects",
      label: "Active Projects Page",
    },
    {
      icon: Envelope,
      href: "/dashboard/freelancer/myEarnings",
      label: "My Earnings Page",
    },
    {
      icon: Person,
      href: "/dashboard/freelancer/editProfile",
      label: "Edit Profile Page",
    },
  ];

  const clientNavLinks = [
    {
      icon: PersonGear,
      href: "/dashboard/client",
      label: "Overview Statistics",
    },
    {
      icon: Magnifier,
      href: "/dashboard/client/myTasks",
      label: "My Tasks View",
    },
    {
      icon: FileText,
      href: "/dashboard/client/postTasks",
      label: "Post a Task Form",
    },
    {
      icon: Gear,
      href: "/dashboard/client/manageProposals",
      label: "Manage Proposals View",
    },
  ];

  const adminNavLinks = [
    {
      icon: PersonGear,
      href: "/dashboard/admin",
      label: "Overview Statistics",
    },
    {
      icon: Users,
      href: "/dashboard/admin/manageUsers",
      label: "Manage Users Page",
    },
    {
      icon: Briefcase,
      href: "/dashboard/admin/manageTasks",
      label: "Manage Tasks Page",
    },
    {
      icon: CreditCard,
      href: "/dashboard/admin/transactionsHistory",
      label: "Transactions History View",
    },
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
                "https://thumbs.dreamstime.com/b/anonymous-man-silhouette-isolated-white-background-mysterious-anonymous-man-silhouette-isolated-white-background-perfect-355295760.jpg"
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
