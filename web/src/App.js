import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import _ from 'lodash'
import { Box, CircularProgress } from '@mui/material'

import ROUTES from 'src/constants/routes'
import NotFound from 'src/components/pages/NotFound'
import Word from 'src/components/pages/Word'
import Welcome from 'src/components/pages/Welcome'
import SignIn from 'src/components/pages/SignIn'
import SignUp from 'src/components/pages/SignUp'
import Police from 'src/components/pages/Police'
import NotImplemented from 'src/components/pages/NotImplemented'

import { loaderActions, currentUserActions } from 'src/store/actions'
import Api from 'src/helpers/api'

export const AUTHENTICATED_COOKIE_KEY = 'authenticated'

const baseRouters = [
  {
    path: ROUTES.notFound,
    element: <NotFound />,
  }, {
    path: '*',
    element: <NotFound />,
  }, {
    path: ROUTES.police,
    element: <Police />,
  }, {
    path: ROUTES.root,
    element: <Welcome />,
  }, {
    path: ROUTES.welcome,
    element: <Welcome />,
  }
]

const publicRouters = createBrowserRouter([
  ...baseRouters,
  {
    path: ROUTES.signIn,
    element: <SignIn />,
  }, {
    path: ROUTES.signUp,
    element: <SignUp />,
  },
])

const privateRouters = createBrowserRouter([
  ...baseRouters,
  {
    path: ROUTES.words,
    element: <Word />,
  },
  {
    path: ROUTES.addWords,
    element: <NotImplemented />
  },
  {
    path: ROUTES.importWords,
    element: <NotImplemented />
  },
  {
    path: ROUTES.tags,
    element: <NotImplemented />
  },
])

const App = () => {
  const dispatch = useDispatch()
  const [cookies, _setCookie, removeCookie] = useCookies()
  const currentUser = useSelector(state => state.currentUser.item)
  const isCurrentUserGetting = useSelector(state => state.currentUser.isGetting)
  const [isSessionGetting, setIsSessionGetting] = React.useState(false)

  const getSession = async () => {
    try {
      setIsSessionGetting(true)
      dispatch(loaderActions.changeStatus({ status: true }))
      await Api.Session.show()
      dispatch(currentUserActions.getRequest())
      dispatch(loaderActions.changeStatus({ status: false }))
      setIsSessionGetting(false)
    } catch (error) {
      dispatch(loaderActions.changeStatus({ status: false }))
      setIsSessionGetting(false)
      removeCookie(AUTHENTICATED_COOKIE_KEY)
    }
  }

  const isAuthenticatedCookie = cookies[AUTHENTICATED_COOKIE_KEY]

  React.useEffect(() => {
    getSession()
  }, [])

  if (isCurrentUserGetting || isSessionGetting) {
    return (
      <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  // import PrivateRouter from 'src/helpers/privateRoute'
  // import PublicRouter from 'src/helpers/publicRoute'

  if (currentUser.id) {
    return <RouterProvider router={privateRouters} />
  }

  if (!isAuthenticatedCookie) {
    return <RouterProvider router={publicRouters} />
  }
}

export default App
