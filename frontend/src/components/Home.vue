<template>
  <div>
    home
    <div>
      {{ nb }}
      <pre>onmessage</pre>
      triggered
    </div>
    {{ connected ? "connected" : "not connected" }}
    <br />
    <v-btn type="primary" @click="sub">
      Subscribe
    </v-btn>
    <v-btn @click="unsub">
      Unsubscribe
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      nb: 0,
      connected: false
    };
  },
  methods: {
    unsub() {
      this.socket.send(JSON.stringify({ op: "blocks_unsub" }));
      this.socket.send(JSON.stringify({ op: "unconfirmed_unsub" }));
    },
    sub() {
      this.socket.send(JSON.stringify({ op: "blocks_sub" }));
      this.socket.send(JSON.stringify({ op: "unconfirmed_sub" }));
    }
  },
  created() {
    /* eslint-disable */
    this.socket = new WebSocket("wss://ws.blockchain.info/inv");
    this.socket.onopen = e => {
      this.connected = true;
    };

    this.socket.onmessage = e => {
      const data = JSON.parse(e.data);

      switch (data.op) {
        case "utx":
          console.log("transaction");
          break;
        case "block":
          console.log("block");
        default:
          break;
      }
      // console.log(e);
      // console.log(JSON.parse(e.data));
      this.nb++;
    };

    this.socket.onerror = console.log;
  }
};
</script>

<style />
