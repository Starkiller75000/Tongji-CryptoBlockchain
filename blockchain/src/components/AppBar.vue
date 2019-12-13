<template>
  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-toolbar-title>Application</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    drawer() {
      return this.$store.state.drawer;
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("setDrawer", !this.drawer);
    }
  }
};
</script>

<style></style>
