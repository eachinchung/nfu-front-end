export default {
  logout(state){
    state.userId = null
    state.busPower = null

    state.name = null
    state.email = null
    state.dormitory = null

    state.achievement = null
    state.semesterList = null
    state.totalAchievement = null

    state.routeId = null
    state.busDate = null
    state.ticketType = null

    state.accessToken = null
    localStorage.clear()
  },
  upAccessToken(state, token) {
    const tokenData = JSON.parse(window.atob(token.split('.')[1]))
    state.accessToken = token
    state.userId = tokenData.id
    state.busPower = tokenData.busPower
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
  },
  setAchievement(state, achievementData) {
    let semesterList = {}
    for (const item of achievementData) {
      if (item.semester === 1) semesterList[item.schoolYear] = ["\u7b2c\u4e00\u5b66\u671f"]
      if (item.semester === 2) semesterList[item.schoolYear] = ["\u7b2c\u4e00\u5b66\u671f", "\u7b2c\u4e8c\u5b66\u671f"]
    }
    state.achievement = achievementData
    state.semesterList = semesterList
  },
  setTotalAchievement(state, totalAchievement) {
    state.totalAchievement = totalAchievement
  }
}
