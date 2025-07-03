import requestManager from './requestManager'

const PREFIX_API_V1 = '/api/v1'

export default {
  Session: {
    create: params => requestManager.post(PREFIX_API_V1 + '/sessions', params),
    show: () => requestManager.get(PREFIX_API_V1 + '/sessions'),
    delete: () => requestManager.delete(PREFIX_API_V1 + '/sessions'),
  },

  CurrentUser: {
    show: () => requestManager.get(PREFIX_API_V1 + '/current_user'),
  },

  User: {
    create: params => requestManager.post(PREFIX_API_V1 + '/users', params),
    // show: (id) => requestManager.get(PREFIX_API_V1 + '/users?id=${id}'), // for show should add ?=  , params
  },

  Terms: {
    fetch: () => requestManager.get(PREFIX_API_V1 + '/terms'),
    create: params => requestManager.post(PREFIX_API_V1 + '/terms', params),
    update: params => requestManager.patch(PREFIX_API_V1 + '/terms/' + params.id, params),
    delete: params => requestManager.delete(PREFIX_API_V1 + '/terms/' + params.id),
  },

  Tags: {
    fetch: () => requestManager.get(PREFIX_API_V1 + '/tags'),
    create: params => requestManager.post(PREFIX_API_V1 + '/tags', params),
    update: params => requestManager.patch(PREFIX_API_V1 + '/tags/' + params.id, params),
    delete: params => requestManager.delete(PREFIX_API_V1 + '/tags/' + params.id),
  }
}
