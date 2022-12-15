<template>
  <div>
    <v-row justify="center" dense>
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card class="mt-5 elevation-12">
          <v-card-title
            class="text-center text-subtitle-1 font-weight-medium pb-0"
          >
            {{ $store.state.me.event.name }}
          </v-card-title>
          <v-card-text>
            {{ $store.state.me.first_name }} {{ $store.state.me.last_name }}
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="logout">{{ $t("logout") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>
