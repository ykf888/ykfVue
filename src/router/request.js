import axios from 'axios'
import { ElMessage } from 'element-plus'
import {get_token}from '@/kit/cookieData.js'
const service = axios.create({
  baseURL: "",
  timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  config.headers.Token=get_token()
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data

  if (data.error_code === 0 && data) {
    if (data.content === null) {
      ElMessage.error({message:data.msg});
      return false
    }
    ElMessage.success({ message: data.msg});
  } else {
    ElMessage.error({ message: data.msg });
  }
  return Promise.resolve(data)
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default service;