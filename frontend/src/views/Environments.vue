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
      ></environment>
    </div>
  </v-container>
</template>

<script>
import Environment from "../components/Environment";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    environment: Environment
  },
  methods: {
    ...mapActions("api", ["removeEnvironment"])
  },
  computed: {
    ...mapState("api", {
      environments: state => state.environments
    })
  }
};
</script>

<style lang="scss" scoped></style>
