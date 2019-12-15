export default {
  methods: {
    transactionsFees(tx) {
      return (
        this.transactionInputsValue(tx) - this.transactionsOutputsValue(tx)
      );
    },
    transactionInputsValue(tx) {
      return tx.inputs.reduce((acc, v) => acc + (v.prev_out.value || 0), 0);
    },
    transactionsOutputsValue(tx) {
      return tx.out.reduce((acc, v) => acc + (v.value || 0), 0);
    }
  }
};
