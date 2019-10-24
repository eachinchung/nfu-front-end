function analysis_token(token) {
  const data = token.split('.')
  return {
    exp: JSON.parse(window.atob(data[0])).exp,
    data: JSON.parse(window.atob(data[1]))
  }
}

export default {
  upToken(state, token) {
    const user = analysis_token(token)
    state.access_token = token
    state.exp = user.exp
    state.user = user.data
  }
}
