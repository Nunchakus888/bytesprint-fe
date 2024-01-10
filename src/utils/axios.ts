import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
axios.defaults.timeout = 180000;
import { parseJson } from './index';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  //@ts-ignore
  (config: AxiosRequestConfig) => {
    const authorization = window.localStorage.getItem('authorization') || '';
    // const info = parseJson(userInfo);
    //@ts-ignore
    config.headers.authorization = (authorization || '')?.replaceAll('"', '');
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
    console.log('res>>>>', res);
    if (res?.result.code !== 0) {
      // 判断是否过期，根据不同的错误码
      // expires token
      if (res?.result.code === 1003) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('authorization');
        // @ts-ignore
        window?.toast({
          title: res?.result.message,
          status: `error`,
          isClosable: true,
          onCloseComplete: () => {
            // window.location.reload()
          },
        });
        document.getElementById('connect-btn').click();
      } else {
        debugger;
        // @ts-ignore
        window?.toast({
          title: res?.result.message,
          status: `error`,
          isClosable: true,
        });
      }
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
  console.log('url.>>>>', axiosInstance);
  return axiosInstance.post(url, params);
};
