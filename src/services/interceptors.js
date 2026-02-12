import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../utils/apiUrl';
import { FAILURE } from '../utils/apiConstant';
import { store } from '../redux/store';

// Define types for Redux store and actions (adjust based on your actual types)


// Create Instance
const AxiosInstances = axios.create({
  baseURL: config.API_URL,
  timeout: 20000,
  transformRequest: [
    function (data, headers) {
      const getStore = store.getState();
      // const {token} = getStore?.AuthReducer?.loginData || ""
         const token = getStore.AuthReducer?.loginData?.token
      // const token = 'a95a478cc9859d6acf751fded325946803f53436'

      if (token) {
        headers['Authorization'] = `Token ${token}`
      }
      if (data && data._parts) {
        return data;
      } else {
        return JSON.stringify(data);
      }
    },
  ],
  headers: { 'Content-Type': 'application/json' },
});


AxiosInstances.interceptors.request.use((configs) => {
  return configs;
});

// Response Interceptor
AxiosInstances.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject({
        status: FAILURE,
        message: 'Please check your internet connection',
      });
    } else {
      return error.response;
    }
  },
);

export default AxiosInstances;
