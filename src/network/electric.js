import request from "./request"

export function getElectric() {
  return request({
    method: "get",
    url: "/electric/get",
  })
}