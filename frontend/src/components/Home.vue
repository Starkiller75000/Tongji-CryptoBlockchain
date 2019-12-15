<template>
  <v-container>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-chip v-on="on" :color="connected ? 'primary' : 'error'">{{
          connected ? "connected" : "not connected"
        }}</v-chip>
      </template>
      <span>Status of the websocket</span>
    </v-tooltip>

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
    <v-data-table :headers="headers" class="elevation-2" :items="transactions">
      <template v-slot:item.time="{ item }">{{
        (item.time * 1000) | datef
      }}</template>
      <template v-slot:item.value="{ item }">
        {{ item.value | satoshif }} BTC
      </template>
      <template v-slot:item.fees="{ item }">
        {{ item.fees | satoshif }} BTC
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { CLEAR_TRANSACTIONS } from "@/store/mutations.types";
import datef from "@/filters/date";
import satoshif from "@/filters/satoshi";
import transactions from "@/mixins/transactions";

export default {
  mixins: [transactions],
  data() {
    return {
      headers: [
        { text: "Tx index", value: "tx_index" },
        { text: "Date", value: "time" },
        { text: "Inputs", value: "inputsLength" },
        { text: "Outputs", value: "outputsLength" },
        { text: "Value", value: "value" },
        { text: "Fees", value: "fees" },
        { text: "Hash", value: "hash" }
      ]
    };
  },
  computed: {
    connected() {
      return this.$store.state.wss.connected;
    },
    transactions() {
      return this.$store.state.wss.tx
        .map(o => ({
          ...o,
          inputsLength: o.inputs.length,
          outputsLength: o.out.length,
          value: this.transactionInputsValue(o) - this.transactionsFees(o),
          fees: this.transactionsFees(o)
        }))
        .slice()
        .reverse();
    }
  },
  filters: {
    datef,
    satoshif
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
