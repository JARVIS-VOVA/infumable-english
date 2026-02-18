import axios from 'axios';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { BACKEND_URL } from 'src/config/env';

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };

    if (newConfig.params) {
      newConfig.params = snakecaseKeys(newConfig.params, { deep: true });
    }

    if (newConfig.data && !(newConfig.data instanceof FormData)) {
      newConfig.data = snakecaseKeys(newConfig.data, { deep: true });
    }

    return newConfig;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
