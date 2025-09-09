"use client";
import { useState } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Search } from "lucide-react";

type CompaniesFilterProps = {
  onFilter: (filters: { exp: string; salary: string; search: string }) => void;
};

export default function CompaniesFilter({ onFilter }: CompaniesFilterProps) {
  const [exp, setExp] = useState("");
  const [salary, setSalary] = useState("");
  const [search, setSearch] = useState("");

  const handleApply = () => {
    onFilter({ exp, salary, search });
  };

  return (
    <div className="w-full mb-10">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 backdrop-blur-md p-4 rounded-xl shadow-lg">
        {/* Search */}
        <div className="relative flex items-center flex-1 rounded-md dark:bg-neutral-900 bg-neutral-100">
          <Search className="w-5 pl-1" />
          <input
            type="text"
            placeholder=" Search by role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 pl-4 pr-6 py-2 rounded-lg 
            dark:text-white text-sm md:text-base 
            focus:outline-none transition dark:bg-neutral-900 bg-neutral-100 text-black"
          />
          <BorderBeam />
        </div>

        {/* Filters + Apply */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
            dark:bg-neutral-800 dark:text-white text-sm md:text-base 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition w-full sm:w-auto"
          >
            <option value="">All Experience</option>
            <option value="0-1 yrs">0-1 yrs</option>
            <option value="1-3 yrs">1-3 yrs</option>
            <option value="3-5 yrs">3-5 yrs</option>
            <option value="5+ yrs">5+ yrs</option>
          </select>

          <select
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
            dark:bg-neutral-800 dark:text-white text-sm md:text-base 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition w-full sm:w-auto"
          >
            <option value="">All Packages</option>
            <option value="10">₹10 LPA+</option>
            <option value="20">₹20 LPA+</option>
            <option value="30">₹30 LPA+</option>
          </select>

          <ShinyButton
            className="px-6 py-2 text-sm md:text-base font-semibold rounded-lg 
            dark:bg-neutral-900 bg-gradient-to-r text-white shadow-md 
            hover:shadow-cyan-500/30 hover:scale-105 transition w-full sm:w-auto"
            onClick={handleApply}
          >
            Apply
          </ShinyButton>
        </div>
      </div>
    </div>
  );
}
