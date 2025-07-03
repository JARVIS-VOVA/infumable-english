import TERM from './constants'

export default {
  fetchRequest: () => ({ type: TERM.FETCH_REQUEST }),
  fetchSuccess: payload => ({ type: TERM.FETCH_SUCCESS, payload }),
  fetchFailed: () => ({ type: TERM.FETCH_FAILED }),

  createSuccess: payload => ({ type: TERM.CREATE_SUCCESS, payload }),
  updateSuccess: payload => ({ type: TERM.UPDATE_SUCCESS, payload }),
  deleteSuccess: payload => ({ type: TERM.DELETE_SUCCESS, payload }),
}
