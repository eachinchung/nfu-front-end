import request from "./request"

export function schedule(routeId, date) {
  return request({
    method: "post",
    url: "/schoolBus/schedule",
    data: {
      route_id: routeId,
      date: date
    }
  })
}

export function passenger(token) {
  return request({
    method: "get",
    url: "/schoolBus/passenger",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export function notUsedOrder() {
  return request({
    method: "get",
    url: "/schoolBus/order/notUsed"
  })
}

export function createOrder(data) {
  return request({
    method: "post",
    url: "/schoolBus/order/create",
    data
  })
}

export function ticketId(orderId) {
  return request({
    method: "post",
    url: "/schoolBus/ticketId",
    data: {
      orderId: orderId
    }
  })
}

export function returnTicket(data) {
  return request({
    method: "post",
    url: "/schoolBus/ticket/delete",
    data
  })
}

export function ticketUrl(token, orderId) {
  return process.env.VUE_APP_POST_URL + '/schoolBus/ticket?token=' + token + '&orderId=' + orderId
}