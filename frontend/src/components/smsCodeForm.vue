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
              <vue-tel-input-vuetify
                defaultCountry="fr"
                @input="onInput"
                :rules="[$v.required()]"
                :error="!phoneValid"
                :label="$t('login.phone')"
                :placeholder="$t('login.phone')"
              ></vue-tel-input-vuetify>
              <v-text-field
                class="prepend-icon-wide"
                v-if="phoneNumberExists"
                prepend-icon="mdi-key"
                :label="$t('login.code')"
                v-model="code"
                required
                :rules="[$v.required()]"
                type="number"
              ></v-text-field>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn
                v-show="!phoneNumberExists"
                type="submit"
                :disabled="!phoneValid || phone == ''"
                color="secondary"
                >{{ $t("login.sendCode") }}</v-btn
              >
              <v-btn
                v-show="phoneNumberExists"
                type="submit"
                :disabled="!phoneValid || code == ''"
                color="secondary"
                >{{ $t("login.submit") }}</v-btn
              >
            </v-card-actions>
            <v-card-actions class="justify-center">
              <router-link to="/signin/registrationNumber">
                {{ $t("login.signinRegistration") }}
              </router-link>
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
    phoneNumberExists: false,
    phoneValid: true,
    phone: "",
    code: "",
  }),
  methods: {
    onInput(formattedNumber, { number, valid, country }) {
      this.phone = number.international;
      this.phoneValid = valid;
      this.country = country && country.name;
    },
    async submit() {
      if (this.phoneNumberExists) {
        this.loginWithCode();
      } else {
        this.requestCode();
      }
    },
    async requestCode() {
      const auth = await axios.post("/api/auth/sendCode", {
        phone: this.phone,
      });
      if (auth) {
        this.phoneNumberExists = true;
      } else {
        this.$store.commit("ERROR", this.$t("login.phone_not_found"));
      }
    },
    async loginWithCode() {
      const auth = await axios.post("/api/auth/loginWithCode", {
        phone: this.phone,
        code: this.code,
      });

      if (!auth) {
        this.$store.commit("ERROR", this.$t("login.incorrect_code"));
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
