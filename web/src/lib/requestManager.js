import axios from 'axios'

// TODO: Move to .env
const API_URL = 'http://localhost:3000'

axios.defaults.withCredentials = true

export default {
  post:   (path, params) => axios.post(`${API_URL}${path}`, params),
  get:    (path, params) => axios.get(`${API_URL}${path}`, params),
  delete: (path, params) => axios.delete(`${API_URL}${path}`, { data: params }),
  put:    (path, params) => axios.put(`${API_URL}${path}`, params)
}
