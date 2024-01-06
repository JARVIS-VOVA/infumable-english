import SESSION from './constants'

const initialState = {
  isCreating: false,
  isDeleting: false,
  item: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSION.CREATE_REQUEST:
      return { ...state, isCreating: true }

    case SESSION.CREATE_SUCCESS:
      return { ...state, isCreating: false }

    case SESSION.CREATE_FAILED:
      return { ...state, isCreating: false, item: {} }


    case SESSION.DELETE_REQUEST:
      return { ...state, isDeleting: true }

    case SESSION.DELETE_SUCCESS:
      return { ...state, isDeleting: false, item: {} }

    case SESSION.DELETE_FAILED:
      return { ...state, isDeleting: false, item: {} }

    default:
      return state
  }
}
