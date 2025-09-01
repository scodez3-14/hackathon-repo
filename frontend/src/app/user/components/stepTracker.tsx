"use client";

import { useStepStore } from "../profile/_store/stepStore";
import { motion } from "framer-motion";

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
  const totalSteps = stepLabels.length;

  return (
    <div className="w-full flex justify-center py-6">
      <div className="relative w-full max-w-5xl">
        {/* Background Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 rounded"></div>

        {/* Green Progress Line (flex width based) */}
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
              <div key={idx} className="flex flex-col items-center">
                {/* Step Circle */}
                <motion.div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${bgColor}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stepNumber}
                </motion.div>

                {/* Step Label */}
                <span className="mt-2 text-sm text-center">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
