export default {
  upAccessToken(state, token) {
    state.accessToken = token
    state.busPower = JSON.parse(window.atob(token.split('.')[1])).busPower
  },
  rmAccessToken(state) {
    state.accessToken = null
    localStorage.clear()
  },
  setRouteId(state, route_id) {
    state.routeId = route_id
  },
  setBusDate(state, date) {
    state.busDate = date
  },
  setTicketType(state, type) {
    state.ticketType = type
  }
}
