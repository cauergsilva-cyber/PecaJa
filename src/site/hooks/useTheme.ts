import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'claro' | 'escuro';

const THEME_STORAGE_KEY = 'manutencao.tema';

const readInitialTheme = (): ThemeMode => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'claro' || stored === 'escuro') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'escuro');
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'escuro' ? 'claro' : 'escuro'));
  }, []);

  return { theme, toggleTheme };
};
