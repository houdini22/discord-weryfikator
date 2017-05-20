export function isLoggedInWykop (state) {
  return Object.keys(state.wykopData).length > 0
}

export function wykopData (state) {
  return state.wykopData
}
