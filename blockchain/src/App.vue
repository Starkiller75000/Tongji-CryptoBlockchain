<template>
  <v-app id="app">
    <Drawer />
    <app-bar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import AppBar from "./components/AppBar";

export default {
  components: {
    Drawer,
    AppBar
  }
};
</script>

<style></style>
