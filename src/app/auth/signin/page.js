"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // STRICT REQUIREMENT CHECK: Role-based destination routing
  const handleRouteRedirect = (role) => {
    if (role === "freelancer" || role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/"); // Clients go to standard Home path routing
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Authenticating profile credentials through Better Auth:", {
      email,
      password,
    });

    const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
        rememberMe: true,
      });
    // handleRouteRedirect(response.user.role);

    // Placeholder mockup assuming verified Client login success
    handleRouteRedirect("client");
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider : "google"
    })
  };

  return (
    <main className="w-full min-h-screen relative flex items-center justify-center p-4 font-sans">
      <Image
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2560&q=80"
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
      />

      <div className="w-full max-w-md bg-[#252825] rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#323632]">
        <div className="bg-[#F4EFEA] p-8 pb-12 rounded-bl-[4rem] relative">
          <Link
            href="/"
            className="inline-flex items-center text-[#1C1E1B] hover:opacity-70 transition-opacity mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-4xl font-black text-[#1C1E1B] tracking-tight leading-tight">
            Welcome
            <br />
            Back!
          </h1>
        </div>

        <div className="p-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1">
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1 flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm pr-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 text-zinc-500 hover:text-[#F4EFEA]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-end text-xs pt-1">
              <Link
                href="/forgot-password"
                className="text-zinc-400 hover:text-[#F4EFEA] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F4EFEA] text-[#1C1E1B] hover:bg-[#E6DDD4] font-bold py-3.5 px-4 rounded-xl text-sm transition-colors duration-200 mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="space-y-4">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-zinc-700"></div>
              <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase tracking-wider font-bold">
                or
              </span>
              <div className="flex-grow border-t border-zinc-700"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full border-2 border-zinc-600 text-[#F4EFEA] hover:bg-zinc-800 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <FcGoogle/>
              <span>Sign In with Google</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-zinc-400">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#F4EFEA] font-bold hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
