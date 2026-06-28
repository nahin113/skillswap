const { requireRole } = require("@/lib/core/session");

const AdminLayout = async ({ children }) => {
  await requireRole("admin");
  return children;
};

export default AdminLayout;
