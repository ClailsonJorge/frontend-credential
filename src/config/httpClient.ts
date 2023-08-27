import axios from 'axios';
import { API_BASE_URL } from './env';
import Cookies from  'js-cookie';
console.log(API_BASE_URL)
const httpClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export { httpClient }