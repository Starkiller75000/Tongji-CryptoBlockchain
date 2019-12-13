import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    drawer: true
  },
  mutations: {
    setState(state, payload) {
      state.count = payload;
    },
    setDrawer(state, payload) {
      state.drawer = payload;
    }
  },
  actions: {}
});

export default store;
