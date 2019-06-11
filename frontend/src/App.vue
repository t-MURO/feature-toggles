<template>
  <v-app :dark="getDarkMode" id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    // app: App
  },
  created() {
    this.loadDarkMode();
    this.$store.dispatch("getUser");
  },
  methods: {
    ...mapActions(["loadDarkMode", "setDarkMode"])
  },
  computed: {
    ...mapGetters(['getDarkMode']),
    user() {
      return this.$store.state.user;
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
