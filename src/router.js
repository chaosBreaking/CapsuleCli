import Vue from 'vue'
import Router from 'vue-router'
import Capsule from './views/Capsule.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/store',
      name: 'store',
      component: Capsule
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/studio',
      name: 'studio',
      component: () => import(/* webpackChunkName: "about" */ './views/Studio.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import(/* webpackChunkName: "about" */ './views/News.vue')
    }
  ]
})
