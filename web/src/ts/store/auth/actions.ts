import { Dispatch } from 'redux'

import { UserAction, UserActionTypes } from '.'
import { userAPI } from '../../services/API'

export const registrationUser = (email: string, username: string, password: string, passwordConfirmation: string) => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.REGISTRATION_USER })

    const data = await userAPI.registrationUser(email, username, password, passwordConfirmation)

    dispatch({ type: UserActionTypes.REGISTRATION_USER_SUCCESS, payload: data })
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.REGISTRATION_USER_ERROR,
      payload: error.response?.data?.message
    })
  }
}

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.LOGIN_USER })

    const data = await userAPI.loginUser(email, password)

    dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: data })
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.LOGIN_USER_ERROR,
      payload: error.response?.data?.message
    })
  }
}

export const logoutUser = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.LOGOUT_USER })

    await userAPI.logoutUser()
    const data = {
      createdAt: null,
      email: null,
      id: null,
      username: null,
    }

    dispatch({ type: UserActionTypes.LOGOUT_USER_SUCCESS, payload: data })
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.LOGOUT_USER_ERROR,
      payload: error.response?.data?.message
    })
  }
}
