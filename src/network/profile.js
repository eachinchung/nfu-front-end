import request from "./request"


export function getUserData() {
  return request({
    method: "get",
    url: "/user/getUserData",
  })
}

export function updateDormitory(room_id) {
  return request({
    method: "post",
    url: "/user/update/dormitory",
    data: {
      room_id: room_id
    }
  })
}

export function getVerificationCode() {
  return request({
    method: "get",
    url: "/validate/getVerificationCode",
  })
}
