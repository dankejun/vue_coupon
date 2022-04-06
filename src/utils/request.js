import axios from 'axios'
import {Message} from "element-ui";
const ConfigBaseURL = process.env.BASE_API // 默认路径，使用env变量来更改

// 使用create方法创建axios实例
export const Request = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  // method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
Request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '出了点问题,请稍后再试' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error);
});

export default Request
