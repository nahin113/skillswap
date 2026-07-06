"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";
import { redirect } from "next/navigation";

export const updateUserStatus = async (userId, status) => {
  try {
    const requestHeaders = await headers();
    let result;

    if (status) {
      // 🛡️ Call Better Auth Ban Endpoint
      result = await auth.api.banUser({
        body: {
          userId: userId,
          banReason: "Suspended by Administrator", 
        },
        headers: requestHeaders,
      });
    } else {
      // 🔓 Call Better Auth Unban Endpoint
      result = await auth.api.unbanUser({
        body: { userId: userId },
        headers: requestHeaders,
      });
    }

    // Revalidate the Next.js router cache for this page
    revalidatePath("/dashboard/admin/manageUsers");

    return { success: true, data: result };
  } catch (error) {
    // 🚨 Log the actual error to your terminal console to see what went wrong
    console.error("Better Auth Admin Action Failed:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
};

export const updateFreelancer = async (id, data) => {
  const result = serverMutation(`api/user/${id}`, data, "PATCH");
  revalidatePath("/dashboard/freelancer/editProfile");
  redirect("/myProfile")
  return result;
};
