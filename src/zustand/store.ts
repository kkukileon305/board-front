import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../interface';

interface UserStore {
  isLogin: boolean;
  token: string;
  user: User | null;
  setLogin: (loginProps: { token: string; user: User }) => void;
  setLogout: () => void;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

export const useUserStore = create(
  devtools<UserStore>(set => ({
    isLogin: false,
    token: '',
    user: null,
    setLogin: ({ token, user }) => set({ isLogin: true, token, user }),
    setLogout: () => set({ isLogin: false, token: '', user: null }),
    isModal: false,
    setIsModal: isModal => set({ isModal }),
  }))
);
