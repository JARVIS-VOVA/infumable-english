import axios from "axios"

import { IUser, UserLoginType, UserRegistrationType } from 'Types/index'

const API_URL = process.env.API_URL

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api/v1`,
})

export const userAPI = {
  userCreate(user: UserRegistrationType) {
    return $api.post<IUser>('/users', user)
  }
}

export const sessionAPI = {
  sessionCreate(user: UserLoginType) {
    return $api.post<IUser>('/sessions', user)
  },
  getSession() {
    return $api.get<IUser>('/sessions')
  },
  sessionDestroy() {
    return $api.delete('/sessions')
  }
}
