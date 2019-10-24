import { request } from "./request"

export function get_user(token) {
  return request({
    method: "get",
    url: "/user/get",
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
}

export function refresh_token(token) {
  return request({
    method: "get",
    url: "oauth/token/refresh",
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
}
