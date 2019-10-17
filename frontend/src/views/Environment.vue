<template>
  <v-container v-if="environment">
    <h2 class="display-1">{{ environment.name }}</h2>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import APIService from "../services/APIService";

export default {
  name: "Environment",
  data: function() {
    return {
      fetchedEnvironment: null
    };
  },
  beforeMount() {
    APIService.getEnvironment()
      .then(f => (this.environmentLocal = f))
      .catch(err => alert(err));
  },
  computed: {
    ...mapGetters("api", ["getEnvironment"]),
    environment() {
      return (
        this.fetchedEnvironment || this.getEnvironment(this.$route.params.id)
      );
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
