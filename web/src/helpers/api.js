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
}
