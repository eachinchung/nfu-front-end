import request from "./request";

export function schoolConfig() {
  return request({
    method: "get",
    url: "/class-schedule/config",
  })
}

export function getClassSchedule() {
  return request({
    method: "get",
    url: "/class-schedule/get",
  })
}