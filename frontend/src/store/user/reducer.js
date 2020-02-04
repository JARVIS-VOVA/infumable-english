import {
  RESOURCE_CREATE_REQUEST, RESOURCE_CREATE_SUCCESS, RESOURCE_CREATE_FAILURE
} from './constants'

const initialState = {
  isCreating: false
}

export default (state = initialState, { type }) => {
  switch (type) {
    case RESOURCE_CREATE_REQUEST:
      return { ...state, isCreating: true }

    case RESOURCE_CREATE_SUCCESS:
      return { ...state, isCreating: false }

    case RESOURCE_CREATE_FAILURE:
      return { ...state, isCreating: false }

    default:
      return state
  }
}
