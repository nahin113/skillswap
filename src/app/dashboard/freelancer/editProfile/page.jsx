import React from "react";
import EditProfileForm from "./EditProfileForm";
import { getUserSession } from "@/lib/core/session";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  // 🔌 Fetch current user data from your data engine
  const user = await getUserSession();
  // For demonstration, replacing with your target structure:
  const freelancerUser = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    image: user?.image,
    bio: user?.bio,
    rate: user?.rate,
    skills: user?.skills,
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <div className="border-b border-[#E6DDD4] pb-4">
        <h1 className="text-xl font-black text-[#1C1E1B]">
          Edit Professional Profile
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Modify your marketplace identity, fine-tune your hourly rate, and
          broadcast updated skill sets.
        </p>
      </div>

      <EditProfileForm initialUser={freelancerUser} />
    </div>
  );
}
