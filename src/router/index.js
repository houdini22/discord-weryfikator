import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from '@/components/views/Home'
import VerifyComponent from '@/components/views/Verify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComponent
    },
    {
      path: '/weryfikacja',
      name: 'Verify',
      component: VerifyComponent
    }
  ]
})
