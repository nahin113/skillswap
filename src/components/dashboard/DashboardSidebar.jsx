import { getUserSession } from "@/lib/core/session";
import Image from "next/image";
import MobileNavWrapper from "./MobileNavWrapper";
import DashboardNavLinks from "./DashboardNavLinks";

export async function DashboardSidebar() {
  const user = await getUserSession();
  const currentRole = user?.accountType || "client";

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

        {/* ONLY PASS THE PLAIN STRING ROLE ACCROSS THE BOUNDARY */}
        <DashboardNavLinks role={currentRole} />
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-[#E6DDD4] bg-white p-5 lg:block shadow-sm">
        {navContent}
      </aside>

      <MobileNavWrapper>{navContent}</MobileNavWrapper>
    </>
  );
}
