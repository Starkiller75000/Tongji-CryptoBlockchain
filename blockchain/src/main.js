import Vue from 'vue'
import store from './store'
import router from './router'

import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
