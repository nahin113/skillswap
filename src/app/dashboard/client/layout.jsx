const { requireRole } = require("@/lib/core/session");

export const metadata = {
  title: "Skillswap Dashboard CLient",
  description: "Freelance micro-task marketplace",
};

const ClientLayout = async ({ children }) => {
  await requireRole("client");
  return children;
};

export default ClientLayout;
