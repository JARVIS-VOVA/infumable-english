import TAG from './constants'

const initialState = {
  items: [],
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TAG.FETCH_REQUEST:
      return { ...state, isFetching: true }
    case TAG.FETCH_SUCCESS:
      return { ...state, isFetching: false, items: payload }
    case TAG.FETCH_FAILED:
      return { ...state, isFetching: false }

    case TAG.CREATE_REQUEST:
      return { ...state, isCreating: true }
    case TAG.CREATE_SUCCESS:
      return { ...state, isCreating: false, items: [payload, ...state.items] }
    case TAG.CREATE_FAILED:
      return { ...state, isCreating: false }

    case TAG.UPDATE_REQUEST:
      return { ...state, isUpdating: true}
    case TAG.UPDATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        items: state.items.map(item => item.id === payload.id ? payload : item)
      }
    case TAG.UPDATE_FAILED :
      return { ...state, isUpdating: false }

    case TAG.DELETE_REQUEST:
      return { ...state, isDeleting: true }
    case TAG.DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        items: state.items.filter(item => item.id !== payload.id)
      }
    case TAG.DELETE_FAILED:
      return { ...state, isDeleting: false }

    default:
      return state
  }
}
