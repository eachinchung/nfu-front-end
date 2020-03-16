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
    url: "/oauth/sign-up",
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

export function nfucaLogin(sign) {
  return noToken({
    method: "post",
    url: "/oauth/nfuca/login",
    data: {sign}
  })
}

export function nfucaSignUp(sign, dormitory, email) {
  return noToken({
    method: "post",
    url: "/oauth/nfuca/sign-up",
    data: {
      sign, email,
      roomId: dormitory
    }
  })
}