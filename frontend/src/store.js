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
    features: [],
    user: null,
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
    }
  },

  actions: {
    async getFeatures({ commit }) {
      const features = await apiService.getFeature();
      commit("SET_FEATURES", features);
    },

    async getUser({ commit }) {
      try{
        const user = await apiService.getUser();
        commit("SET_USER", user);
      } catch (e){
        this.$router.push('/login');
      }
    },
  },

  getters: {}
});
