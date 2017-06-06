import '@/styles/main.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueForm from 'vue-form'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from './config/development'

let axiosInstance = axios.create({
  baseURL: config.api.baseURL
})

Vue.use(VueAxios, axiosInstance)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueForm)
Vue.use(BootstrapVue)

// configure
Vue.config.productionTip = false
// end of configure

// mixins
// end of mixins

// components
// end of components

export default Vue
