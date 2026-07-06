"use server";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";
import { dataFetch } from "./server";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // if(session?.user?.banned) return null
  const userId = session?.user?.id;
  return dataFetch(`api/updatedUser/${userId}`);
};

export const getUserToken = async () => {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  return tokenData?.token || null;
};

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) redirect("/auth/signin");
  if (user?.accountType !== role) redirect("/unauthorized");
  return user;
};
