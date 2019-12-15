<template>
  <v-navigation-drawer app v-model="drawer">
    <v-list dense>
      <v-list-item link to="/">
        <v-list-item-action>
          <v-icon>mdi-dns</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Blockchain</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/contact">
        <v-list-item-action>
          <v-icon>mdi-contact-mail</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Coinbase</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer.open;
      },
      set(v) {
        this.$store.commit("drawer/setDrawer", v);
      }
    }
  }
};
</script>

<style></style>
