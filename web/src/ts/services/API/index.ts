import axios from "axios"

import { IUser } from './../../types/index'

const API_URL = process.env.API_URL

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api/v1`,
})

export const userAPI = {
  registrationUser(email: string, username: string, password: string, passwordConfirmation: string) {
    return $api.post<IUser>('/users', { user: { email, username, password, passwordConfirmation } }).then(response => response.data)
  },
  loginUser(email: string, password: string) {
    return $api.post<IUser>('/sessions', { email, password}).then(response => response.data)
  },
  logoutUser() {
    return $api.delete<IUser>('/sessions')
  }
}
