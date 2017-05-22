export function isLoggedInWykop (state) {
  return Object.keys(state.wykopData).length > 0
}

export function isLoggedInDiscord (state) {
  return Object.keys(state.discordData).length > 0
}

export function wykopData (state) {
  return state.wykopData
}

export function discordData (state) {
  return state.discordData
}
