import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import APIService from "../services/APIService";
import apiModule from "./modules/api";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api: apiModule
  },

  state: {
    user: null,
    darkMode: false
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    SET_DARKMODE(state, darkMode) {
      state.darkMode = darkMode;
    }
  },

  actions: {
    async getUser({ commit }) {
      const user = await APIService.getUser();
      commit("SET_USER", user);
    },

    setUser({ commit }, user) {
      commit("SET_USER", user);
    },

    logout({ commit }) {
      APIService.logout().finally(() => {
        commit("SET_USER", null);
        router.push("/login");
      });
    },

    loadDarkMode({ commit }) {
      const darkModeString = window.localStorage.getItem("darkMode");
      const darkMode = darkModeString === "true";
      commit("SET_DARKMODE", darkMode);
    },

    setDarkMode({ commit }, darkMode) {
      window.localStorage.setItem("darkMode", darkMode);
      commit("SET_DARKMODE", darkMode);
    }
  },

  getters: {
    getDarkMode: state => state.darkMode
  }
});
