<template>
  <v-container v-if="environment">
    <h2 class="display-1">{{ environment.name }}</h2>
    <v-row>
      <v-col lg="6">
        <v-card class="pa-4">
          <p>{{ environment.description }}</p>
          Identifier: <strong>{{ environment.identifier }}</strong>
        </v-card>
      </v-col>
      <v-col lg="6">
        <v-card>
          <environment-feature-list
            :environment="environment"
          ></environment-feature-list>
        </v-card>
      </v-col>
      <v-col lg="4">
        <v-card>
          lol
        </v-card>
      </v-col>
      <v-col lg="4">
        <v-card>
          lol
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import APIService from "../services/APIService";
import EnvironmentFeatureList from "../components/EnvironmentFeatureList";

export default {
  components: { EnvironmentFeatureList },
  name: "Environment",
  data: function() {
    return {
      fetchedEnvironment: null
    };
  },
  beforeMount() {
    APIService.getEnvironment(this.$route.params.id)
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
