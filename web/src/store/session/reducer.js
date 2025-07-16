import SESSION from './constants'

const initialState = {
  item: {
    authenticated: undefined,
  },
  isCreating: false,
  isGetting: false,
  isDeleting: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSION.CREATE_REQUEST:
      return { ...state, isCreating: true }

    case SESSION.CREATE_SUCCESS:
      return { ...state, isCreating: false, item: { authenticated: true } }

    case SESSION.CREATE_FAILED:
      return { ...state, isCreating: false }


    case SESSION.GET_REQUEST:
      return { ...state, isGetting: true }

    case SESSION.GET_SUCCESS:
      return { ...state, isGetting: false, item: payload }

    case SESSION.GET_FAILED:
      return { ...state, isGetting: false }


    case SESSION.DELETE_REQUEST:
      return { ...state, isDeleting: true }

    case SESSION.DELETE_SUCCESS:
      return { ...state, isDeleting: false, item: { authenticated: false } }

    case SESSION.DELETE_FAILED:
      return { ...state, isDeleting: false }

    default:
      return state
  }
}
