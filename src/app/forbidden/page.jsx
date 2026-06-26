"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldX, Home } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <main className="w-full min-h-screen relative flex items-center justify-center p-4 font-sans">
      <Image
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2560&q=80"
        alt="Background"
        fill
        className="object-cover -z-10 brightness-[0.3]"
        priority
      />

      <div className="w-full max-w-md bg-[#252825] rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#323632] text-center">
        {/* Visual Header */}
        <div className="bg-[#4E654C] p-8 pb-12 rounded-bl-[4rem] relative flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-[#F4EFEA]/10 rounded-full flex items-center justify-center mb-4">
            <ShieldX className="w-8 h-8 text-[#F4EFEA]" />
          </div>
          <h1 className="text-4xl font-black text-[#F4EFEA] tracking-tight leading-tight">
            403
            <br />
            Forbidden.
          </h1>
        </div>

        {/* Content & Directives */}
        <div className="p-8 space-y-6">
          <p className="text-sm text-zinc-400 leading-relaxed">
            Access denied. Your current profile role does not hold permissions
            to look inside this system zone directory.
          </p>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="w-full bg-[#F4EFEA] text-[#1C1E1B] hover:bg-[#E6DDD4] font-bold py-3.5 px-4 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="text-xs text-zinc-500">
            Think this is an error? Contact system administration.
          </div>
        </div>
      </div>
    </main>
  );
}
