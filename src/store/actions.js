export function setWykopData ({commit}, data = {}) {
  commit('setWykopData', JSON.parse(data))
}

export function setDiscordData ({commit}, data = {}) {
  commit('setDiscordData', data)
}

export function setDiscordUsers ({commit}, data = []) {
  commit('setDiscordUsers', data)
}
