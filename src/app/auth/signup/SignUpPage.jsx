"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  UserCircle,
  BriefcaseBusiness,
  X,
  Plus,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@heroui/react";
import { toast } from "react-toastify";

const SUGGESTED_SKILLS = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX Design",
  "Figma",
  "Copywriting",
  "SEO Optimization",
  "Graphic Design",
  "Data Entry",
  "Social Media Management",
];

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  // Form & UI State
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("client");
  const [passwordError, setPasswordError] = useState("");

  // Freelancer specific state
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // Filter skills based on typing input (excluding already added ones)
  const filteredSuggestions = skillInput.trim()
    ? SUGGESTED_SKILLS.filter(
        (s) =>
          s.toLowerCase().includes(skillInput.toLowerCase()) &&
          !skills.includes(s)
      )
    : [];

  const handleAddSkill = (skill) => {
    const cleaned = skill.trim();
    if (cleaned && !skills.includes(cleaned)) {
      setSkills([...skills, cleaned]);
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, i) => i !== indexToRemove));
  };

  // Password constraints
  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass))
      return "Password must contain at least one capital letter.";
    if (!/[a-z]/.test(pass))
      return "Password must contain at least one lowercase letter.";
    return null;
  };

  // Main Submission Logic matching your original structure
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Validate Password before hitting network
    const passErr = validatePassword(user.password);
    if (passErr) {
      setPasswordError(passErr);
      setIsLoading(false);
      return;
    }
    try {
      // Connects cleanly with your authClient backend configuration
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.photoUrl,
        // Append extra payload if they choose freelancer
        accountType: user.role,
        ...(user.role === "freelancer" && {
          skills: skills,
          bio: user.bio,
          rate: user.rate,
        }),
      });

      if (error) {
        console.error("Signup error details:", error.message);
        toast.error(error.message || "Something went wrong.");
        return; // Halts workflow so false redirects don't occur
      }

      toast.success("Account created successfully!");
      router.push(redirectTo);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <main className="w-full min-h-screen relative flex items-center justify-center p-4 font-sans py-12">
      {/* Background Image Styling */}
      <Image
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2560&q=80"
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* Main Container Card adapted to new styling */}
      <div className="w-full max-w-[460px] bg-[#252825] rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#323632]">
        {/* Brand Header Styling */}
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
          {/* Sign Up Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm"
              />
            </div>

            {/* Email Field */}
            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1">
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm"
              />
            </div>

            {/* Profile Photo Field */}
            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1">
              <input
                type="url"
                name="photoUrl"
                placeholder="Profile Image URL"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="relative border-b border-zinc-600 focus-within:border-[#F4EFEA] transition-colors py-1 flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                className="w-full bg-transparent text-[#F4EFEA] placeholder-zinc-500 focus:outline-none text-sm pr-8"
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
            {passwordError && (
              <span className="text-red-400 text-xs mt-1 block font-medium">
                {passwordError}
              </span>
            )}

            {/* Role Selection Box-Types */}
            <div className="space-y-3 pt-3">
              <h4 className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">
                I want to sign up as a:
              </h4>
              <input type="hidden" name="role" value={selectedRole} />
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole("client")}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedRole === "client"
                      ? "bg-[#4E654C] border-[#4E654C] text-[#F4EFEA]"
                      : "bg-[#252825] border-[#323632] text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  <UserCircle className="w-6 h-6 mb-2" />
                  <span className="text-xs font-bold">Client</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("freelancer")}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedRole === "freelancer"
                      ? "bg-[#4E654C] border-[#4E654C] text-[#F4EFEA]"
                      : "bg-[#252825] border-[#323632] text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  <BriefcaseBusiness className="w-6 h-6 mb-2" />
                  <span className="text-xs font-bold">Freelancer</span>
                </button>
              </div>
            </div>

            {/* DYNAMIC BIO AND SKILLS CONDITIONAL WINDOW */}
            {selectedRole === "freelancer" && (
              <div className="space-y-5 pt-4 border-t border-zinc-700/60 animate-in fade-in slide-in-from-top-3 duration-300">
                {/* Professional Bio section added from new styling */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    placeholder="Tell clients about your expertise, background, and specialities..."
                    className="w-full bg-[#1C1E1B] text-[#F4EFEA] placeholder-zinc-600 rounded-xl p-3 border border-zinc-700 focus:border-[#4E654C] focus:outline-none text-sm resize-none"
                  />
                </div>

                <div className="space-y-5 pt-4 border-t border-zinc-700/60 animate-in fade-in slide-in-from-top-3 duration-300">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Rate (hourly)
                  </label>
                  <Input
                    className="w-full bg-[#1C1E1B] text-[#F4EFEA] placeholder-zinc-600 rounded-xl p-3 border border-zinc-700 focus:border-[#4E654C] focus:outline-none text-sm resize-none"
                    name="rate"
                    id="input-type-number"
                    min={0}
                    placeholder="30"
                    type="number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Skills & Expertise
                  </label>

                  {/* Skill Badge Render Dock */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 p-2 bg-[#1C1E1B] rounded-xl border border-zinc-800">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#4E654C]/20 border border-[#4E654C]/40 rounded-lg text-xs font-medium text-[#F4EFEA]"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(index)}
                            className="text-zinc-400 hover:text-red-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="relative">
                    {/* Input form combo box */}
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Type a skill (e.g., Next.js)"
                        className="w-full bg-[#1C1E1B] text-[#F4EFEA] placeholder-zinc-600 rounded-xl p-3 border border-zinc-700 focus:border-[#4E654C] focus:outline-none text-sm pr-12"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddSkill(skillInput);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkill(skillInput)}
                        className="absolute right-2 p-1.5 bg-[#4E654C] hover:bg-[#4E654C]/90 rounded-lg text-[#F4EFEA] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dropdown Predictive Autocomplete Suggestions */}
                    {filteredSuggestions.length > 0 && (
                      <div className="absolute z-30 left-0 top-full w-full bg-[#2A2E2A] border border-zinc-700 max-h-40 overflow-y-auto rounded-xl mt-1 shadow-xl divide-y divide-zinc-700/40 custom-scrollbar">
                        {filteredSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleAddSkill(suggestion)}
                            className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-[#4E654C] hover:text-[#F4EFEA] transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submission Button aligned to new styling */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F4EFEA] text-[#1C1E1B] hover:bg-[#E6DDD4] font-bold py-3.5 px-4 rounded-xl text-sm transition-colors duration-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Social Auth Separator */}
          <div className="space-y-4">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-zinc-700"></div>
              <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase tracking-wider font-bold">
                or
              </span>
              <div className="flex-grow border-t border-zinc-700"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full border-2 border-zinc-600 text-[#F4EFEA] hover:bg-zinc-800 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <FcGoogle />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link
                href={`/auth/signin`}
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
