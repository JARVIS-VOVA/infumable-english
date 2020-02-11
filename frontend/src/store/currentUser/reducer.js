import CURRENT_USER from './constants'

const initialState = {
  item: {},
  isGetting: false,
}

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case CURRENT_USER.GET_REQUEST:
      return { ...state, isGetting: true }

    case CURRENT_USER.GET_SUCCESS:
      return { ...state, isGetting: false, item: payload }

    case CURRENT_USER.GET_FAILURE:
      return { ...state, isGetting: false }


    default:
      return state
  }
}
