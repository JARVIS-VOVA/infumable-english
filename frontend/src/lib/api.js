import axios from 'axios'

// TODO: Move to .env
const API_URI = 'http://localhost:3000'

export const api = (resource, method, data) => {
  axios.defaults.withCredentials = true

  const url = `${API_URI}/${resource}`
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  const options = {
    method,
    headers,
    url,
    credentials: 'include'
  }

  if(method.toUpperCase() == 'POST') {
    options.data = JSON.stringify(data)
  }

  return (
    axios(options)
      .then(response => checkStatus(response))
      .catch(error => { console.log('Eroor:', error.response) })
  )
}

const checkStatus = response => {
  const { status, data } = response

  const responseData = {
    status,
    data
  }

  return responseData
}
