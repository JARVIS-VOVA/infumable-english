import USER from './constants'

export default {
  createRequest: payload => ({
    type: USER.CREATE_REQUEST,
    payload,
    meta: {
      thunk: true
    }
  }),

  createSuccess: (payload, meta) => ({
    type: USER.CREATE_SUCCESS,
    payload,
    meta
  }),

  createFailure: (error, meta) => ({
    type: USER.CREATE_FAILURE,
    error,
    meta
  }),
}
