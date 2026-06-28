const { requireRole } = require("@/lib/core/session");

const FreelancerLayout = async ({ children }) => {
    await requireRole("freelancer");
  return children;
};

export default FreelancerLayout;
