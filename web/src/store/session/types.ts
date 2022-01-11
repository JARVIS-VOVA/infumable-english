import { IUser } from 'Types/index'

export interface SessionState {
  user: IUser | undefined
  loading: boolean
  message: null | string
}

export enum SessionActionTypes {
  CREATE_SESSION = 'CREATE_SESSION',
  CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS',
  CREATE_SESSION_ERROR = 'CREATE_SESSION_ERROR',

  DESTROY_SESSION = 'DESTROY_SESSION',
  DESTROY_SESSION_SUCCESS = 'DESTROY_SESSION_SUCCESS',
  DESTROY_SESSION_ERROR = 'DESTROY_SESSION_ERROR',

  GET_SESSION = 'GET_SESSION',
  GET_SESSION_SUCCESS = 'GET_SESSION_SUCCESS',
  GET_SESSION_ERROR = 'GET_SESSION_ERROR',
}

interface CreateSessionAction {
  type: SessionActionTypes.CREATE_SESSION
}

interface CreateSessionSuccessAction {
  type: SessionActionTypes.CREATE_SESSION_SUCCESS
  payload: IUser
}

interface CreateSessionErrorAction {
  type: SessionActionTypes.CREATE_SESSION_ERROR
  payload: string
}

interface GetSessinAction {
  type: SessionActionTypes.GET_SESSION
}

interface GetSessinSuccessAction {
  type: SessionActionTypes.GET_SESSION_SUCCESS
  payload: IUser
}

interface GetSessinErrorAction {
  type: SessionActionTypes.GET_SESSION_ERROR
  payload: string
}

interface DestroySessionAction {
  type: SessionActionTypes.DESTROY_SESSION
}

interface DestroySessionSuccessAction {
  type: SessionActionTypes.DESTROY_SESSION_SUCCESS
}

interface DestroySessionErrorAction {
  type: SessionActionTypes.DESTROY_SESSION_ERROR
  payload: string
}

export type SessionAction = CreateSessionAction |
                            CreateSessionSuccessAction |
                            CreateSessionErrorAction |
                            GetSessinAction |
                            GetSessinSuccessAction |
                            GetSessinErrorAction |
                            DestroySessionAction |
                            DestroySessionSuccessAction |
                            DestroySessionErrorAction
