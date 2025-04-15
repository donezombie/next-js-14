import { parseAuthFromCookie } from "@/utils/helpers";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

class HttpService {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();

    this.axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader() {
    const token = parseAuthFromCookie().token;
    this.axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        config.headers.Authorization = token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  put(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }
}

const httpService = new HttpService();
export default httpService;
