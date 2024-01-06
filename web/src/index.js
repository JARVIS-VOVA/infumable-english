import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Toaster } from 'react-hot-toast'
import { CookiesProvider } from 'react-cookie'

import { getTheme, THEME_MODES } from 'src/theme'
import { ThemeModeContext } from 'src/contexts'
import store from 'src/store/config'

import reportWebVitals from './reportWebVitals'
import App from './App'

const ContextAndThemeProviders = ({ children }) => {
  const [themeMode, setThemeMode] = React.useState(THEME_MODES.default)
  const toggleThemeMode = () => setThemeMode(themeMode === THEME_MODES.light ? THEME_MODES.dark : THEME_MODES.light)

  const theme = React.useMemo(() => getTheme(themeMode), [themeMode])

  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

const ContextProviders = ({ children }) => (
  <ContextAndThemeProviders>
    {children}
  </ContextAndThemeProviders>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Toaster />
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <ContextProviders>
        <CssBaseline enableColorScheme />
        <Provider store={store}>
          <App />
        </Provider>
      </ContextProviders>
    </CookiesProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
