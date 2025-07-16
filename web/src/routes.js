import React from 'react'

import ROUTES from 'src/constants/routes'

import Welcome from 'src/components/pages/Welcome'
import Terms from 'src/components/pages/Terms'
import AddTerms from 'src/components/pages/AddTerms'

const NotFoundLazy = React.lazy(() => import('src/components/pages/NotFound'))
const PoliceLazy = React.lazy(() => import('src/components/pages/Police'))
const SignInLazy = React.lazy(() => import('src/components/pages/SignIn'))
const SignUpLazy = React.lazy(() => import('src/components/pages/SignUp'))
const TagsLazy = React.lazy(() => import('src/components/pages/Tags'))
const NotImplementedLazy = React.lazy(() => import('src/components/pages/NotImplemented'))

// NOTE: Base routes
export const baseRoutes = [
  { path: '*', element: <NotFoundLazy /> },
  { path: ROUTES.notFound, element: <NotFoundLazy /> },
  { path: ROUTES.police, element: <PoliceLazy /> },
  { path: ROUTES.root, element: <Welcome /> },
  { path: ROUTES.welcome, element: <Welcome /> }
]

// NOTE: Private routes
export const privateRoutes = [
  { path: ROUTES.terms, element: <Terms /> },
  { path: ROUTES.addTerms, element: <AddTerms /> },
  { path: ROUTES.importTerms, element: <NotImplementedLazy /> },
  { path: ROUTES.tags, element: <TagsLazy /> }
]

// NOTE: Public routes
export const publicRoutes = [
  { path: ROUTES.signIn, element: <SignInLazy /> },
  { path: ROUTES.signUp, element: <SignUpLazy /> }
]
