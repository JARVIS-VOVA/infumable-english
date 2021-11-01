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
    show: () => requestManager.get(PREFIX_API_V1 + '/users'), // for show should add ?=  , params
  },

  // TODO: Need move to User.show and change it on project (use User.show instead CurrentUser.show). I'm not sure
  CurrentUser: {
    show: () => requestManager.get(PREFIX_API_V1 + '/users'),
  },
}
