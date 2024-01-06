import { createTheme } from '@mui/material/styles'
import { red, grey, deepOrange, common } from '@mui/material/colors'
import darkScrollbar from '@mui/material/darkScrollbar'

const LIGHT_THEME_MODE = 'light'
const DARK_THEME_MODE = 'dark'

export const THEME_MODES = {
  default: DARK_THEME_MODE,
  light: LIGHT_THEME_MODE,
  dark: DARK_THEME_MODE,
}

const baseTheme = {
  spacing: 8,
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: (themeParam) => ({
    //     body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
    //   }),
    // },
  },
}

const basePalette = {
  ...common,
}

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: THEME_MODES.light,
    ...basePalette,
    // primary: {
    //   light: deepOrange[300],
    //   main: deepOrange[500],
    //   dark: deepOrange[900],
    //   contrastText: deepOrange[100],
    // },
    // secondary: {
    //   light: '#ff7961',
    //   main: '#f44336',
    //   dark: '#ba000d',
    //   contrastText: '#000',
    // },
    // error: {
    //   main: red.A400,
    // },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: THEME_MODES.dark,
    ...basePalette,
    primary: {
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[900],
      contrastText: deepOrange[100],
    },
    secondary: {
      light: grey[200],
      main: grey[300],
      dark: grey[400],
      contrastText: grey[500],
    },
    error: {
      main: red.A400,
    },
  },
});

export const getTheme = (mode = THEME_MODES.default) => {
  return mode === THEME_MODES.light ? lightTheme : darkTheme
}
