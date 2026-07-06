const { requireRole } = require("@/lib/core/session");

export const metadata = {
  title: "Skillswap Dashboard Freelancer",
  description: "Freelance micro-task marketplace",
};

const FreelancerLayout = async ({ children }) => {
    await requireRole("freelancer");
  return children;
};

export default FreelancerLayout;
