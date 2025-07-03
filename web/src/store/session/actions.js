import SESSION from './constants'

export default {
  createRequest: () => ({ type: SESSION.CREATE_REQUEST }),
  createSuccess: () => ({ type: SESSION.CREATE_SUCCESS }),
  createFailed: () => ({ type: SESSION.CREATE_FAILED }),

  deleteRequest: () => ({ type: SESSION.DELETE_REQUEST }),
  deleteSuccess: () => ({ type: SESSION.DELETE_SUCCESS }),
  deleteFailed: () => ({ type: SESSION.DELETE_FAILED }),
}
