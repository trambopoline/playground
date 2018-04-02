import Vue from 'vue'
import Router from 'vue-router'
import Listy from '@/components/Listy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Listy',
      component: Listy
    }
  ]
})
