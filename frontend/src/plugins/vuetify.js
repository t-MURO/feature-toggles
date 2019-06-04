import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  theme: {
    primary: "#a1887f",
    secondary: "#424242",
    accent: "#d3b8ae",
    error: "#000",
    info: "#a1887f",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  options: {
    customProperties: true
  },
  iconfont: "md"
});
