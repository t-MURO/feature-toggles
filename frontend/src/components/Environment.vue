<template>
  <v-card class="environment">
    <router-link :to="{ path: '/environments/' + environment._id }">
      <v-card-title primary-title>
        {{ environment.name }}
      </v-card-title>
    </router-link>
    <v-divider></v-divider>
    <v-card-text>
      <preformatted-paragraph
        v-if="environment.description"
        :text="environment.description"
      />
      <p>
        Identifier: <strong>{{ environment.identifier }}</strong>
      </p>

      <environment-feature-list
        :environment="environment"
        v-if="getFeaturesByIds(environment.features).length > 0"
      ></environment-feature-list>
      <v-btn v-else @click="selectFeaturesDialog = true">Add Features</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info"> <v-icon left>settings</v-icon> Configure</v-btn>
      <v-btn @click="removeEnvironment(environment._id)" color="error">
        <v-icon left>delete</v-icon>
        Delete
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="selectFeaturesDialog" scrollable max-width="400px">
      <select-features
        @close="selectFeaturesDialog = false"
        :environment="environment"
      ></select-features>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectFeatures from "./Features/SelectFeatures";
import EnvironmentFeatureList from "./EnvironmentFeatureList";
import PreformattedParagraph from "./PreformattedParagraph";

export default {
  components: { SelectFeatures, EnvironmentFeatureList, PreformattedParagraph },
  data() {
    return {
      selectFeaturesDialog: false
    };
  },
  props: ["environment", "removeEnvironment"],
  methods: {
    ...mapActions("api", ["editEnvironment"]),
    removeFeature(environment, featureId) {
      let env = { ...environment };
      env.features = environment.features.filter(id => id !== featureId);
      this.editEnvironment(env);
    }
  },
  computed: {
    ...mapGetters("api", ["getFeaturesByIds"])
  }
};
</script>

<style lang="scss" scoped>
.environment {
  margin: 1em 0;
}
a {
  text-decoration: none;
}
</style>
