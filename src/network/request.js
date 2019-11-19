import axios from "axios"
import store from '../store'
import router from "../router";
import {handleToken} from "./token";

function getRememberToken() {
  const name = 'remember'
  const cookies = document.cookie;
  const list = cookies.split("; ")
  for (let i = 0; i < list.length; i++) {
    let arr = list[i].split("=")
    if (arr[0] === name)
      if (arr[1] === "") return null;
      else return arr[1]
  }
  return null;
}

export default config => {
  const instants = axios.create({
    baseURL: process.env.VUE_APP_POST_URL,
    timeout: 20000
  })

  instants.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${store.state.access_token}`
      return config
    }
  )

  instants.interceptors.response.use(
    response => {
      if (response.data.code === "1001") return noToken({
        method: "get",
        url: "oauth/token/refresh",
        headers: {
          'Authorization': `Bearer ${getRememberToken()}`
        }
      }).then(res => {
        if (res.data.code === "1000") {
          handleToken(res)
          response.config.headers.Authorization = `Bearer ${res.data.message.access_token}`
          return axios(response.config)
        } else {
          router.push({path: "/login", query: {next: router.history.current.fullPath}})
          return response
        }
      }); else return response
    }
  )

  return instants(config)
}

export function noToken(config) {
  const instants = axios.create({
    baseURL: process.env.VUE_APP_POST_URL,
    timeout: 20000
  })
  return instants(config)
}
