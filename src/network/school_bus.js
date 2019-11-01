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
