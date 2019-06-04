import Vue from "vue";
import Vuex from "vuex";
import APIService from "./services/APIService";

Vue.use(Vuex);

const apiService = new APIService();

export default new Vuex.Store({
  state: {
    workspace: null,
    workspaces: [],
    environments: [],
    features: []
  },

  mutations: {
    SET_ENVIRONMENTS(state, environments) {
      state.environments = environments;
    },

    SET_FEATURES(state, features) {
      state.features = features;
    }
  },

  actions: {
    async getFeatures({ commit }) {
      const features = await apiService.getFeature();
      commit("SET_FEATURES", features);
    }

    // getFeatures(){
    //
    // },
  },

  getters: {}
});
