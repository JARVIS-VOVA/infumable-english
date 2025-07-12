import TERM from './constants'

const initialState = {
  items: undefined,
  isFetching: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // FETCH
    case TERM.FETCH_REQUEST:
      return { ...state, isFetching: true }
    case TERM.FETCH_SUCCESS:
      return { ...state, isFetching: false, items: payload }
    case TERM.FETCH_FAILED:
      return { ...state, isFetching: false }

    // CREATE
    case TERM.CREATE_SUCCESS:
      return { ...state, isCreating: false, items: [...payload, ...(state.items || [])] }

    // UPDATE
    case TERM.UPDATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        items: state.items.map(item => item.id === payload.id ? payload : item)
      }

    // DELETE
    case TERM.DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        items: state.items.filter(item => item.id !== payload.id)
      }

    default:
      return state
  }
}
