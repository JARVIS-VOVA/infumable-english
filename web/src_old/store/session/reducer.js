import SESSION from './constants'

const initialState = {
  isCreating: false,
  isGetting: false,
  isDeleting: false,
  item: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSION.CREATE_REQUEST:
      return { ...state, isCreating: true }

    case SESSION.CREATE_SUCCESS:
      return { ...state, isCreating: false, item: payload }

    case SESSION.CREATE_FAILURE:
      return { ...state, isCreating: false, item: {} }


    case SESSION.DELETE_REQUEST:
      return { ...state, isDeleting: true }

    case SESSION.DELETE_SUCCESS:
      return { ...state, isDeleting: false, item: {} }

    case SESSION.DELETE_FAILURE:
      return { ...state, isDeleting: false, item: {} }

    default:
      return state
  }
}
