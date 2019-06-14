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
      component: Capsule,
      children: [
        {
          path: 'cloud',
          component: () => import(/* webpackChunkName: "about" */ './components/Cloud.vue')
        },
        {
          path: 'recent',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: 'share',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: 'trash',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: 'extension',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: 'configure',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: 'transaction',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
      ]
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
