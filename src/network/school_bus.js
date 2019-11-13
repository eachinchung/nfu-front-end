import request from "./request"

export function schedule(token, routeId, date) {
  return request({
    method: "post",
    url: "/schoolBus/schedule",
    data: {
      route_id: routeId,
      date: date
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function passenger(token) {
  return request({
    method: "get",
    url: "/schoolBus/passenger",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function notUsedOrder(token) {
  return request({
    method: "get",
    url: "/schoolBus/order/notUsed",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function createOrder(token, data) {
  return request({
    method: "post",
    url: "/schoolBus/order/create",
    data,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function ticketId(token, order_id) {
  return request({
    method: "post",
    url: "/schoolBus/ticketId",
    data: {
      order_id: order_id
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function returnTicket(token, order_id, ticket_id) {
  return request({
    method: "post",
    url: "/schoolBus/ticket/delete",
    data: {
      order_id: order_id,
      ticket_id: ticket_id
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function ticketUrl(token, orderId) {
  return process.env.VUE_APP_POST_URL + '/schoolBus/ticket?token=' + token + '&orderId=' + orderId
}