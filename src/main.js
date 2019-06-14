import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/icon/iconfont.css'
import VueI18n from 'vue-i18n'
Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'fa'
})
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: require('./lang/index')
})
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
