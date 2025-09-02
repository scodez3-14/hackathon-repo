import { create } from "zustand";

type StepState = {
  currentStep: number;
  totalSteps: number;
  stepStatus: Record<number, "pending" | "completed" | "error">;
  setStep: (step: number) => void;
  markCompleted: (step: number) => void;
  markError: (step: number) => void;
};

export const useStepStore = create<StepState>((set) => ({
  currentStep: 2,
  totalSteps: 6, // isko static mat rakho → UI file se sync karenge
  stepStatus: {},
  setStep: (step) => set({ currentStep: step }),
  markCompleted: (step) =>
    set((state) => ({
      stepStatus: { ...state.stepStatus, [step]: "completed" },
    })),
  markError: (step) =>
    set((state) => ({
      stepStatus: { ...state.stepStatus, [step]: "error" },
    })),
}));
