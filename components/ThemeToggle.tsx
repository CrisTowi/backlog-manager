'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg sm:rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all shadow-sm hover:shadow-md touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center w-14 h-14 sm:w-auto sm:h-auto rounded-full sm:rounded-lg"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-6 h-6 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}
