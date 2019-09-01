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
    loadInitialData({ dispatch }) {
      dispatch("getFeatures");
      dispatch("getEnvironments");
    },

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

    async createFeature({ commit, state }, feature) {
      try {
        const updatedFeature = await APIService.createFeature(feature);
        const updatedFeatures = [updatedFeature, ...state.features];
        commit("SET_FEATURES", updatedFeatures);
      } catch (e) {
        console.log(e);
        alert("error creating feature");
      }
    },

    async editFeature({ commit, state }, feature) {
      try {
        const updatedFeature = await APIService.editFeature(feature);
        const index = state.features.findIndex(f => f._id === feature._id);
        if (index < 0) throw new Error("updated feature doesn't exist");
        let updatedFeatures = [...state.features];
        updatedFeatures[index] = updatedFeature;
        commit("SET_FEATURES", updatedFeatures);
      } catch (e) {
        console.log(e);
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

    async createEnvironment({ commit, state }, environment) {
      try {
        const updatedEnvironment = await APIService.createEnvironment(
          environment
        );
        const updatedEnvironments = [updatedEnvironment, ...state.environments];
        commit("SET_ENVIRONMENTS", updatedEnvironments);
      } catch (e) {
        console.log(e);
        alert("error creating feature");
      }
    },

    async editEnvironment({ commit, state }, environment) {
      try {
        const updatedEnvironment = await APIService.editEnvironment(environment);
        const index = state.environments.findIndex(t => t._id === environment._id);
        if (index < 0) throw new Error("updated environment doesn't exist");
        let updatedEnvironments = [...state.environments];
        updatedEnvironments[index] = updatedEnvironment;
        commit("SET_ENVIRONMENTS", updatedEnvironments);
      } catch (e) {
        console.log(e);
      }
    },

    async removeFeature({ commit, state }, id) {
      try {
        await APIService.removeFeature(id);
        commit("SET_FEATURES", state.features.filter(f => f._id !== id));
      } catch (e) {
        alert("could not delete feature");
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
