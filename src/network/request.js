import axios from "axios"
import store from '@/store'
import {handle_token} from "./token";

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
      let token = store.state.access_token

      if (token == null) {
        axios({
          method: "get",
          url: `${process.env.VUE_APP_POST_URL}oauth/token/refresh`,
          headers: {
            'Authorization': `Bearer ${getRememberToken()}`
          },
          timeout: 20000
        }).then(res=>{
          if (res.data.code === "1000") {
            handle_token(res)
            token = res.data.message.access_token
          }
        })
      }

      config.headers.Authorization=`Bearer ${token}`
      console.log(config);
    }
  )

  instants.interceptors.response.use(
    response => {
      console.log(response);
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
