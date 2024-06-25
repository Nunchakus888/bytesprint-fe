import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
axios.defaults.timeout = 180000;
import { onErrorToast } from 'common/utils/toast';

//http://api.btyd.io:8080/
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api2r',
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
    console.log('response>>>>', response);
    if (res?.result?.code !== 0) {
      // fix 钱包出现但用户未进行授权，然后刷新了页面，会造成login 、userInfo接口重复请求，导致上一次授权失败，会出现invalid token报错
      // fix 单独针对user/info 报错不进行提示
      if (!response.request.responseURL.includes('/user/info')) {
        onErrorToast(res?.result.message);
      }

      // 判断是否过期，根据不同的错误码
      // expires token
      if (res?.result?.code === 1003) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('authorization');
        document.getElementById('connect-btn')?.click();
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
  return axiosInstance.post(url, params);
};
