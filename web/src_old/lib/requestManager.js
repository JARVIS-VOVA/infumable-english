import axios from 'axios'
import snakecaseKeys from 'snakecase-keys'

import isObject from 'Src/lib/isObject'

// TODO: Move to .env
const API_URL = 'http://localhost:3000'

axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  if (isObject(config.data)) config.data = snakecaseKeys(config.data)
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  post:   (path, params) => axios.post(`${API_URL}${path}`, params),
  get:    (path, params) => axios.get(`${API_URL}${path}`, params),
  delete: (path, params) => axios.delete(`${API_URL}${path}`, { data: params }),
  put:    (path, params) => axios.put(`${API_URL}${path}`, params)
}
