<template>
  <div>
    {{ connected ? "connected" : "not connected" }}
    <br />
    <v-btn type="primary" @click="sub">
      Subscribe
    </v-btn>
    <v-btn @click="unsub">
      Unsubscribe
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
    <template v-for="(item, index) in transactions">
      <pre :key="index" style="margin-bottom: 10px">
      {{ JSON.stringify(item, null, 2) }}
    
      </pre>
    </template>
  </div>
</template>

<script>
import { CLEAR_TRANSACTIONS } from "@/store/mutations.types";
export default {
  computed: {
    connected() {
      return this.$store.state.wss.connected;
    },
    transactions() {
      return this.$store.state.wss.tx;
    }
  },
  methods: {
    clear() {
      this.$store.commit(CLEAR_TRANSACTIONS);
    },
    unsub() {
      this.$socket.send(JSON.stringify({ op: "blocks_unsub" }));
      this.$socket.send(JSON.stringify({ op: "unconfirmed_unsub" }));
    },
    sub() {
      this.$socket.send(JSON.stringify({ op: "blocks_sub" }));
      this.$socket.send(JSON.stringify({ op: "unconfirmed_sub" }));
    }
  },
  created() {}
};
</script>

<style />
