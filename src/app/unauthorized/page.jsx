"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UnauthorizedPage() {
  return (
    <main className="w-full min-h-screen relative flex items-center justify-center p-4 font-sans">
      {/* Immersive background matching your auth screens */}
      <Image
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2560&q=80"
        alt="Background"
        fill
        className="object-cover -z-10 brightness-[0.3]"
        priority
      />

      <div className="w-full max-w-md bg-[#252825] rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#323632] text-center">
        {/* Visual Header */}
        <div className="bg-[#F4EFEA] p-8 pb-12 rounded-bl-[4rem] relative flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-[#1C1E1B]" />
          </div>
          <h1 className="text-4xl font-black text-[#1C1E1B] tracking-tight leading-tight">
            401
            <br />
            Unauthorized.
          </h1>
        </div>

        {/* Content & Directives */}
        <div className="p-8 space-y-6">
          <p className="text-sm text-zinc-400 leading-relaxed">
            You need to be logged into an active account to view this secure
            portal path. Please sign up or log in below.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/"
              className="w-full border-2 border-zinc-600 text-[#F4EFEA] hover:bg-zinc-800 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
