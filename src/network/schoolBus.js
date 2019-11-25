import request from "./request"

export function passenger() {
  return request({
    method: "get",
    url: "/schoolBus/passenger"
  })
}

export function notUsedOrder() {
  return request({
    method: "get",
    url: "/schoolBus/order/notUsed"
  })
}

export function schedule(data) {
  return request({
    method: "post",
    url: "/schoolBus/schedule",
    data
  })
}

export function createOrder(data) {
  return request({
    method: "post",
    url: "/schoolBus/order/create",
    data
  })
}

export function getTicketId(orderId) {
  return request({
    method: "post",
    url: "/schoolBus/ticketId",
    data: {orderId}
  })
}

export function ordePay(orderId) {
  return request({
    method: "post",
    url: "/schoolBus/order/pay",
    data: {orderId}
  })
}

export function returnTicket(data) {
  return request({
    method: "post",
    url: "/schoolBus/ticket/delete",
    data
  })
}