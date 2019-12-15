import {
  CLEAR_TRANSACTIONS,
  SOCKET_ONCLOSE,
  SOCKET_ONMESSAGE,
  SOCKET_ONOPEN
} from "../mutations.types";

const state = {
  connected: false,
  tx: [],
  blocks: []
};

const mutations = {
  [SOCKET_ONOPEN](state, payload) {
    /* eslint-disable */
    console.log({ payload });
    state.connected = true;
  },
  [SOCKET_ONMESSAGE](state, payload) {
    const data = JSON.parse(payload.data);

    switch (data.op) {
      case "utx":
        state.tx.push(data.x);
        break;
      case "block":
        console.log(data.x);
        state.blocks.push(data.x);
        break;
      default:
        break;
    }
  },
  [SOCKET_ONCLOSE](state) {
    state.connected = false;
  },
  [CLEAR_TRANSACTIONS](state) {
    state.tx = [];
  }
};

export default {
  state,
  mutations
};
