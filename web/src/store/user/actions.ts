import { Dispatch } from 'redux'

import { UserAction, UserActionTypes } from '.'
import { userAPI } from 'Api/index'
import { UserRegistrationType } from 'Types/index'

export const userCreate = (user: UserRegistrationType) => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.CREATE_USER })
    const response = await userAPI.userCreate(user)
    dispatch({ type: UserActionTypes.CREATE_USER_SUCCESS, payload: response.data })
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.CREATE_USER_ERROR,
      payload: error.response?.data?.message
    })
  }
}
