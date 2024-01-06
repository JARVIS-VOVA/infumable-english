import LOADER from './constants'

const initialState = {
  status: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADER.RESOURCE_CHANGE_STATUS:
      return { ...state, status: payload.status }

    default:
      return state
  }
}
