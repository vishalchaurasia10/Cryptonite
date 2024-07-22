// store/theme.ts
import { create } from 'zustand';

type ThemeState = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
};

const useThemeStore = create<ThemeState>((set) => ({
    theme: 'light',
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        return { theme: newTheme };
    }),
    setTheme: (theme: 'light' | 'dark') => set(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        return { theme };
    }),
}));

export default useThemeStore;