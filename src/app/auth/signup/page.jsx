"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  UserCircle,
  BriefcaseBusiness,
} from "lucide-react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageUrl: "",
    password: "",
    confirmPassword: "",
    role: "Client", // Default choice
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // STRICT REQUIREMENT CHECK: Password constraints
  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass))
      return "Password must contain at least one capital letter.";
    if (!/[a-z]/.test(pass))
      return "Password must contain at least one lowercase letter.";
    return null;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Vetted DB Schema matching payload rules
    const registrationPayload = {
      name: formData.name,
      email: formData.email,
      image: formData.imageUrl || null,
      role: formData.role, // Form Registration explicitly respects the custom selection box toggle
      skills: [],
      bio: "",
      isBlocked: false,
      password: formData.password,
    };

    console.log(
      "Submitting to Better Auth Form Register Handler:",
      registrationPayload
    );
    // TODO: await auth.signUp.email(registrationPayload)
  };

  // STRICT REQUIREMENT CHECK: Google Sign-in enforces Client assignment
  const handleGoogleSignIn = () => {
    console.log(
      "Triggering Google OAuth: This route forces user profile creation rule -> Role: Client"
    );
    // TODO: await auth.signIn.social({ provider: "google", options: { data: { role: "Client" } } })
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
            Create
            <br />
            Account.
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
                type="text"
                required
                placeholder="Full Name"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1">
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1">
              <input
                type="url"
                placeholder="Profile Image URL"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>

            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1 flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm pr-8"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
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

            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1">
              <input
                type="password"
                required
                placeholder="Confirm Password"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            {/* BOX-TYPE ROLE SELECTION SWITCHES */}
            <div className="space-y-3 pt-3">
              <h4 className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">
                I want to sign up as a:
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "Client" })}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.role === "Client"
                      ? "bg-[#4E654C] border-[#4E654C] text-[#F4EFEA]"
                      : "bg-[#252825] border-[#323632] text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  <UserCircle className="w-6 h-6 mb-2" />
                  <span className="text-xs font-bold">Client</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: "Freelancer" })
                  }
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.role === "Freelancer"
                      ? "bg-[#4E654C] border-[#4E654C] text-[#F4EFEA]"
                      : "bg-[#252825] border-[#323632] text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  <BriefcaseBusiness className="w-6 h-6 mb-2" />
                  <span className="text-xs font-bold">Freelancer</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start space-x-3 text-xs text-zinc-400 select-none cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 rounded accent-[#4E654C] border-zinc-600 bg-transparent"
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F4EFEA] text-[#1C1E1B] hover:bg-[#E6DDD4] font-bold py-3.5 px-4 rounded-xl text-sm transition-colors duration-200 mt-2"
            >
              Sign Up
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-4.38z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-[#F4EFEA] font-bold hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
