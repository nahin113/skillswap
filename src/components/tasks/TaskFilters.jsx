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
    <div className="flex flex-col gap-4 bg-zinc-900/50 p-6 rounded-[24px] border border-zinc-800/80 max-w-7xl mx-auto mb-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* 1. Search Text Field - Span 5 columns */}
        <div className="md:col-span-5">
          <TextField className="w-full">
            <span className="text-sm font-medium text-zinc-400 block mb-2">
              Search Tasks
            </span>
            <InputGroup className="bg-zinc-800 border-zinc-700 focus-within:border-emerald-500 rounded-xl transition-all">
              <InputGroup.Prefix className="pl-3 text-zinc-500">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Title, description or keywords..."
                className="bg-transparent text-white placeholder-zinc-500 text-sm py-2.5 px-3 outline-none w-full"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* 2. Category Select Filter - Span 4 columns (Widened slightly for layout balance) */}
        <div className="md:col-span-4">
          <span className="text-sm font-medium text-zinc-400 block mb-2">
            Category
          </span>
          <Select
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
              <Select.Value>
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
              <ListBox className="p-1">
                <ListBox.Item
                  id="all"
                  className="text-zinc-200 hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                >
                  <span>All Categories</span>
                </ListBox.Item>

                <ListBox.Item
                  id="Web Development"
                  className="text-zinc-200 hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                >
                  <span>Web & Systems Development</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Data Science"
                  className="text-zinc-200 hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                >
                  <span>Data Science & Analytics</span>
                </ListBox.Item>
                <ListBox.Item
                  id="UI UX Design"
                  className="text-zinc-200 hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                >
                  <span>UI / UX Product Design</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Machine Learning"
                  className="text-zinc-200 hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
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
