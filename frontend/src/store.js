import Vue from "vue";
import Vuex from "vuex";
import axios from "./plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    me: JSON.parse(localStorage.getItem("me") || "null"),
    loading: false,
    auth: JSON.parse(localStorage.getItem("auth") || "null"),
  },
  mutations: {
    LOADING(state, loading) {
      state.loading = !!loading;
    },
    SETTINGS(state, settings) {
      state.settings = settings;
    },
    EVENT(state, event) {
      state.event = event;
    },
    SUCCESS(state, message) {
      state.messages.push({
        type: "success",
        message: message,
        timeout: 4000,
      });
    },
    ERROR(state, message) {
      state.messages.push({
        type: "error",
        message: message,
      });
    },
    WARNING(state, message) {
      state.messages.push({
        type: "warning",
        message: message,
      });
    },
    INFO(state, message) {
      state.messages.push({
        type: "info",
        message: message,
        timeout: 6000,
      });
    },
    MESSAGE(state, [type, message, timeout]) {
      state.messages.push({
        type: type,
        message: message,
        timeout: timeout,
      });
    },
    I18N_MESSAGE(state, [type, key, params, timeout]) {
      state.messages.push({
        type: type,
        key: key,
        params: params,
        timeout: timeout,
      });
    },
    AUTH(state, auth) {
      state.auth = auth;
    },
    ME(state, me) {
      if (me && !me.event) {
        state.me = null;
        localStorage.removeItem("me");
        throw new Error("Wrong ME data");
      }
      state.me = me;
      localStorage.setItem("me", JSON.stringify(me));
    },
  },
  actions: {
    async LOGOUT({ commit }) {
      commit("LOADING", true);
      localStorage.removeItem("auth");
      localStorage.removeItem("me");
      setTimeout(function () {
        window.location = "/";
      }, 1000);
    },
    async RELOAD_USER({ commit }) {
      commit("ME", await axios.get("/api/auth/me"));
    },
    async AUTHENTICATE({ commit, state }, auth) {
      /**
       * Load auth if not passed in parameters
       */
      if (typeof auth === "undefined") {
        if (state.auth) {
          auth = state.auth;
        } else {
          auth = JSON.parse("" + localStorage.getItem("auth"));
        }
      }
      if (!auth || auth.auth == false) {
        return null;
      }
      /**
       * Calculate expires_date if not set
       */
      if (auth && !auth.expires_date) {
        auth.expires_date =
          new Date().getTime() + (auth.expires_in || 14400) * 1000;
      }
      /**
       * Check validity of auth token
       */
      if (!auth || auth.expires_date < new Date().getTime() + 60000) {
        commit("AUTH", null);
        commit("ME", null);
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("auth");
        return null;
      }
      /**
       * Don't load me from server if already loaded and auth still valid
       */
      if (state.auth === auth && state.me) {
        return state.me;
      }
      /**
       * Load me from server
       */
      commit("AUTH", auth);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.access_token}`;
      localStorage.setItem("auth", JSON.stringify(auth));
      commit("ME", await axios.get("/api/auth/me"));
      return state.me;
    },
  },
});
