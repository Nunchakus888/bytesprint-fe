import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
axios.defaults.timeout = 180000;
import { parseJson } from "./index";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  //@ts-ignore
  (config: AxiosRequestConfig) => {
    const userInfo = window.localStorage.getItem("userInfo") || "{}";
    const info = parseJson(userInfo);
    //@ts-ignore
    config.headers.authorization = info?.authorization || "";
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response?.data || {};

    if (res?.code !== 0) {
      if (res?.code === 10005) {
        // expires token
        localStorage.removeItem("userInfo");
      }
      return Promise.reject(res);
    }
    return res?.data || {};
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      return Promise.reject(response.data);
    } else {
      //网络连接异常,请稍后再试!
    }
  }
);

export const Get = (url: string, params = {}): Promise<any> => {
  return axiosInstance.get(url, { params });
};

export const Post = (url: string, params = {}): Promise<any> => {
  return axiosInstance.post(url, params);
};
