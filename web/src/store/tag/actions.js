import TAG from './constants'

export default {
  fetchRequest: () => ({ type: TAG.FETCH_REQUEST }),
  fetchSuccess: payload => ({ type: TAG.FETCH_SUCCESS, payload }),
  fetchFailed: () => ({ type: TAG.FETCH_FAILED }),

  createRequest: () => ({ type: TAG.CREATE_REQUEST }),
  createSuccess: payload => ({ type: TAG.CREATE_SUCCESS, payload }),
  createFailed: () => ({ type: TAG.CREATE_FAILED }),

  updateRequest: () => ({ type: TAG.UPDATE_REQUEST }),
  updateSuccess: payload => ({ type: TAG.UPDATE_SUCCESS, payload }),
  updateFailed: () => ({ type: TAG.UPDATE_FAILED }),

  deleteRequest: () => ({ type: TAG.DELETE_REQUEST }),
  deleteSuccess: payload => ({ type: TAG.DELETE_SUCCESS, payload }),
  deleteFailed: () => ({ type: TAG.DELETE_FAILED }),
}
