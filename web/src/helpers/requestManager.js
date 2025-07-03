import axios from 'axios'
import snakecaseKeys from 'snakecase-keys'
import camelcaseKeys from 'camelcase-keys'

import { API_URL } from 'src/constants/globals'

axios.defaults.withCredentials = true

axios.interceptors.response.use(response => {
  if (response.data) {
    response.data = camelcaseKeys(response.data, { deep: true })
  }

  return response
})

axios.interceptors.request.use(config => {
  const newConfig = { ...config }

  if (config.params) {
    newConfig.params = snakecaseKeys(config.params)
  }

  if (config.data) {
    newConfig.data = snakecaseKeys(newConfig.data)
  }

  return newConfig
}, error => {
  return Promise.reject(error)
})

export default {
  post:   (path, params) => axios.post(`${API_URL}${path}`, params),
  get:    (path, params) => axios.get(`${API_URL}${path}`, params),
  delete: (path, params) => axios.delete(`${API_URL}${path}`, { data: params }),
  put:    (path, params) => axios.put(`${API_URL}${path}`, params),
  patch:  (path, params) => axios.patch(`${API_URL}${path}`, params),
}
