import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeModeContext, THEME_MODES } from 'src/features/shared/contexts/ThemeModeContext'
import type { ThemeMode } from 'src/features/shared/contexts/ThemeModeContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
})

type AppProvidersProps = {
  children: React.ReactNode;
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Try to get from local storage or system preference, defaulting to dark as before
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null
    if (savedMode && Object.values(THEME_MODES).includes(savedMode)) {
      return savedMode
    }
    return THEME_MODES.default
  })

  const toggleThemeMode = () => {
    setThemeMode((prev) => {
      const newMode = prev === THEME_MODES.light ? THEME_MODES.dark : THEME_MODES.light
      localStorage.setItem('themeMode', newMode)
      return newMode
    })
  }

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(themeMode)
  }, [themeMode])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeContext.Provider value={{ themeMode, toggleThemeMode }}>
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0a0a0c] dark:text-slate-50 transition-colors duration-300">
          <Toaster position="top-right" />
          {children}
        </div>
      </ThemeModeContext.Provider>
    </QueryClientProvider>
  )
}
