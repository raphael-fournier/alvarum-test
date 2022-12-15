import axios from "axios";
import store from "../store";
import router from "../router";
import Vue from "vue";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_PATH;

/**
 * Error handler
 */
axios.interceptors.response.use(
  (r) => r && r.data,
  (error) => {
    if (!error.response) {
      store.commit("I18N_MESSAGE", ["error", "errors.server.notreachable"]);
      return;
    }
    const status = error.response.status;
    const errorData = error.response.data.error || error.response.data;
    if (status === 401) {
      if (console && console.log) console.log("401 Unauthorized", errorData);
      store.commit("I18N_MESSAGE", ["error", "errors.server.unauthorized"]);
      store.dispatch("AUTHENTICATE", false).then(() => {
        router.push("/login");
      });
    } else if (status === 400) {
      if (console && console.log) console.log("Bad request", errorData);
      if (errorData.name === "AppError") {
        store.commit("I18N_MESSAGE", [
          "error",
          errorData.message,
          errorData.params,
        ]);
      } else {
        store.commit("I18N_MESSAGE", ["error", "errors.server.validation"]);
      }
    } else if (status === 500) {
      if (console && console.log) console.log("Technical error", errorData);
      store.commit("I18N_MESSAGE", ["error", "errors.server.technical"]);
    } else {
      if (console && console.log)
        console.log("Unexpected error", status, errorData);
      store.commit("I18N_MESSAGE", ["error", "errors.server.unexpected"]);
    }
  }
);

Vue.prototype.$axios = axios;
export default axios;
