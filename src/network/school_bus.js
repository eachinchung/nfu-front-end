import request from "./request"

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

export function notUsedOrder(token) {
  return request({
    method: "get",
    url: "/school-bus/order/not-used",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
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