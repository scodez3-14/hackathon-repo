"use client";

import { useStepStore } from "../_store/stepStore";
import { motion } from "framer-motion";
import { Cover } from "@/components/ui/cover";
import { useProfileStore } from "../_store/profileStore";

const stepLabels = [
  "Registration",
  "Profile",
  "Contact Details",
  "Education",
  "Skills & Languages",
  "Completed",
];

export default function StepTracker() {
  const { currentStep } = useStepStore();
  const { isProfileComplete } = useProfileStore();
  const totalSteps = stepLabels.length;

  return (
    <div className="w-full flex flex-col items-center py-6 px-2 sm:px-4">
      {/* 🚀 Catchy Banner */}
      {!isProfileComplete && (
        <div className="mb-6 text-center px-2">
          <Cover>
            <p className="text-sm sm:text-lg font-semibold text-red-600">
              🚀 Your profile isn’t complete yet! <br />
              <span className="text-gray-800 dark:text-white text-xs sm:text-base">
                Finish it now to unlock internship applications.
              </span>
            </p>
          </Cover>
        </div>
      )}
      <div className="relative w-full max-w-5xl">
        {/* Background Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 rounded"></div>

        {/* Green Progress Line */}
        <motion.div
          className="absolute top-5 left-0 h-1 bg-green-500 rounded"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Steps */}
        <div className="flex justify-between relative z-10">
          {stepLabels.map((label, idx) => {
            const stepNumber = idx + 1;

            let bgColor = "bg-gray-300";
            if (stepNumber < currentStep) bgColor = "bg-green-500"; // completed
            if (stepNumber === currentStep) bgColor = "bg-yellow-500"; // current

            return (
              <div
                key={idx}
                className="flex flex-col items-center flex-1 min-w-0 px-1"
              >
                {/* Step Circle */}
                <motion.div
                  className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-white font-bold ${bgColor}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stepNumber}
                </motion.div>

                {/* Step Label */}
                <span className="mt-2 text-[10px] sm:text-sm text-center truncate w-full">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
