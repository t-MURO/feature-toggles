<template>
<div>
  <app v-if="true" />
  <!-- <router-view></router-view> -->

</div>
</template>

<script>
import App from './views/App.vue';

export default {
  components: {
    "app": App
  },
  created() {
    this.$store.dispatch("getUser");
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
