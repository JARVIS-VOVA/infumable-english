import {
  RESOURCE_CREATE_REQUEST, RESOURCE_CREATE_SUCCESS, RESOURCE_CREATE_FAILURE,
  RESOURCE_GET_REQUEST, RESOURCE_GET_SUCCESS, RESOURCE_GET_FAILURE,
  RESOURCE_DELETE_REQUEST, RESOURCE_DELETE_SUCCESS, RESOURCE_DELETE_FAILURE
} from './constants'

const initialState = {
  isCreating: false,
  isGetting: false,
  isDeleting: false,
  item: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RESOURCE_CREATE_REQUEST:
      return { ...state, isCreating: true }

    case RESOURCE_CREATE_SUCCESS:
      return { ...state, isCreating: false, item: payload.data }

    case RESOURCE_CREATE_FAILURE:
      return { ...state, isCreating: false }

    case RESOURCE_GET_REQUEST:
      return { ...state, isGetting: true }

    case RESOURCE_GET_SUCCESS:
      return { ...state, isGetting: false, item: payload.data }

    case RESOURCE_GET_FAILURE:
      return { ...state, isGetting: false }

    case RESOURCE_DELETE_REQUEST:
      return { ...state, isDeleting: true }

    case RESOURCE_DELETE_SUCCESS:
      return { ...state, isDeleting: false, item: {} }

    case RESOURCE_DELETE_FAILURE:
      return { ...state, isDeleting: false, item: {} }

    default:
      return state
  }
}
