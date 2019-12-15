import Vue from "vue";
import Vuex from "vuex";
import drawer from "./modules/drawer";
import wss from "./modules/wss";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    drawer,
    wss
  }
});

export default store;
