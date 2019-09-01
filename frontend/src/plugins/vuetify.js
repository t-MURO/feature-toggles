import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "md"
  },
  theme: {
    themes: {
      dark: true,
      light: {
        primary: "#a1887f",
        secondary: "#424242",
        accent: "#d3b8ae",
        error: "#ED4337",
        info: "#a1887f",
        success: "#4CAF50",
        warning: "#FFC107"
      },
      dark: {
        primary: colors.blue.lighten3 // todo add dark theme
      }
    },
  },
  customProperties: true,
}

export default new Vuetify(opts);
