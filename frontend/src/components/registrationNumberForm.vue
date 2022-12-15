<template>
  <div>
    <v-row justify="center" dense>
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card class="mt-5 elevation-12">
          <v-card-title
            class="text-center text-subtitle-1 font-weight-medium pb-0"
          >
            {{ $t("login.title") }}
          </v-card-title>

          <v-form @submit.prevent="submit" ref="form" v-model="valid">
            <v-card-text class="px-6 py-1">
              <v-text-field
                class="prepend-icon-wide"
                prepend-icon="mdi-account"
                :label="$t('login.lastName')"
                v-model="last_name"
                required
                :rules="[$v.required()]"
                type="text"
              ></v-text-field>
              <v-text-field
                class="prepend-icon-wide"
                prepend-icon="mdi-key"
                :label="$t('login.registrationNumber')"
                v-model="code"
                required
                :rules="[$v.required(), rules.minChar, rules.maxChar]"
                counter="8"
                type="number"
              ></v-text-field>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn type="submit" :disabled="!valid" color="secondary">{{
                $t("login.submit")
              }}</v-btn>
            </v-card-actions>
            <v-card-actions class="justify-center">
              <router-link to="/signin/smsCode">{{
                $t("login.siginWithSms")
              }}</router-link>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    last_name: "",
    code: "",
    rules: {
        minChar: (v) => v.length >= 5 || "Minimum 5 characters",
        maxChar: (v) => v.length <= 8 || "Maximum 8 characters",

    }
  }),
  methods: {
    async submit() {
      if (this.valid) {
        this.loginWithRegistrationNumber();
      }
    },

    async loginWithRegistrationNumber() {
      const auth = await axios.post("/api/auth/loginWithRegistrationNumber", {
        last_name: this.last_name,
        registration_number: this.code,
      });

      if (!auth) {
        this.$store.commit("ERROR", this.$t("login.wrongCredentials"));
        return;
      }

      await this.$store.dispatch("AUTHENTICATE", auth);

      this.$router.push("/").catch(() => {});
    },
  },
};
</script>

<style>
.prepend-icon-wide .v-input__prepend-outer {
  margin: 0 25px;
}
</style>
