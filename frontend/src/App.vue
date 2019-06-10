<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  components: {
    // app: App
  },
  created() {
    this.$store.dispatch("getUser");
  },
  computed: {
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
