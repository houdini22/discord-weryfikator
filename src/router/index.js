import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from '@/components/views/Home'
import VerifyComponent from '@/components/views/Verify'
import ServersComponent from '@/components/views/Servers'
import UsersComponent from '@/components/views/Users'
import RadioComponent from '@/components/views/Radio'
import RamowkaComponent from '@/components/views/Ramowka'

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
    },
    {
      path: '/serwery',
      name: 'Servers',
      component: ServersComponent
    },
    {
      path: '/uzytkownicy',
      name: 'Users',
      component: UsersComponent
    },
    {
      path: '/radio',
      name: 'Radio',
      component: RadioComponent
    },
    {
      path: '/ramowka',
      name: 'Ramowka',
      component: RamowkaComponent
    }
  ]
})
