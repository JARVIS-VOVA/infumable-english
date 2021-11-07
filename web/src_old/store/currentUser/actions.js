import CURRENT_USER from './constants'

export default {
  getRequest: () => ({
    type: CURRENT_USER.GET_REQUEST,
    meta: {
      thunk: true
    }
  }),

  getSuccess: (payload, meta) => ({
    type: CURRENT_USER.GET_SUCCESS,
    payload,
    meta
  }),

  getFailure: (error, meta) => ({
    type: CURRENT_USER.GET_FAILURE,
    // error,
    error: true,
    meta
  }),
}
