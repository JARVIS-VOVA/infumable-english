import CURRENT_USER from './constants'

const initialState = {
  item: undefined,
  isGetting: false,
}

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case CURRENT_USER.GET_REQUEST:
      return { ...state, isGetting: true }

    case CURRENT_USER.GET_SUCCESS:
      return { ...state, isGetting: false, item: payload }

    case CURRENT_USER.GET_FAILED: {
      return { ...state, isGetting: false, item: null }
    }

    case CURRENT_USER.RESET:
      return { ...state, item: null }

    default:
      return state
  }
}
