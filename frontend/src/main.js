import Vue from "vue";
import VueWebsocket from "vue-native-websocket";
import store from "./store";
import router from "./router";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.use(VueWebsocket, "wss://ws.blockchain.info/inv", {
  store,
  reconnection: true
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount("#app");
