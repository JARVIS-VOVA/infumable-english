import requestManager from './requestManager'

// TODO: Move to .env
const PREFIX_API_V1 = '/api/v1'

export default {
  Session: {
    create: params => requestManager.post(PREFIX_API_V1 + '/sessions', params),
    destroy: () => requestManager.delete(PREFIX_API_V1 + '/sessions')
  },

  User: {
    create: params => requestManager.post(PREFIX_API_V1 + '/users', params),
  },

  CurrentUser: {
    show: () => requestManager.get(PREFIX_API_V1 + '/current_user'),
  },
}
