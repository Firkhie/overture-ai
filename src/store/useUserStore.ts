import { create } from "zustand";

interface UserStore {
  userName: string;
  setUserName: (name: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userName: "",
  setUserName: (name) => set({ userName: name }),
}));

export default useUserStore;
