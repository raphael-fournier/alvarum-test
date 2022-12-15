import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import i18n from "./i18n";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      light: {
        primary: "#3545EE",
        secondary: "#39E6B3",
        accent: "#FC0B50",
        error: "#f44336",
        warning: "#ff9800",
        info: "#03a9f4",
        success: "#4caf50",
      },
      dark: {
        primary: "#CCD0FB",
        secondary: "#CEF4E9",
        accent: "#FC0B50",
        error: "#f44336",
        warning: "#ff9800",
        info: "#03a9f4",
        success: "#4caf50",
      },
    },
  },
  icons: {
    iconfont: "mdi",
  },
});
