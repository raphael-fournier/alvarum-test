import "./styles/styles.scss";
import "./plugins/filters";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import validator from "./plugins/validator";
import store from "./store";
import axios from "./plugins/axios";
import "@mdi/font/scss/materialdesignicons.scss";

import VueTelInputVuetify from "vue-tel-input-vuetify/lib";

Vue.config.productionTip = false;

let initVue = function () {
  Vue.use(VueTelInputVuetify, {
    vuetify,
  });

  // Init vue
  new Vue({
    router,
    vuetify,
    i18n,
    validator,
    store,
    axios,
    render: (h) => h(App),
  }).$mount("#app");
};

initVue();
