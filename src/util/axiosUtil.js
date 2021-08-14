import Vue from "vue";
import axios from "axios";

Vue.prototype.$http = axios;
// 统一方式添加token
// axios.defaults.headers['Authorization'] = `Bearer ${token}`
axios.interceptors.request.use(config => {
  try {
    console.log("request请求拦截...");
    /*if (config.url = "/user/login") return config;
    let token = sessionStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.log("登录");
      return Promise.reject("用户未登录");
    }
    config.headers.token = `${token}`;
    console.log(config.headers.token);
    console.log(config);*/
    return config;
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {

  // 根据服务端返回状态码，判断是token失败情况下，进行跳转登录
  // console.log('response返回拦截...');
  console.log(response);
  return response;
}, error => {
  return Promise.reject(error);
});