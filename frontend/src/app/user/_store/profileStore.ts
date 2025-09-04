import { create } from "zustand";

interface ProfileState {
  isProfileComplete: boolean;
  setProfileComplete: (status: boolean) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  isProfileComplete: false, // default false
  setProfileComplete: (status) => set({ isProfileComplete: status }),
}));
