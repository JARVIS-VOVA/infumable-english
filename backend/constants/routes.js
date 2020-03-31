const { PREFIX_API_V1 } = process.env

const ROUTES = {
  USERS: PREFIX_API_V1 + '/users',
  CURRENT_USER: PREFIX_API_V1 + '/current_user',
  SESSIONS: PREFIX_API_V1 + '/sessions',
}

module.exports = ROUTES
