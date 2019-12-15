import {
  CLEAR_TRANSACTIONS,
  SOCKET_ONCLOSE,
  SOCKET_ONMESSAGE,
  SOCKET_ONOPEN,
  SOCKET_RECONNECT
} from "../mutations.types";

const state = {
  connected: false,
  tx: [],
  blocks: []
};

const mutations = {
  [SOCKET_ONOPEN](state) {
    state.connected = true;
  },
  [SOCKET_ONMESSAGE](state, payload) {
    const data = JSON.parse(payload.data);

    switch (data.op) {
      case "utx":
        state.tx.push(data.x);
        break;
      case "block":
          //eslint-disable-next-line
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
  [SOCKET_RECONNECT](state) {
    state.connected = true;
  },
  [CLEAR_TRANSACTIONS](state) {
    state.tx = [];
  }
};

export default {
  state,
  mutations
};
