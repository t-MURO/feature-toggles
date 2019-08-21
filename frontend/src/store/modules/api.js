import APIService from "../../services/APIService";
import router from "../../router";

const apiModule = {
  namespaced: true,

  state: {
    user: null,
    features: [],
    environments: [],
    test: true
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_FEATURES(state, features) {
      state.features = features;
    },
    SET_ENVIRONMENTS(state, environments) {
      state.environments = environments;
    }
  },

  actions: {
    async getUser({ commit }) {
      try {
        const user = await APIService.getUser();
        commit("SET_USER", user);
      } catch (e) {
        router.push("/login");
      }
    },

    async getFeatures({ commit }) {
      try {
        const features = await APIService.getFeatures();
        commit("SET_FEATURES", features);
      } catch (e) {
        alert("error while fetching features");
      }
    },

    async getEnvironments({ commit }) {
      try {
        const environments = await APIService.getEnvironments();
        commit("SET_ENVIRONMENTS", environments);
      } catch (e) {
        alert("error fetching envs");
      }
    },

    async removeEnvironment({ commit, state }, id) {
      try {
        await APIService.removeEnvironment(id);
        commit(
          "SET_ENVIRONMENTS",
          state.environments.filter(env => env._id !== id)
        );
      } catch (e) {
        alert("could not delete env");
      }
    }
  },

  getters: {
    getFeatures: state => state.features,
    getEnvironments: state => state.environments,
    getTest: state => state.test
  }
};

export default apiModule;
