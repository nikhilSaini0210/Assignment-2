import axios, { AxiosResponse } from 'axios';
import {
  ACCESS_TOKEN_KEY,
  API_BASE_URL,
  isAppInitializing,
  TIMEOUT,
} from './config';
import { resetAndNavigate } from '../utils/NavigationUtil';
import { Routes } from '../navigation/Routes';
import StorageService from '../service/storage.service';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const { success: accessSuccess, data: token } =
        await StorageService.getItem(ACCESS_TOKEN_KEY);
      if (token && accessSuccess) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      }
    } catch (err) {
      console.warn('Error attaching token:', err);
    }

    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;
    if (
      !isAppInitializing &&
      status === 401 &&
      (message === 'Access denied. Token has expired.' ||
        message === 'Access Denied. Invalid Token.' ||
        message === 'Access Denied. User not found.' ||
        message === 'Access Denied. No Token Provided.' ||
        message === 'Access denied. No valid authorization header provided.' ||
        message === 'Access denied. Malformed token.' ||
        message === 'Access denied. Invalid token payload.' ||
        message === 'Access denied. User account is inactive.')
    ) {
      await StorageService.removeItem(ACCESS_TOKEN_KEY);
      resetAndNavigate(Routes.Login);
    }
    return Promise.reject(error);
  },
);

type RequestParams = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
};

const makeRequest = async <T = any>({
  method,
  url,
  data,
  params,
  headers = {},
}: RequestParams): Promise<{
  response: AxiosResponse<T> | null;
  error: any;
}> => {
  try {
    const response = await axiosInstance.request<T>({
      method,
      url,
      data,
      params,
      headers,
    });
    return { response, error: null };
  } catch (error) {
    return { response: null, error };
  }
};

export default makeRequest;
