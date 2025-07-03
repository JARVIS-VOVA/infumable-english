import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

import ROUTES from 'src/constants/routes'
import NotFound from 'src/components/pages/NotFound'
import Term from 'src/components/pages/Terms'
import Welcome from 'src/components/pages/Welcome'
import SignIn from 'src/components/pages/SignIn'
import SignUp from 'src/components/pages/SignUp'
import Police from 'src/components/pages/Police'
import Tags from 'src/components/pages/Tags'
import NotImplemented from 'src/components/pages/NotImplemented'
import AddTerms from 'src/components/pages/AddTerms'

import { loaderActions, currentUserActions } from 'src/store/actions'
import Api from 'src/helpers/api'

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
    path: ROUTES.terms,
    element: <Term />,
  },
  {
    path: ROUTES.addTerms,
    element: <AddTerms />
  },
  {
    path: ROUTES.importTerms,
    element: <NotImplemented />
  },
  {
    path: ROUTES.tags,
    element: <Tags />
  },
])

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser.item)
  const isCurrentUserGetting = useSelector(state => state.currentUser.isGetting)
  const [isAuthGot, setIsAuthGot] = React.useState(false)

  const getSession = async () => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      await Api.Session.show()
      dispatch(currentUserActions.getRequest())
      dispatch(loaderActions.changeStatus({ status: false }))
      setIsAuthGot(true)
    } catch (error) {
      dispatch(loaderActions.changeStatus({ status: false }))
      setIsAuthGot(true)
    }
  }

  React.useEffect(() => {
    getSession()
  }, [])

  if (isCurrentUserGetting || !isAuthGot) {
    return (
      <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  // import PrivateRouter from 'src/helpers/privateRoute'
  // import PublicRouter from 'src/helpers/publicRoute'

  if (currentUser) {
    return <RouterProvider router={privateRouters} />
  }

  return <RouterProvider router={publicRouters} />
}

export default App
