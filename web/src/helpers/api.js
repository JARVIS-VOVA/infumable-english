import requestManager from './requestManager'

// TODO: Move to .env
const PREFIX_API_V1 = '/api/v1'

export default {
  Session: {
    create: params => requestManager.post(PREFIX_API_V1 + '/sessions', params),
    show: () => requestManager.get(PREFIX_API_V1 + '/sessions'),
    destroy: () => requestManager.delete(PREFIX_API_V1 + '/sessions'),
  },

  CurrentUser: {
    show: () => requestManager.get(PREFIX_API_V1 + '/current_user'),
  },

  User: {
    create: params => requestManager.post(PREFIX_API_V1 + '/users', params),
    // show: (id) => requestManager.get(PREFIX_API_V1 + '/users?id=${id}'), // for show should add ?=  , params
  },
}
