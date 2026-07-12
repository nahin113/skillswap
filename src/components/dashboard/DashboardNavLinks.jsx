"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  Envelope,
  Gear,
  Magnifier,
  Person,
  FileText,
  CreditCard,
  PersonGear,
} from "@gravity-ui/icons";
import { Users } from "lucide-react";

export default function DashboardNavLinks({ role }) {
  const pathname = usePathname();

  // Define navigation records directly inside the client workspace environment
  const freelancerNavLinks = [
    {
      icon: PersonGear,
      href: "/dashboard/freelancer",
      label: "Overview Statistics",
    },
    { icon: Magnifier, href: "/tasks", label: "Browse Tasks View" },
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

  // Safely fallback to client if role is undefined or misconfigured
  const items = navLinksMap[role] || clientNavLinks;

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const IconComponent = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all group ${
              isActive
                ? "bg-[#14A800]/10 text-[#14A800]"
                : "text-zinc-600 hover:bg-[#4E654C]/10 hover:text-[#4E654C]"
            }`}
          >
            <IconComponent
              className={`size-5 transition-colors ${
                isActive
                  ? "text-[#14A800]"
                  : "text-zinc-400 group-hover:text-[#4E654C]"
              }`}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
