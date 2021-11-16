import { UserAction, UserState, UserActionTypes } from '.'

const initialState: UserState = {
  user: undefined,
  loading: false,
  message: null,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.CREATE_USER:
      return { ...state, loading: true }
    case UserActionTypes.CREATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload }
    case UserActionTypes.CREATE_USER_ERROR:
      return { ...state, loading: false, message: action.payload }

    default:
      return state
  }
}
