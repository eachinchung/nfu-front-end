import axios from "axios"
import store from '../store'
import router from "../router";
import {handleToken} from "./token";


export default config => {
  const instants = axios.create({
    baseURL: process.env.VUE_APP_POST_URL,
    timeout: 20000
  })

  instants.interceptors.request.use(
    config => {
      // 为每个请求都添加token
      config.headers.Authorization = `Bearer ${store.state.accessToken}`
      return config
    }
  )

  instants.interceptors.response.use(
    response => {

      // 当服务器返1001，token失效，刷新token
      if (response.data.code === "1001") return noToken({
        method: "get",
        url: "oauth/token/refresh",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("remember")}`
        }
      }).then(res => {
        if (res.data.code === "1000") {
          handleToken(res)
          response.config.headers.Authorization = `Bearer ${res.data.message.accessToken}`
          // 添加新的token后，重新发送请求
          return axios(response.config)
        } else {
          // 刷新token失败，没救了，重新登录吧
          localStorage.clear()
          router.push({path: "/login", query: {next: router.history.current.fullPath}})
          return response
        }
      }); else return response

    }
  )

  return instants(config)
}

// 此为不带token的接口
export function noToken(config) {
  const instants = axios.create({
    baseURL: process.env.VUE_APP_POST_URL,
    timeout: 20000
  })
  return instants(config)
}
