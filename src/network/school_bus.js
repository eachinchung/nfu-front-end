import request from "./request"
import store from '@/store'
import {tryRequest} from "./token"

export function schedule(token, routeId, date) {
  return request({
    method: "post",
    url: "/school-bus/schedule",
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
    url: "/school-bus/passenger",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function notUsedOrder(handle) {
  return tryRequest(request({
    method: "get",
    url: "/school-bus/order/not-used",
    headers: {
      'Authorization': 'Bearer ' + store.state.access_token
    }
  }),handle);
}

export function createOrder(token, data) {
  return request({
    method: "post",
    url: "/school-bus/order/create",
    data,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function ticketId(token, order_id) {
  return request({
    method: "post",
    url: "/school-bus/ticket-id",
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
    url: "/school-bus/ticket/delete",
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
  return process.env.VUE_APP_POST_URL + '/school-bus/ticket?token=' + token + '&order_id=' + orderId
}