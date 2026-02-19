import React from 'react'

export const THEME_MODES = {
  light: 'light',
  dark: 'dark',
  default: 'dark',
} as const

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

type ThemeModeContextType = {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
};

export const ThemeModeContext = React.createContext<ThemeModeContextType>({
  themeMode: THEME_MODES.default,
  toggleThemeMode: () => { },
})
