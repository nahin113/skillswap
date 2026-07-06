import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export const metadata = {
  title: "Skillswap Dashboard",
  description: "Freelance micro-task marketplace",
};



const DashboardLayout = ({ children }) => {
  return (
    // Applied base theme background and smooth 
    <div className="flex min-h-screen bg-[#F4EFEA] text-[#1C1E1B]">
      <DashboardSidebar />
      {/* Scrollable workspace content container */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto mt-16 lg:mt-0">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
