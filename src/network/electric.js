import request from "./request"

export function getElectric() {
  return request({
    method: "get",
    url: "/electric/get",
  })
}

export function createOrder(data) {
  return request({
    method: "post",
    url: "/electric/order/create",
    data
  })
}