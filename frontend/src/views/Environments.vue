<template>
  <v-container>
    <h2 class="display-3">Environments</h2>
    <v-spacer></v-spacer>
    <div v-if="environments">
      <environment
        v-for="environment in environments"
        :key="environment._id"
        :environment="environment"
        :removeEnvironment="removeEnvironment"
        :editEnvironment="editEnvironment"
        @environmentUpdate="updateEnvironment(environment)"
      ></environment>
    </div>
  </v-container>
</template>

<script>
import APIService from "../services/APIService";
import Environment from "../components/Environment";
import { mapState } from "vuex";

export default {
  components: {
    environment: Environment
  },
  methods: {
    removeEnvironment(environment) {
      APIService.removeEnvironment(environment).then(() => {
        this.environments = this.environments.filter(
          env => env._id !== environment._id
        );
      });
    },
    editEnvironment(s) {
      console.log(s);
    }
  },
  computed: {
    ...mapState("api", {
      environments: state => state.environments
    })
  }
};
</script>

<style lang="scss" scoped></style>
