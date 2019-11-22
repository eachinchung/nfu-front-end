import {noToken} from "./request"


export function login(username, password) {
  return noToken({
    method: "post",
    url: "/oauth/token",
    data: {
      userId: username,
      password: password
    }
  })
}

export function signUp(username, password, dormitory, email) {
  return noToken({
    method: "post",
    url: "/oauth/signUp",
    data: {
      userId: username,
      password: password,
      roomId: dormitory,
      email: email
    }
  })
}

export function activation(token) {
  return noToken({
    method: "get",
    url: "/validate/activation",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
