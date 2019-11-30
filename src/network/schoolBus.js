import request from "./request"

export function passenger() {
  return request({
    method: "get",
    url: "/school-bus/passenger"
  })
}

export function waitingRideOrder() {
  return request({
    method: "get",
    url: "/school-bus/order/waiting-ride"
  })
}

export function pendingPayment() {
  return request({
    method: "get",
    url: "/school-bus/order/pending-payment"
  })
}

export function schedule(data) {
  return request({
    method: "post",
    url: "/school-bus/schedule",
    data
  })
}

export function createOrder(data) {
  return request({
    method: "post",
    url: "/school-bus/order/create",
    data
  })
}

export function accelerateOrder(data) {
  return request({
    method: "post",
    url: "/school-bus/order/create/accelerate",
    data
  })
}

export function getTicketId(orderId) {
  return request({
    method: "post",
    url: "/school-bus/ticketId",
    data: {orderId}
  })
}

export function ordePay(orderId) {
  return request({
    method: "post",
    url: "/school-bus/order/pay",
    data: {orderId}
  })
}

export function returnTicket(data) {
  return request({
    method: "post",
    url: "/school-bus/ticket/delete",
    data
  })
}