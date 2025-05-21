import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isGuest: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setGuestMode: (isGuest: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isGuest: false,
      isAuthenticated: false,
      setUser: user =>
        set({
          user,
          isGuest: false,
          isAuthenticated: !!user,
        }),
      setGuestMode: isGuest =>
        set({
          isGuest,
          user: null,
          isAuthenticated: isGuest,
        }),
      logout: () =>
        set({
          user: null,
          isGuest: false,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
