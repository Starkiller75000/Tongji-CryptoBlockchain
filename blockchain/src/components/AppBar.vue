<template>
  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-toolbar-title>GigaCrypto</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    drawer() {
      return this.$store.state.drawer.open;
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("drawer/setDrawer", !this.drawer);
    }
  }
};
</script>

<style></style>
