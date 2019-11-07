import request from "./request"

export function schedule(token, routeId, date) {
  return request({
    method: "post",
    url: "/school_bus/schedule/get",
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
    url: "/school_bus/passenger/get",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export function createOrder(token, data) {
  return request({
    method: "post",
    url: "/school_bus/order/create",
    data,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}