<template>
  <div>
    home
    <p>
      {{ data }}
    </p>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  data() {
    return {
      data: null
    }
  },
  mounted() {
    axios.get('https://blockchain.info/blocks?format=json&cors=true')
    .then((response) => {
      this.data = response
    })
  }
};
</script>

<style/>
