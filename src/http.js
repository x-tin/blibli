import axios from 'axios'
import Vue from 'vue'
import router from 'vue-router'
const http = axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api'
})

// http request 拦截器
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    if (token && id) { // 判断本地存储中是否存在token，如果存在的话，则每个http header都加上token
      // 请求头加上token
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

http.interceptors.response.use(
  response => {
    return response
  },
  // 接口错误状态处理，也就是说无响应时的处理
  error => {
    if (error.response.status === 401 || error.response.status === 402) {
      router.push('/login')
      Vue.prototype.$msg.fail(error.response.data.messages)
    }
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })
export default http
