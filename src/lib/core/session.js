"use server";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // if(session?.user?.banned) return null

  return session?.user || null;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token || null;
};

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) redirect("/auth/signin");
  if (user?.accountType !== role) redirect("/unauthorized");
  return user;
};
