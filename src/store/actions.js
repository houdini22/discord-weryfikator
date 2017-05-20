export function setWykopData ({commit}, data = {}) {
  commit('setWykopData', JSON.parse(data))
}
