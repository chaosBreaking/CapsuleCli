import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'fa'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
