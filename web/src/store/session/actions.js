import SESSION from './constants'

export default {
  createRequest: payload => ({
    type: SESSION.CREATE_REQUEST,
    payload,
    meta: {
      thunk: true
    }
  }),

  createSuccess: (payload, meta) => ({
    type: SESSION.CREATE_SUCCESS,
    payload,
    meta
  }),

  createFailure: (payload, error, meta) => ({
    type: SESSION.CREATE_FAILURE,
    payload,
    error,
    meta
  }),


  deleteRequest: payload => ({
    type: SESSION.DELETE_REQUEST,
    payload,
    meta: {
      thunk: true
    }
  }),

  deleteSuccess: (payload, meta) => ({
    type: SESSION.DELETE_SUCCESS,
    payload,
    meta
  }),

  deleteFailure: (payload, error, meta) => ({
    type: SESSION.DELETE_FAILURE,
    payload,
    error,
    meta
  }),
}
