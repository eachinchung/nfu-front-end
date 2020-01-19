import request from "./request"

export function passenger() {
  return request({
    method: "get",
    url: "/school-bus-pro/passenger"
  })
}

export function waitingRideOrder() {
  return request({
    method: "get",
    url: "/school-bus-pro/order/waiting-ride"
  })
}

export function pendingPayment() {
  return request({
    method: "get",
    url: "/school-bus-pro/order/pending-payment"
  })
}

export function schedule(data) {
  return request({
    method: "post",
    url: "/school-bus-pro/schedule",
    data
  })
}

export function createOrder(data) {
  return request({
    method: "post",
    url: "/school-bus-pro/order/create",
    data
  })
}

export function accelerateOrder(data) {
  return request({
    method: "post",
    url: "/school-bus-pro/order/create/accelerate",
    data
  })
}

export function getTicketId(orderId) {
  return request({
    method: "post",
    url: "/school-bus-pro/ticketId",
    data: {orderId}
  })
}

export function ordePay(orderId) {
  return request({
    method: "post",
    url: "/school-bus-pro/order/pay",
    data: {orderId}
  })
}

export function returnTicket(data) {
  return request({
    method: "post",
    url: "/school-bus-pro/ticket/delete",
    data
  })
}