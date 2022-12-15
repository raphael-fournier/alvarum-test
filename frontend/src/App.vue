<template>
  <v-app ref="app">
    <v-snackbar
      v-for="(message, index) in $store.state.messages"
      :key="index"
      :color="message.type || 'info'"
      value="message.message"
      top
      :timeout="message.timeout || 7000"
      class="mt-5"
    >
      {{ message.key ? $t(message.key, message.params) : message.message }}
      <v-icon color="white" v-if="message.reactionAddons">{{
        message.reactionAddons.type
      }}</v-icon>
    </v-snackbar>
    <v-fade-transition mode="out-in">
      <v-overlay :value="$store.state.loading" opacity="0.7">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-fade-transition>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    event() {
      if (!this.$store.state.me) {
        return this.$store.state.event;
      }
      return this.$store.state.me.event;
    },
  },
  beforeCreate() {},
  mounted() {},
};
</script>

<style>
html,
body {
  min-height: 100vh;
}

.show-only-on-hover {
  opacity: 0;
}

td:hover .show-only-on-hover {
  opacity: 1;
}

#app {
  background: #ebeded;
  min-height: 100vh;
}

.v-application--wrap {
  min-height: 100% !important;
  min-height: -webkit-fill-available !important;
}

.v-navigation-drawer--is-mobile {
  height: 100% !important;
  height: -webkit-fill-available !important;
}
</style>
