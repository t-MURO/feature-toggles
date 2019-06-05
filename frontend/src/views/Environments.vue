<template>
  <v-container>
    <h2 class="display-3">Environments</h2>
    <v-spacer></v-spacer>
    <environment
      v-for="environment in environments"
      :key="environment._id"
      :environment="environment"
      :removeEnvironment="removeEnvironment"
      @environmentUpdate="updateEnvironment(environment)"
    ></environment>
  </v-container>
</template>

<script>
import APIService from "../services/APIService";
import Environment from "../components/Environment";

const apiService = new APIService();

export default {
  components: {
    environment: Environment
  },
  data() {
    return {
      environments: [],
      newEnvironment: {
        name: "",
        description: "",
        identifier: ""
      }
    };
  },
  beforeMount() {
    console.log("test");
    this.getEnvironments();
  },
  methods: {
    getEnvironments() {
      apiService.getEnvironments().then(envs => {
        this.environments = envs;
      });
    },
    removeEnvironment(environment) {
      apiService.removeEnvironment(environment).then(() => {
        this.environments = this.environments.filter(
          env => env._id !== environment._id
        );
      });
    },
    editEnvironment(s) {
      console.log(s);
    }
  }
};
</script>

<style lang="scss" scoped></style>
