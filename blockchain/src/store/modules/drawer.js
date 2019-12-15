const state = {
  open: true
};

const mutations = {
  setDrawer(state, payload) {
    state.open = payload;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
