export default {
  upAccessToken(state, token) {
    state.accessToken = token
    state.busPower = JSON.parse(window.atob(token.split('.')[1])).busPower
  },
  rmAccessToken(state) {
    state.accessToken = null
    localStorage.clear()
  },
  upRouteId(state, route_id) {
    state.routeId = route_id
  },
  upBusDate(state, date) {
    state.busDate = date
  },
  SetTicketType(state, type) {
    state.ticketType = type
  },
  SetTicketData(state, data) {
    state.ticketData = data
  }
}
