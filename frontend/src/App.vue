<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  created() {
    this.loadDarkMode();
    this.$store.dispatch("getUser");
  },
  methods: {
    ...mapActions(["loadDarkMode", "setDarkMode"])
  },
  computed: {
    ...mapGetters(["getDarkMode"]),

    // documentation purposes below
    ...mapGetters("api", ["getTest"]),
    ...mapState("api", {
      a: state => state.test
    }),
    user() {
      return this.$store.state.user;
    }
  },
  watch: {
    // using regular function for 'this' context
    getDarkMode: function(dark){
      this.$vuetify.theme.dark = dark;
    }  
  }
};
</script>
<style lang="scss" scoped>
.add-btn {
  .v-btn--floating {
    height: initial;
  }
}
</style>
