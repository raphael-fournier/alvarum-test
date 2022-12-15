<template>
  <div class="fill-height">
    <v-app-bar fixed app class="header-toolbar">
      <v-spacer />
      <lang-switcher />
      <div
        v-show="$store.state.me && !$router.currentRoute.meta.hideMenus"
        class="mr-1"
      >
        <v-btn icon to="/">
          <v-icon large>mdi-account-cog</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main id="main" class="fill-height">
      <v-container class="pa-2 fill-height justify-center">
        <v-row justify="center" class="fill-height" no-gutters>
          <v-col xl="9">
            <v-slide-x-reverse-transition mode="out-in">
              <router-view></router-view>
            </v-slide-x-reverse-transition>
          </v-col>
        </v-row>
        <router-view name="dialog"></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import LangSwitcher from "../common/_langSwitcher";
import router from "../router.js";

export default {
  components: {
    LangSwitcher,
  },
  methods: {
    async disconnect() {
      await this.$store.dispatch("LOGOUT", false);
      // Redirect to drop all info
      router.push("signin");
    },
  },
};
</script>
