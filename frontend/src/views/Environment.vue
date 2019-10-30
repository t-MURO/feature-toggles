<template>
  <v-container v-if="environment">
    <h2 class="display-1">{{ environment.name }}</h2>
    <v-row>
      <v-col lg="5">
        <v-card>
          <v-card-text>
            <p>{{ environment.description }}</p>
            Identifier: <strong>{{ environment.identifier }}</strong>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>edit</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mt-4">
          <stats />
        </v-card>
      </v-col>
      <v-col lg="7">
        <environment-feature-list
          :environment="environment"
        ></environment-feature-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import APIService from "../services/APIService";
import EnvironmentFeatureList from "../components/EnvironmentFeatureList";
import Stats from "../components/Playground/Stats.vue";

export default {
  components: { EnvironmentFeatureList, Stats },
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
