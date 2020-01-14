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

export function updateClassSchedule() {
  return request({
    method: "get",
    url: "/class-schedule/update",
  })
}

export function versionClassSchedule() {
  return request({
    method: "get",
    url: "/class-schedule/version",
  })
}