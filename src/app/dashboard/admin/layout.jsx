const { requireRole } = require("@/lib/core/session");
export const metadata = {
  title: "Skillswap Dashboard Admin",
  description: "Freelance micro-task marketplace",
};
const AdminLayout = async ({ children }) => {
  await requireRole("admin");
  return children;
};

export default AdminLayout;
