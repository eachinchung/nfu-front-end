function analysis_token(token) {
  const data = token.split('.')
  return JSON.parse(window.atob(data[0])).exp
}

export default {
  upToken(state, token) {
    state.access_token = token
    state.exp = analysis_token(token)
  }
}
