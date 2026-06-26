"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // MOCK AUTH STATE: Change to preview true/false for authenticated routes
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const isActive = (path) => pathname === path;

  return (
    <header className="w-full bg-[#F4EFEA] border-b border-[#E6DDD4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Grid Container matching the image structure */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-20">
          {/* COLUMN 1: LEFT SIDE - Clean Public Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-[#4E654C]"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tasks"
              className={`text-sm font-medium transition-colors ${
                isActive("/tasks")
                  ? "text-[#4E654C]"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Browse Tasks
            </Link>
            <Link
              href="/browseFreelancers"
              className={`text-sm font-medium transition-colors ${
                isActive("/freelancers")
                  ? "text-[#4E654C]"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Browse Freelancers
            </Link>
          </nav>

          {/* COLUMN 2: CENTER - Brand Logo Placement */}
          <div className="flex md:justify-center justify-start">
            <Link href="/" className="flex items-center space-x-2.5">
              <span className="text-[#1C1E1B] font-bold text-xl tracking-tight font-sans">
                SkillSwap
              </span>
            </Link>
          </div>

          {/* COLUMN 3: RIGHT SIDE - Private Navs & "Get Started" Arrow CTA */}
          <div className="hidden md:flex items-center justify-end space-x-6">
            {/* Conditional Private Links rendered as clean inline elements */}
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "text-[#4E654C]"
                      : "text-[#5A5E5A] hover:text-[#1C1E1B]"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/profile")
                      ? "text-[#4E654C]"
                      : "text-[#5A5E5A] hover:text-[#1C1E1B]"
                  }`}
                >
                  Profile
                </Link>
                <Button className="bg-transparent min-w-0 w-auto h-auto p-0 px-2 rounded-full cursor-pointer transition-transform outline-hidden">
                  <Avatar
                    className="border-2 border-[#4E654C] bg-[#1E1611] text-[#F7F4EF]"
                    size="md"
                  >
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name?.charAt(0)}
                      src={user?.image}
                    />
                    <Avatar.Fallback className="bg-[#1E1611] text-[#F7F4EF] font-bold">
                      {user?.name?.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="text-left text-[#4E654C]">
                    <h4>{user?.email}</h4>
                    <p>{user?.accountType}</p>
                  </div>
                </Button>
              </>
            )}

            {!user ? (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-[#5A5E5A] hover:text-[#1C1E1B] transition-colors"
                >
                  Login
                </Link>
                {/* Rounded XL CTA with Arrow Element matching reference */}
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#1C1E1B] text-[#F4EFEA] hover:bg-[#4E654C] text-sm font-medium rounded-full transition-all duration-200"
                >
                  <span>Get Started</span>
                  <ArrowRight />
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center space-x-2 px-5 py-2.5 border border-[#1C1E1B] text-[#1C1E1B] hover:bg-[#1C1E1B] hover:text-[#F4EFEA] text-sm font-medium rounded-xl transition-all duration-200"
              >
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburguer Block - Right align on responsive views */}
          <div className="flex md:hidden justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-[#1C1E1B] bg-[#EBF0EC] border border-[#D4DCCE] focus:outline-none"
            >
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E6DDD4] bg-[#F4EFEA] px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-[#5A5E5A] py-1"
          >
            Home
          </Link>
          <Link
            href="/tasks"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-[#5A5E5A] py-1"
          >
            Browse Tasks
          </Link>
          <Link
            href="/browseFreelancers"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-[#5A5E5A] py-1"
          >
            Browse Freelancers
          </Link>

          {user && (
            <>
              <div className="h-[1px] bg-[#E6DDD4] my-2" />
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-[#5A5E5A] py-1"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-[#5A5E5A] py-1"
              >
                Profile
              </Link>
            </>
          )}

          <div className="pt-4 border-t border-[#E6DDD4] flex flex-col space-y-3">
            {!user ? (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-center text-[#5A5E5A] py-2"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-between pl-5 pr-2 py-2 bg-[#1C1E1B] text-[#F4EFEA] text-sm font-semibold rounded-xl"
                >
                  <span>Get Started</span>
                  <div className="w-8 h-8 rounded-full bg-[#F4EFEA] flex items-center justify-center">
                    <ArrowRight />
                  </div>
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="w-full text-center px-5 py-2.5 border border-[#1C1E1B] text-[#1C1E1B] text-sm font-medium rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
