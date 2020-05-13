import Vue from "vue";
import openConnection from "socket.io-client";

export let ws;

let identifier;
let previousOptions;

let state = Vue.observable({
  featureToggles: []
});

const install = function(Vue, options) {
  ws = openConnection(options.url);
  identifier = options.identifier;

  ws.on("connect", () => {
    console.log("connected to feature toggle service");
  });

  ws.on("re-request", () => {
    fetchFeatures();
  });

  ws.on("features", featuresFromWs => {
    state.featureToggles = featuresFromWs;
  });

  if (options.automaticFirstFetch) {
    fetchFeatures();
  }

  Vue.prototype.$isEnabled = function(feature) {
    return state.featureToggles.includes(feature);
  };
};

export const fetchFeatures = options => {
  if (options) {
    previousOptions = options;
  } else if (previousOptions) {
    options = previousOptions;
  }
  ws.emit("get-features", {
    identifier,
    options
  });
};

export const resetFeatures = () => {
  state.featureToggles = [];
  previousOptions = null;
};

export default {
  install
};
