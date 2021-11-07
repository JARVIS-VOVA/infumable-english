import { UserAction, AuthState, UserActionTypes } from '.'

const initialState: AuthState = {
  user: {
    createdAt: null,
    email: null,
    id: null,
    username: null,
  },
  loading: false,
  isAuthenticated: false,
  message: null,
}

export const authReducer = (state = initialState, action: UserAction): AuthState => {
  switch (action.type) {
    case UserActionTypes.REGISTRATION_USER:
      return { ...state, loading: true }
    case UserActionTypes.REGISTRATION_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload }
    case UserActionTypes.REGISTRATION_USER_ERROR:
      return { ...state, loading: false, message: action.payload }

    case UserActionTypes.LOGIN_USER:
      return { ...state, loading: true }
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, isAuthenticated: true }
    case UserActionTypes.LOGIN_USER_ERROR:
      return { ...state, loading: false, message: action.payload, isAuthenticated: false }

    case UserActionTypes.LOGOUT_USER:
      return { ...state, loading: true }
    case UserActionTypes.LOGOUT_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, isAuthenticated: false }
    case UserActionTypes.LOGOUT_USER_ERROR:
      return { ...state, loading: false, message: action.payload, isAuthenticated: false }
      
    default:
      return state
  }
}
