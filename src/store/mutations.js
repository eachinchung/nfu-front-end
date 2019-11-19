export default {
  upAccessToken(state, token) {
    state.access_token = token
  },
  rmAccessToken(state) {
    state.access_token = null
  },
  upRouteId(state, route_id) {
    state.route_id = route_id
  },
  upBusDate(state, date) {
    state.bus_date = date
  },
  SetTicketType(state, type) {
    state.ticket_type = type
  },
  SetTicketData(state, data) {
    state.ticket_data = data
  }
}
