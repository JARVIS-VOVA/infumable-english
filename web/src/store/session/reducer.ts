import { SessionAction, SessionState, SessionActionTypes } from '.'

const initialState: SessionState = {
  user: undefined,
  loading: false,
  message: null,
}

export const sessionReducer = (state = initialState, action: SessionAction): SessionState => {
  switch (action.type) {
    case SessionActionTypes.CREATE_SESSION:
      return { ...state, loading: true }
    case SessionActionTypes.CREATE_SESSION_SUCCESS:
      return { ...state, loading: false, user: action.payload }
    case SessionActionTypes.CREATE_SESSION_ERROR:
      return { ...state, loading: false, message: action.payload }

    case SessionActionTypes.GET_SESSION:
      return { ...state, loading: true }
    case SessionActionTypes.GET_SESSION_SUCCESS:
      return { ...state, loading: false, user: action.payload }
    case SessionActionTypes.GET_SESSION_ERROR:
      return { ...state, loading: false, message: action.payload }

    case SessionActionTypes.DESTROY_SESSION:
      return { ...state, loading: true }
    case SessionActionTypes.DESTROY_SESSION_SUCCESS:
      return { ...state, loading: false, user: undefined }
    case SessionActionTypes.DESTROY_SESSION_ERROR:
      return { ...state, loading: false, message: action.payload }
      
    default:
      return state
  }
}
