export default {
  upAccessToken(state, token) {
    const tokenData = JSON.parse(window.atob(token.split('.')[1]))
    state.accessToken = token
    state.userId = tokenData.id
    state.busPower = tokenData.busPower
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
  },
  setUserData(state, data) {
    state.name = data.name
    state.email = data.email
    state.dormitory = data.dormitory
  },
  updateDormitory(state, dormitory) {
    state.dormitory = dormitory
  }
}
