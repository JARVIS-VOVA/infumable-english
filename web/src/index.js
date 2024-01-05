import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import store from 'store/configStore'
import { getTheme, THEME_MODES } from 'src/theme'
import { ThemeModeContext } from 'src/contexts'
import ROUTES from 'constants/routes'
import Logout from 'containers/Logout'
import Word from 'containers/Word'
import NotFound from 'pages/NotFound'
import Welcome from 'pages/Welcome'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import Police from 'pages/Police'

// import PrivateRouter from 'src/lib/privateRoute'
// import PublicRouter from 'src/lib/publicRoute'
// import { currentUserActions } from 'store/actions'
// import { resourceGetRequest } from 'store/session/actions'

// const App = ({ mode, setMode, toggleMode, getCurrentUser, currentUser, error, anythingWasRejected }) => {
//   // useEffect(() => {
//   //   getCurrentUser()
//   //     .then(result => {
//   //       console.log('current user present', result)
//   //     })
//   //     .catch(error => {
//   //       console.log('error', error)
//   //       console.log('SwitchRoute --', anythingWasRejected)
//   //     })
//   //     // console.log('error', error)
//   // }, [])

// const mapStateToProps = state => ({
//   currentUser: state.currentUser.item,
//   error: rejected(state, 'CURRENT_USER/GET_REQUEST'),
//   anythingWasRejected: rejected(state),
// })

const router = createBrowserRouter([
  // NOTE: PrivateRouter
  {
    path: ROUTES.words,
    element: <NotFound />,
  }, {
    path: ROUTES.logout,
    element: <Logout />,
  },
  // NOTE: PublicRouter
  {
    path: ROUTES.signIn,
    element: <SignIn />,
  },  {
    path: ROUTES.signUp,
    element: <SignUp />,
  },
  // NOTE: Base Routes
  {
    path: ROUTES.words,
    element: <Word />,
  }, {
    path: ROUTES.police,
    element: <Police />,
  }, {
    path: ROUTES.root,
    element: <Welcome />,
  }, {
    path: ROUTES.welcome,
    element: <Welcome />,
  }, {
    path: ROUTES.signIn,
    element: <SignIn />,
  }, {
    path: ROUTES.signUp,
    element: <SignUp />,
  }, {
    path: ROUTES.notFound,
    element: <NotFound />,
  }, {
    path: '*',
    element: <NotFound />,
  },
])

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

const App = () => {
  return (
    <React.StrictMode>
      <ContextProviders>
        <CssBaseline enableColorScheme />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ContextProviders>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
