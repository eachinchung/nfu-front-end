import request from "./request"
import store from '@/store'


export function getUserData(token) {
  return request({
    method: "get",
    url: "/user/getUserData",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function updateDormitory(room_id) {
  return request({
    method: "post",
    url: "/user/update/dormitory",
    data: {
      room_id: room_id
    },
    headers: {
      'Authorization': `Bearer ${store.state.access_token}`
    }
  });
}
