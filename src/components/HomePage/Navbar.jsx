"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.accountType;

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  const isActive = (path) => pathname === path;

  return (
    <header className="w-full bg-[#F4EFEA] border-b border-[#E6DDD4] z-50 sticky top-0 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* LEFT: Public Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 shrink-0">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors ${
                isActive("/")
                  ? "text-[#4E654C]"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tasks"
              className={`text-sm font-semibold transition-colors ${
                isActive("/tasks")
                  ? "text-[#4E654C]"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Browse Tasks
            </Link>
            <Link
              href="/browseFreelancers"
              className={`text-sm font-semibold transition-colors ${
                isActive("/browseFreelancers")
                  ? "text-[#4E654C]"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Browse Freelancers
            </Link>
          </nav>

          {/* CENTER: Identity Logo */}
          <div className="flex justify-start md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link href="/" className="flex items-center">
              <span className="text-[#1C1E1B] font-black text-xl tracking-tight uppercase">
                SkillSwap
              </span>
            </Link>
          </div>

          {/* RIGHT: User Action Blocks */}
          <div className="hidden md:flex items-center justify-end space-x-4 lg:space-x-6 min-w-0">
            {user && (
              <>
                <Link
                  href={`/dashboard/${role}`}
                  className={`text-sm font-semibold transition-colors shrink-0 ${
                    isActive(`/dashboard/${role}`)
                      ? "text-[#4E654C]"
                      : "text-[#5A5E5A] hover:text-[#1C1E1B]"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/myProfile"
                  className={`text-sm font-semibold transition-colors shrink-0 ${
                    isActive("/myProfile")
                      ? "text-[#4E654C]"
                      : "text-[#5A5E5A] hover:text-[#1C1E1B]"
                  }`}
                >
                  Profile
                </Link>

                {/* Profile Widget Container */}
                <div className="flex items-center gap-2 border-l border-[#E6DDD4] pl-4 max-w-[180px] lg:max-w-[240px]">
                  <Avatar
                    className="border-2 border-[#4E654C] bg-[#1E1611] text-[#F7F4EF] shrink-0 w-8 h-8 lg:w-9 lg:h-9"
                    size="sm"
                  >
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name?.charAt(0)}
                      src={user?.image}
                    />
                    <Avatar.Fallback className="bg-[#1E1611] text-[#F7F4EF] font-bold text-xs">
                      {user?.name?.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="hidden lg:block text-left min-w-0">
                    <h4 className="text-[11px] font-bold text-[#1C1E1B] truncate">
                      {user?.email}
                    </h4>
                    <p className="text-[10px] text-zinc-400 capitalize font-semibold tracking-wide">
                      {user?.accountType}
                    </p>
                  </div>
                </div>
              </>
            )}

            {!user ? (
              <div className="flex items-center space-x-4 shrink-0">
                <Link
                  href="/auth/signin"
                  className="text-sm font-semibold text-[#5A5E5A] hover:text-[#1C1E1B] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#1C1E1B] text-[#F4EFEA] hover:bg-[#4E654C] text-sm font-bold rounded-full transition-all duration-200"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-[#1C1E1B] text-[#1C1E1B] hover:bg-[#1C1E1B] hover:text-[#F4EFEA] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 shrink-0"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger Trigger Toggle Button */}
          <div className="flex md:hidden justify-end ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-[#1C1E1B] bg-[#EBF0EC] border border-[#D4DCCE] focus:outline-none"
            >
              {!isOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
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
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
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

      {/* Mobile Menu Drawer Overlay Links */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E6DDD4] bg-[#F4EFEA] px-6 py-5 space-y-4 shadow-inner">
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-[#E6DDD4]">
              <Avatar
                className="border-2 border-[#4E654C] bg-[#1E1611] text-[#F7F4EF]"
                size="md"
              >
                <Avatar.Image referrerPolicy="no-referrer" src={user?.image} />
                <Avatar.Fallback className="font-bold">
                  {user?.name?.charAt(0)}
                </Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#1C1E1B] truncate">
                  {user?.email}
                </h4>
                <p className="text-xs text-zinc-400 font-semibold capitalize tracking-wider">
                  {user?.accountType}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2.5">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-bold py-1 ${
                isActive("/") ? "text-[#4E654C]" : "text-[#5A5E5A]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tasks"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-bold py-1 ${
                isActive("/tasks") ? "text-[#4E654C]" : "text-[#5A5E5A]"
              }`}
            >
              Browse Tasks
            </Link>
            <Link
              href="/browseFreelancers"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-bold py-1 ${
                isActive("/browseFreelancers")
                  ? "text-[#4E654C]"
                  : "text-[#5A5E5A]"
              }`}
            >
              Browse Freelancers
            </Link>

            {user && (
              <>
                <div className="h-[1px] bg-[#E6DDD4] my-2" />
                <Link
                  href={`/dashboard/${role}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-bold py-1 ${
                    isActive(`/dashboard/${role}`)
                      ? "text-[#4E654C]"
                      : "text-[#5A5E5A]"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/myProfile"
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-bold py-1 ${
                    isActive("/myProfile") ? "text-[#4E654C]" : "text-[#5A5E5A]"
                  }`}
                >
                  Profile
                </Link>
              </>
            )}
          </div>

          <div className="pt-4 border-t border-[#E6DDD4] flex flex-col space-y-3">
            {!user ? (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-center text-[#5A5E5A] py-2 hover:text-[#1C1E1B]"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-between px-5 py-3 bg-[#1C1E1B] text-[#F4EFEA] text-sm font-bold rounded-full"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="w-full text-center px-5 py-3 border border-[#1C1E1B] text-[#1C1E1B] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1C1E1B] hover:text-[#F4EFEA] transition-colors"
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
