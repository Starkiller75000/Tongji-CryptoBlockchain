import Vue from "vue";
import Vuex from "vuex";
import drawer from "./modules/drawer";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    drawer
  },
  state: {
    count: 0
  },
  mutations: {
    setState(state, payload) {
      state.count = payload;
    }
  },
  actions: {}
});

export default store;
