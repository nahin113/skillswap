import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/browseFreelancers/:id", "/tasks/:id"],
};
