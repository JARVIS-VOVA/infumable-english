const ROUTES = {
  root: '/',
  welcome: '/welcome',
  policy: '/policy',

  terms: '/terms',
  sources: '/sources',
  sourcePractice: (id: number | string) => `/sources/${id}/practice`,
  mySources: '/sources/my',
  publicSources: '/sources/public',
  settings: '/settings',
  addTerms: '/terms/add',
  importTerms: '/terms/import',

  signUp: '/signup',
  signIn: '/login',

  notFound: '/not-found',
} as const

export default ROUTES

export const OUTSIDE_ROUTES = {
  urlGitHubRepository: 'https://github.com/JARVIS-VOVA/infumable-english',
} as const
