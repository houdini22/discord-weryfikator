import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import state from './default-state'

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters,
  actions,
  mutations
})

export default store
