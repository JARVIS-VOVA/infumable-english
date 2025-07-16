import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

import { useCurrentUser, useSession } from 'src/hooks'
import { loaderActions, currentUserActions } from 'src/store/actions'
import { baseRoutes, privateRoutes, publicRoutes } from 'src/routes'

const FullPageLoader = () => (
  <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <CircularProgress />
  </Box>
)

const App = () => {
  const dispatch = useDispatch()

  const { getSession, isAuthenticated, isSessionGetting } = useSession()
  const { getCurrentUser, isCurrentUserGetting, resetCurrentUser } = useCurrentUser()

  const routes = React.useMemo(() => (
    isAuthenticated
      ? [...baseRoutes, ...privateRoutes]
      : [...baseRoutes, ...publicRoutes]
  ), [isAuthenticated])

  const router = React.useMemo(() => createBrowserRouter(routes), [routes])

  const isLoading = isCurrentUserGetting || isSessionGetting || isAuthenticated === undefined

  React.useEffect(() => {
    getSession()
  }, [])

  React.useEffect(() => {
    if (isAuthenticated === undefined) {
      return
    } else if (isAuthenticated) {
      getCurrentUser()
    } else {
      resetCurrentUser()
    }
  }, [isAuthenticated])

  React.useEffect(() => {
    dispatch(loaderActions.changeStatus({ status: isLoading }))
    return () => dispatch(loaderActions.changeStatus({ status: false }))
  }, [isLoading])

  if (isLoading) {
    return (
      <FullPageLoader />
    )
  }

  return (
    <Suspense fallback={<FullPageLoader />}>
      <ErrorBoundary fallback={<div>⚠️ Something went wrong</div>}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App
