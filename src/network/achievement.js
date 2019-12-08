import request from "./request"

export function getAchievement() {
  return request({
    method: "get",
    url: "/achievement/get",
  })
}