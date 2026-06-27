"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { X } from "lucide-react";

export default function MobileNavWrapper({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Cleanly locks and unlocks background window scrolling without breaking click mechanics
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* 📱 MOBILE NAVIGATION BAR MENU TRIGGER BUTTON */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          onPress={() => setIsOpen(true)}
          className="border border-[#E6DDD4] bg-white text-[#1C1E1B] hover:bg-[#F4EFEA] font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 text-xs transition-colors"
          variant="secondary"
        >
          <LayoutSideContentLeft className="size-4 text-[#4E654C]" />
          <span>Menu</span>
        </Button>
      </div>

      {/* 🛠️ INDESTRUCTIBLE SLIDING OVERLAY CONTAINER */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Soft Darkened Ambient Backdrop Layer */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-[#1C1E1B]/20 backdrop-blur-xs transition-opacity duration-300"
        />

        {/* Sliding Panel Content (Matches Theme Accents Perfectly) */}
        <div
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] h-full bg-[#F4EFEA] border-r border-[#E6DDD4] p-6 shadow-2xl flex flex-col transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header Controls */}
          <div className="flex items-center justify-between border-b border-[#E6DDD4] pb-4 mb-6">
            <h3 className="font-black text-xs tracking-widest uppercase text-zinc-400">
              Navigation
            </h3>

            {/* Pure native close button — impossible to lock up your webpage */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-[#1C1E1B] p-1 rounded-lg transition-colors focus:outline-none"
              aria-label="Close workspace menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Embedded Nav Links — Automatically closes drawer upon selecting a target route */}
          <div
            className="flex-1 overflow-y-auto pr-1"
            onClick={() => setIsOpen(false)}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
