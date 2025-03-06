import { User } from "@/types/user.types";
import { create } from "zustand";

interface UserStore {
    user: Partial<User> | null
    setUser: (user: Partial<User>) => void
    resetUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    resetUser: () => set({ user: null })
}));
