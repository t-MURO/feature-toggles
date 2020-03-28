import Vue from "vue";
import openConnection from "socket.io-client";

export let ws;

let environmentId;
let previousOptions;

let state = Vue.observable({
  features: []
});

const install = function(Vue, options) {
  ws = openConnection(options.url);
  environmentId = options.environmentId;

  ws.on("connect", () => {
    console.log("connected to feature toggle service");
  });

  ws.on("re-request", () => {
    fetchFeatures();
  });

  ws.on("features", featuresFromWs => {
    state.features = featuresFromWs;
  });

  if (options.automaticFirstFetch) {
    fetchFeatures();
  }

  Vue.prototype.$isEnabled = function(feature) {
    return state.features.includes(feature);
  };
};

export const fetchFeatures = options => {
  if (options) {
    previousOptions = options;
  } else if (previousOptions) {
    options = previousOptions;
  }
  ws.emit("get-features", {
    environmentId,
    options
  });
};

export const resetFeatures = () => {
  state.features = [];
  previousOptions = null;
};

export default {
  install
};
