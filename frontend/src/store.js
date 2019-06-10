import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import APIService from "./services/APIService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workspace: null,
    workspaces: [],
    environments: [],
    features: [],
    user: null
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
      console.log(user)
    }
  },

  actions: {
    async getFeatures({ commit }) {
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
    }
  },

  getters: {}
});
