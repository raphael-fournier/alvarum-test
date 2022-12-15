<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" class="mr-3" :title="currentLanguage.name">
        <img
          :src="currentLanguage.icon"
          width="24px"
          :alt="currentLanguage.name"
        />
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="language in languages"
        v-bind:key="language.locale"
        @click="setLanguage(language.locale)"
        ripple
        :title="language.name"
      >
        <v-list-item-content>
          <img :src="language.icon" width="24px" :alt="language.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import axios from "../plugins/axios";

export default {
  data() {
    return {
      languages: [
        {
          locale: "en",
          name: "English",
          icon: `../assets/en.svg`,
        },
        {
          locale: "fr",
          name: "Français",
          icon: `../assets/fr.svg`,
        },
      ],
    };
  },
  mounted() {
    axios.defaults.headers.common["Content-Language"] =
      this.$i18n.locale || "en";
  },
  computed: {
    currentLanguage() {
      return this.$data.languages.find((l) => l.locale === this.$i18n.locale);
    },
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang;
      axios.defaults.headers.common["Content-Language"] = lang;
    },
  },
};
</script>

<style scoped></style>
