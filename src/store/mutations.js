export default {
  update(state) {
    state.accessToken = null
  },
  upAccessToken(state, token) {
    const tokenData = JSON.parse(window.atob(token.split('.')[1]))
    const userData = JSON.parse(tokenData.data)
    state.accessToken = token
    state.busPower = tokenData.busPower
    localStorage.setItem("userId", tokenData.id)
    localStorage.setItem("name", userData.name)
    localStorage.setItem("email", userData.email)
    localStorage.setItem("dormitory", userData.dormitory)
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
