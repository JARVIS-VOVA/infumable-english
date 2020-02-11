import USER from './constants'

const initialState = {
  isCreating: false
}

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case USER.CREATE_REQUEST:
      return { ...state, isCreating: true }

    case USER.CREATE_SUCCESS:
      return { ...state, isCreating: false }

    case USER.CREATE_FAILURE:
      return { ...state, isCreating: false }


    default:
      return state
  }
}
