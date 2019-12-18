import request from "./request"

export function getAchievement() {
  return request({
    method: "get",
    url: "/achievement/get",
  })
}

export function getTotalAchievement() {
  return request({
    method: "get",
    url: "/achievement/total",
  })
}

export function updateAchievement() {
  return request({
    method: "get",
    url: "/achievement/update",
  })
}