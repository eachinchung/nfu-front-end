import request from "./request"

export function passenger() {
  return request({
    method: "get",
    url: "/school-bus-plus/passenger"
  })
}

export function waitingRideOrder() {
  return request({
    method: "get",
    url: "/school-bus-plus/order/waiting-ride"
  })
}

export function pendingPayment() {
  return request({
    method: "get",
    url: "/school-bus-plus/order/pending-payment"
  })
}

export function schedule(data) {
  return request({
    method: "post",
    url: "/school-bus-plus/schedule",
    data
  })
}

export function createOrder(data) {
  return request({
    method: "post",
    url: "/school-bus-plus/order/create",
    data
  })
}

export function accelerateOrder(data) {
  return request({
    method: "post",
    url: "/school-bus-plus/order/create/accelerate",
    data
  })
}

export function getTicketId(orderId) {
  return request({
    method: "post",
    url: "/school-bus-plus/ticketId",
    data: {orderId}
  })
}

export function ordePay(orderId) {
  return request({
    method: "post",
    url: "/school-bus-plus/order/pay",
    data: {orderId}
  })
}

export function returnTicket(data) {
  return request({
    method: "post",
    url: "/school-bus-plus/ticket/delete",
    data
  })
}