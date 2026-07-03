"use client";

import React from "react";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function TaskFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-[24px] border border-[#E6DDD4] max-w-7xl mx-auto mb-10 px-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* 1. Search Text Field - Span 5 columns */}
        <div className="md:col-span-5">
          <TextField className="w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">
              Search Tasks
            </span>
            <InputGroup className="bg-white border-[#E6DDD4] focus-within:border-[#4E654C] rounded-xl transition-all shadow-sm">
              <InputGroup.Prefix className="pl-3 text-zinc-400">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Title, description or keywords..."
                className="bg-transparent text-[#1C1E1B] placeholder-zinc-400 font-medium text-sm py-2.5 px-3 outline-none w-full"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* 2. Category Select Filter - Span 4 columns */}
        <div className="md:col-span-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">
            Category
          </span>
          <Select
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-white text-[#1C1E1B] border border-[#E6DDD4] hover:border-[#4E654C]/60 rounded-xl py-2.5 px-4 text-sm font-medium transition-all shadow-sm">
              <Select.Value>
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </Select.Indicator>
            </Select.Trigger>

            {/* Popover Selection Box List */}
            <Select.Popover className="bg-white border border-[#E6DDD4] rounded-xl shadow-lg mt-1 overflow-hidden z-50">
              <ListBox className="p-1">
                <ListBox.Item
                  id="all"
                  className="text-zinc-700 hover:bg-[#F4EFEA] hover:text-[#4E654C] font-semibold rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors"
                >
                  <span>All Categories</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Web Development"
                  className="text-zinc-700 hover:bg-[#F4EFEA] hover:text-[#4E654C] font-semibold rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors"
                >
                  <span>Web & Systems Development</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Data Science"
                  className="text-zinc-700 hover:bg-[#F4EFEA] hover:text-[#4E654C] font-semibold rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors"
                >
                  <span>Data Science & Analytics</span>
                </ListBox.Item>
                <ListBox.Item
                  id="UI UX Design"
                  className="text-zinc-700 hover:bg-[#F4EFEA] hover:text-[#4E654C] font-semibold rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors"
                >
                  <span>UI / UX Product Design</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Machine Learning"
                  className="text-zinc-700 hover:bg-[#F4EFEA] hover:text-[#4E654C] font-semibold rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors"
                >
                  <span>AI & Machine Learning Engineering</span>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    </div>
  );
}
