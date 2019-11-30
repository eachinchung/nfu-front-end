import request from "./request"


export function getUserData() {
  return request({
    method: "get",
    url: "/user/data",
  })
}

export function getVerificationCode() {
  return request({
    method: "get",
    url: "/validate/verification-code",
  })
}

export function setDormitory(roomId) {
  return request({
    method: "post",
    url: "/user/set/dormitory",
    data: {
      roomId: roomId
    }
  })
}

export function setPassword(data) {
  return request({
    method: "post",
    url: "/user/set/password",
    data
  })
}