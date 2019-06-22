import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import APIService from "../services/APIService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workspace: null,
    workspaces: [],
    environments: [],
    features: [],
    user: null,
    darkMode: false
  },

  mutations: {
    SET_ENVIRONMENTS(state, environments) {
      state.environments = environments;
    },

    SET_FEATURES(state, features) {
      state.features = features;
    },

    SET_USER(state, user) {
      state.user = user;
      console.log(user);
    },

    SET_DARKMODE(state, darkMode) {
      state.darkMode = darkMode;
    }
  },

  actions: {
    async getFeatures({ commit, state }) {
      if (!state.user) return;
      const features = await APIService.getFeature();
      commit("SET_FEATURES", features);
    },

    async getUser({ commit }) {
      try {
        const user = await APIService.getUser();
        commit("SET_USER", user);
      } catch (e) {
        router.push("/login");
      }
    },

    setUser({ commit }, user) {
      commit("SET_USER", user);
    },

    logout({ commit }) {
      console.log("ok");
      APIService.logout()
        // .then(() => {
        //   commit("SET_USER", null);
        // })
        .finally(() => {
          commit("SET_USER", null);
          router.push("/login");
        });
    },

    loadDarkMode({ commit }) {
      const darkModeString = window.localStorage.getItem("darkMode");
      const darkMode = darkModeString === "true";
      console.log(typeof darkMode);
      commit("SET_DARKMODE", darkMode);
    },

    setDarkMode({ commit }, darkMode) {
      console.log(typeof darkMode);
      window.localStorage.setItem("darkMode", darkMode);
      commit("SET_DARKMODE", darkMode);
    }
  },

  getters: {
    getDarkMode: state => state.darkMode
  }
});
