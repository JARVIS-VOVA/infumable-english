import { IUser } from 'Types/index'

export interface UserState {
  user: IUser | undefined
  loading: boolean
  message: null | string
}

export enum UserActionTypes {
  CREATE_USER = 'CREATE_USER',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  CREATE_USER_ERROR = 'CREATE_USER_ERROR',
}

interface CreateUserAction {
  type: UserActionTypes.CREATE_USER
}

interface CreateUserSuccessAction {
  type: UserActionTypes.CREATE_USER_SUCCESS
  payload: IUser
}

interface CreateUserErrorAction {
  type: UserActionTypes.CREATE_USER_ERROR
  payload: string
}

export type UserAction =  CreateUserAction |
                          CreateUserSuccessAction |
                          CreateUserErrorAction
