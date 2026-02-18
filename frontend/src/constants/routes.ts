const ROUTES = {
  root: '/',
  welcome: '/welcome',
  police: '/police',

  terms: '/terms',
  addTerms: '/terms/add',
  importTerms: '/terms/import',
  tags: '/tags',

  signUp: '/signup',
  signIn: '/login',

  notFound: '/not-found',
} as const;

export default ROUTES;

export const OUTSIDE_ROUTES = {
  urlGitHubRepository: 'https://github.com/JARVIS-VOVA/infumable-english',
} as const;
