import { IUser } from './../../types/index'

export interface AuthState {
  user: IUser
  loading: boolean
  isAuthenticated: boolean
  message: null | string
}

export enum UserActionTypes {
  REGISTRATION_USER = 'REGISTRATION_USER',
  REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS',
  REGISTRATION_USER_ERROR = 'REGISTRATION_USER_ERROR',

  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',

  LOGOUT_USER = 'LOGOUT_USER',
  LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS',
  LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR',
}

interface RegistrationUserAction {
  type: UserActionTypes.REGISTRATION_USER
}

interface RegistrationUserSuccessAction {
  type: UserActionTypes.REGISTRATION_USER_SUCCESS
  payload: IUser
}

interface RegistrationUserErrorAction {
  type: UserActionTypes.REGISTRATION_USER_ERROR
  payload: string
}

interface LoginUserAction {
  type: UserActionTypes.LOGIN_USER
}

interface LoginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS
  payload: IUser
}

interface LoginUserErrorAction {
  type: UserActionTypes.LOGIN_USER_ERROR
  payload: string
}

interface LogoutUserAction {
  type: UserActionTypes.LOGOUT_USER
}

interface LogoutUserSuccessAction {
  type: UserActionTypes.LOGOUT_USER_SUCCESS
  payload: IUser
}

interface LogoutUserErrorAction {
  type: UserActionTypes.LOGOUT_USER_ERROR
  payload: string
}

export type UserAction =  RegistrationUserAction |
                          RegistrationUserSuccessAction |
                          RegistrationUserErrorAction |
                          LoginUserAction |
                          LoginUserSuccessAction |
                          LoginUserErrorAction |
                          LogoutUserAction |
                          LogoutUserSuccessAction |
                          LogoutUserErrorAction
