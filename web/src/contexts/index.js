import { createContext } from 'react'

import { THEME_MODES } from 'src/theme'

export const ThemeModeContext = createContext({
  themeMode: THEME_MODES.default,
  toggleThemeMode: () => {},
})
