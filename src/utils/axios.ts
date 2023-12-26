import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
axios.defaults.timeout = 180000;
import { parseJson } from "./index";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/',
  headers: {
    "Content-Type": "application/json",
  },
});

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  //@ts-ignore
  (config: AxiosRequestConfig) => {
    const authorization = window.localStorage.getItem("authorization") || "";
    // const info = parseJson(userInfo);
    //@ts-ignore
    config.headers.authorization = (authorization || "")?.replaceAll('\"', '');
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
    console.log("res>>>>", res)
    if (res?.result.code !== 0) {
      // expires token
      localStorage.removeItem("userInfo");
      return Promise.reject(res);
    }
    return res || {};
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
  console.log("url.>>>>", axiosInstance)
  return axiosInstance.post(url, params);
};
