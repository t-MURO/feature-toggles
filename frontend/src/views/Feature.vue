<template>
  <v-container v-if="feature">
    <h2 class="display-1">{{ feature.name }}</h2>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import APIService from "../services/APIService";

export default {
  name: "Feature",
  data: function() {
    return {
      fetchedFeature: null
    };
  },
  beforeMount() {
    APIService.getFeature()
      .then(f => (this.featureLocal = f))
      .catch(err => alert(err));
  },
  computed: {
    ...mapGetters("api", ["getFeature"]),
    feature() {
      return this.fetchedFeature || this.getFeature(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
