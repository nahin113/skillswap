"use client";

import React, { useState } from "react";
import {
  Save,
  User,
  Image,
  DollarSign,
  Award,
  FileText,
  X,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";
import { updateFreelancer } from "@/lib/actions/users";

const SUGGESTED_SKILLS = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "Data Science",
  "UI UX Design",
];

export default function EditProfileForm({ initialUser }) {
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(initialUser);
  // 🔮 Your Dynamic Interactive Skill States
  const [skills, setSkills] = useState(initialUser.skills || []);
  const [skillInput, setSkillInput] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData(e.currentTarget);
    const updatedFields = Object.fromEntries(formData);

    if (updatedFields.rate) {
      updatedFields.rate = Number(updatedFields.rate);
    }

    const updatedPayload = {
      ...user,
      ...updatedFields,
      skills,
    };
    const res = await updateFreelancer(user._id, updatedPayload);
    console.log(res);
    if (res.acknowledged) {
      setUser(updatedPayload);
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#E6DDD4] rounded-2xl p-6 shadow-sm space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-zinc-400" /> Full Name
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder={user.name}
            className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-zinc-400" /> Avatar Image URL
          </label>
          <input
            name="image"
            type="url"
            required
            placeholder={user.image}
            className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-zinc-400" /> Hourly Rate
            (USD / hr)
          </label>
          <input
            name="rate"
            type="number"
            min="1"
            required
            placeholder={user.rate}
            className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-bold"
          />
        </div>

        {/* Dynamic Skill Stack Selector Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#1C1E1B]" /> Professional Skills
            Inventory
          </label>

          <div className="space-y-2">
            {/* Skill Badge Render Dock */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2  bg-zinc-50 rounded-xl border border-[#E6DDD4]">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2.5 py-1  bg-zinc-50 border border-[#E6DDD4] rounded-lg text-xs font-medium text-[#1C1E1B]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-zinc-400 hover:text-red-400 transition-colors ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="relative">
              <input
                type="text"
                placeholder="Add Your Skills Here"
                className="w-full  bg-zinc-50 text-[#1C1E1B] placeholder-zinc-600 rounded-xl p-3 border border-[#E6DDD4] focus:border-[#4E654C] focus:outline-none text-sm pr-12"
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
                className="absolute right-2 top-2 p-1.5  bg-zinc-50 hover:bg-[#4E654C] text-[#1C1E1B] rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Autocomplete Suggestion Flyout Panel */}
              {filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1  bg-zinc-50 border border-[#E6DDD4] rounded-xl shadow-xl z-30 max-h-40 overflow-y-auto divide-y divide-[#E6DDD4]">
                  {filteredSuggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddSkill(suggestion)}
                      className="w-full text-left px-4 py-2 text-xs text-[#1C1E1B] hover:bg-[#4E654C]/20 hover:text-black transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#1C1E1B] uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-zinc-400" /> Professional
          Biography
        </label>
        <textarea
          name="bio"
          required
          rows={4}
          placeholder={user.bio}
          className="w-full text-sm bg-zinc-50 border border-[#E6DDD4] rounded-xl px-4 py-2.5 text-[#1C1E1B] focus:outline-none focus:border-[#4E654C] focus:bg-white font-medium resize-none leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-[#E6DDD4]">
        <button
          type="submit"
          disabled={updating}
          className="px-5 py-2.5 text-xs font-bold text-white bg-[#4E654C] hover:bg-[#3d503b] rounded-xl transition-all inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {updating ? (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
