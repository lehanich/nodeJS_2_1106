import Vue from 'vue'
import Router from 'vue-router'
import BullsCows from '@/components/BullsCows'
import LogPage from '@/components/LogPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Быки и коровы',
      component: BullsCows
    },
    {
      path: '/log',
      name: 'log',
      component: LogPage
    }
  ]
})
