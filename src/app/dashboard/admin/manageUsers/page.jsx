import React from "react";
import { getUsersList } from "@/lib/api/users"; // 🔑 Safe to import here!
import UserTable from "./UserTable";

export default async function ManageUsersPage() {
  // Fetch users securely on the server side
  const usersResponse = await getUsersList();

  // Depending on how Better Auth shapes the response, fallback to empty array safely
  const users = usersResponse?.users || usersResponse || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-black text-[#1C1E1B]">Manage Users</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Review register entries and configure restriction matrices.
        </p>
      </div>

      {/* Pass data clean down into your client presentation layer */}
      <UserTable initialUsers={users} />
    </div>
  );
}
