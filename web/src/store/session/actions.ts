import { Dispatch } from 'redux'

import { SessionAction, SessionActionTypes } from '.'
import { sessionAPI } from 'Api/index'
import { UserLoginType } from 'Types/index'

export const sessionCreate = (user: UserLoginType) => async (dispatch: Dispatch<SessionAction>) => {
  try {
    dispatch({ type: SessionActionTypes.CREATE_SESSION })
    const response = await sessionAPI.sessionCreate(user)
    dispatch({ type: SessionActionTypes.CREATE_SESSION_SUCCESS, payload: response.data })
  } catch (error: any) {
    dispatch({
      type: SessionActionTypes.CREATE_SESSION_ERROR,
      payload: error.response?.data?.message
    })
  }
}

export const getSession = () => async (dispatch: Dispatch<SessionAction>) => {
  try {
    dispatch({ type: SessionActionTypes.GET_SESSION })
    const response = await sessionAPI.getSession()
    dispatch({ type: SessionActionTypes.GET_SESSION_SUCCESS, payload: response.data })
  } catch (error: any) {
    dispatch({
      type: SessionActionTypes.GET_SESSION_ERROR,
      payload: error.response?.data?.message
    })
  }
}

export const sessionDestroy = () => async (dispatch: Dispatch<SessionAction>) => {
  try {
    dispatch({ type: SessionActionTypes.DESTROY_SESSION })
    await sessionAPI.sessionDestroy()
    dispatch({ type: SessionActionTypes.DESTROY_SESSION_SUCCESS })
  } catch (error: any) {
    dispatch({
      type: SessionActionTypes.DESTROY_SESSION_ERROR,
      payload: error.response?.data?.message
    })
  }
}
