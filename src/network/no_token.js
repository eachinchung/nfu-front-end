import request from "./request"


export function login(username, password) {
  return request({
    method: "post",
    url: "/oauth/token/get",
    data: {
      user_id: username,
      password: password
    }
  })
}

export function sign_up(username, password, dormitory, email) {
  return request({
    method: "post",
    url: "/oauth/sign_up",
    data: {
      user_id: username,
      password: password,
      room_id: dormitory,
      email: email
    }
  })
}
