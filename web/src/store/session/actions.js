import SESSION from './constants'

export default {
  createRequest: payload => ({ type: SESSION.CREATE_REQUEST, payload }),
  createSuccess: () => ({ type: SESSION.CREATE_SUCCESS }),
  createFailed: () => ({ type: SESSION.CREATE_FAILED }),

  getRequest: () => ({ type: SESSION.GET_REQUEST }),
  getSuccess: payload => ({ type: SESSION.GET_SUCCESS, payload }),
  getFailed: () => ({ type: SESSION.GET_FAILED }),

  deleteRequest: () => ({ type: SESSION.DELETE_REQUEST }),
  deleteSuccess: () => ({ type: SESSION.DELETE_SUCCESS }),
  deleteFailed: () => ({ type: SESSION.DELETE_FAILED }),
}
