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
  const isHome = pathname === "/";

  return (
    <header
      className={`z-50 w-full px-6  flex items-center justify-between transition-all duration-200 ${
        isHome
          ? "absolute top-0 left-0 bg-transparent"
          : "relative bg-[#F4EFEA] border-b border-[#E6DDD4]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* LEFT: Public Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 shrink-0">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors ${
                isActive("/")
                  ? "text-[#14A800]"
                  : isHome
                  ? "text-zinc-300 hover:text-white"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tasks"
              className={`text-sm font-semibold transition-colors ${
                isActive("/tasks")
                  ? "text-[#14A800]"
                  : isHome
                  ? "text-zinc-300 hover:text-white"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Browse Tasks
            </Link>
            <Link
              href="/browseFreelancers"
              className={`text-sm font-semibold transition-colors ${
                isActive("/browseFreelancers")
                  ? "text-[#14A800]"
                  : isHome
                  ? "text-zinc-300 hover:text-white"
                  : "text-[#5A5E5A] hover:text-[#1C1E1B]"
              }`}
            >
              Browse Freelancers
            </Link>
          </nav>

          {/* CENTER: Identity Logo */}
          <div className="flex justify-start md:hidden xl:flex xl:absolute xl:left-1/2 xl:-translate-x-1/2">
            <Link href="/" className="flex items-center">
              <span
                className={`font-black text-xl tracking-tight uppercase drop-shadow-sm ${
                  isHome ? "text-white" : "text-[#1C1E1B]"
                }`}
              >
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
                      ? "text-[#14A800]"
                      : isHome
                      ? "text-zinc-300 hover:text-white"
                      : "text-[#5A5E5A] hover:text-[#1C1E1B]"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/myProfile"
                  className={`text-sm font-semibold transition-colors shrink-0 ${
                    isActive("/myProfile")
                      ? "text-[#14A800]"
                      : isHome
                      ? "text-zinc-300 hover:text-white"
                      : "text-[#5A5E5A] hover:text-[#1C1E1B]"
                  }`}
                >
                  Profile
                </Link>

                {/* Profile Widget Container */}
                <div
                  className={`flex items-center gap-2 border-l pl-4 max-w-[180px] lg:max-w-[240px] ${
                    isHome ? "border-white/20" : "border-[#E6DDD4]"
                  }`}
                >
                  <Avatar
                    className="border-2 border-[#E6DDD4] bg-[#1E1611] text-[#F7F4EF] shrink-0 w-8 h-8 lg:w-9 lg:h-9"
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
                    <h4
                      className={`text-[11px] font-bold truncate ${
                        isHome ? "text-white" : "text-[#1C1E1B]"
                      }`}
                    >
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
                  className={`text-sm font-semibold transition-colors ${
                    isHome
                      ? "text-zinc-300 hover:text-white"
                      : "text-[#5A5E5A] hover:text-[#1C1E1B]"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className={`inline-flex items-center space-x-1.5 px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 shadow-md ${
                    isHome
                      ? "bg-white text-zinc-950 hover:bg-[#14A800] hover:text-white"
                      : "bg-[#1C1E1B] text-[#F4EFEA] hover:bg-[#14A800] hover:text-white"
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSignOut}
                className={`inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 shrink-0 border ${
                  isHome
                    ? "border-white text-white hover:bg-white hover:text-zinc-950"
                    : "border-[#1C1E1B] text-[#1C1E1B] hover:bg-[#1C1E1B] hover:text-[#F4EFEA]"
                }`}
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
              className={`inline-flex items-center justify-center p-2 rounded-xl border focus:outline-none ${
                isHome
                  ? "text-white bg-white/10 border-white/20 backdrop-blur-sm"
                  : "text-[#1C1E1B] bg-[#EBF0EC] border-[#D4DCCE]"
              }`}
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
        <div
          className={`md:hidden absolute top-full left-0 w-full px-6 py-5 space-y-4 shadow-xl border-t ${
            isHome
              ? "border-zinc-800 bg-zinc-950"
              : "border-[#E6DDD4] bg-[#F4EFEA]"
          }`}
        >
          {user && (
            <div
              className={`flex items-center gap-3 pb-3 border-b ${
                isHome ? "border-zinc-800" : "border-[#E6DDD4]"
              }`}
            >
              <Avatar
                className="border-2 border-[#14A800] bg-[#1E1611] text-[#F7F4EF]"
                size="md"
              >
                <Avatar.Image referrerPolicy="no-referrer" src={user?.image} />
                <Avatar.Fallback className="font-bold">
                  {user?.name?.charAt(0)}
                </Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <h4
                  className={`text-sm font-bold truncate ${
                    isHome ? "text-white" : "text-[#1C1E1B]"
                  }`}
                >
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
                isActive("/")
                  ? "text-[#14A800]"
                  : isHome
                  ? "text-zinc-300"
                  : "text-[#5A5E5A]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tasks"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-bold py-1 ${
                isActive("/tasks")
                  ? "text-[#14A800]"
                  : isHome
                  ? "text-zinc-300"
                  : "text-[#5A5E5A]"
              }`}
            >
              Browse Tasks
            </Link>
            <Link
              href="/browseFreelancers"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-bold py-1 ${
                isActive("/browseFreelancers")
                  ? "text-[#14A800]"
                  : isHome
                  ? "text-zinc-300"
                  : "text-[#5A5E5A]"
              }`}
            >
              Browse Freelancers
            </Link>

            {user && (
              <>
                <div
                  className={`h-[1px] my-2 ${
                    isHome ? "bg-zinc-800" : "bg-[#E6DDD4]"
                  }`}
                />
                <Link
                  href={`/dashboard/${role}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-bold py-1 ${
                    isActive(`/dashboard/${role}`)
                      ? "text-[#14A800]"
                      : isHome
                      ? "text-zinc-300"
                      : "text-[#5A5E5A]"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/myProfile"
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-bold py-1 ${
                    isActive("/myProfile")
                      ? "text-[#14A800]"
                      : isHome
                      ? "text-zinc-300"
                      : "text-[#5A5E5A]"
                  }`}
                >
                  Profile
                </Link>
              </>
            )}
          </div>

          <div
            className={`pt-4 border-t flex flex-col space-y-3 ${
              isHome ? "border-zinc-800" : "border-[#E6DDD4]"
            }`}
          >
            {!user ? (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold text-center py-2 ${
                    isHome
                      ? "text-zinc-300 hover:text-white"
                      : "text-[#5A5E5A] hover:text-[#1C1E1B]"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className={`inline-flex items-center justify-between px-5 py-3 text-sm font-bold rounded-full ${
                    isHome
                      ? "bg-white text-zinc-950"
                      : "bg-[#1C1E1B] text-[#F4EFEA]"
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className={`w-full text-center px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-colors border ${
                  isHome
                    ? "border-white text-white hover:bg-white hover:text-zinc-950"
                    : "border-[#1C1E1B] text-[#1C1E1B] hover:bg-[#1C1E1B] hover:text-[#F4EFEA]"
                }`}
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
