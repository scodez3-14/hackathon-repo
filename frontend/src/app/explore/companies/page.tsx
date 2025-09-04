"use client";
import { useState, useRef } from "react";
import { companies } from "@/app/data/companies";
import CompaniesFilter from "../components/CompaniesFilter"; // ✅ import filter component
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TailwindButton from "@/components/ui/tailwindButton";
import { Briefcase, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function CompaniesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState({ exp: "", salary: "", search: "" });
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setOpenIndex(null));

  const filteredCompanies = companies.filter((c) => {
    const matchExp = filters.exp ? c.exp === filters.exp : true;
    const matchSalary = filters.salary
      ? parseInt(c.salary.replace(/\D/g, "")) >=
        parseInt(filters.salary) * 100000
      : true;
    const matchSearch = filters.search
      ? c.role.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    return matchExp && matchSalary && matchSearch;
  });

  return (
    <div
      className="min-h-screen max-w-sc
    een mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 mb-8"
    >
      {/* ✅ Filter Component */}
      <CompaniesFilter onFilter={setFilters} />

      {/* ✅ Desktop / Tablet Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCompanies.map((company, index) => {
          const slug = company.title.toLowerCase().replace(/\s+/g, "-");
          return (
            <Card
              key={index}
              className="flex flex-col justify-between shadow-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/20"
            >
              <div className="h-1.5 w-full rounded-t-xl relative" />
              <GlowingEffect
                blur={0}
                spread={80}
                borderWidth={3}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                movementDuration={1.5}
                className="rounded-2xl"
              />
              <CardHeader className="flex flex-col items-center text-center space-y-3">
                {company.img && (
                  <Image
                    src={company.img}
                    alt={company.title}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-contain"
                  />
                )}
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                  {company.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-cyan-500" />
                  <span>{company.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-emerald-400" />
                  <span>{company.exp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-yellow-400" />
                  <span>{company.salary}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/explore/companies/${slug}`} className="w-full">
                  <TailwindButton className="w-full  py-1 hover:opacity-90">
                    Learn More
                  </TailwindButton>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* ✅ Mobile List (Expandable) */}
      <div className="block md:hidden space-y-4">
        {filteredCompanies.map((company, idx) => {
          const slug = company.title.toLowerCase().replace(/\s+/g, "-");
          return (
            <div
              key={idx}
              className={`border rounded-xl p-4 transition-all duration-300 bg-white dark:bg-neutral-900 shadow-md ${
                openIndex === idx ? "ring-2 ring-cyan-400" : ""
              }`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              ref={openIndex === idx ? ref : null}
            >
              <div className="flex items-center gap-4">
                {company.img && (
                  <Image
                    src={company.img}
                    alt={company.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">
                    {company.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {company.role}
                  </p>
                </div>
              </div>
              {openIndex === idx && (
                <div className="mt-4 space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Experience:</strong> {company.exp}
                  </p>
                  <p>
                    <strong>Salary:</strong> {company.salary}
                  </p>
                  <Link href={`/explore/companies/${slug}`} className="w-full">
                    <button className="mt-3 w-full py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white">
                      View Details
                    </button>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
