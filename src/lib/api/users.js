import { headers } from "next/headers";
import { auth } from "../auth";
import { serverFetch } from "../core/server";

export const getUsersList = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return users;
};

export const getFreelancerDashboardStats = (email) => {
  return serverFetch(
    `api/freelancer/dashboard-stats?email=${encodeURIComponent(email)}`
  );
};
