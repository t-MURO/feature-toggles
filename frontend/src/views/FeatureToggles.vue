<template>
  <v-container>
    <h2 class="display-1">Feature Toggles</h2>
    <v-spacer></v-spacer>
    <feature
      v-for="featureToggle in getFeatureToggles"
      :key="featureToggle._id"
      :featureToggle="featureToggle"
      :removeFeature="removeFeature"
      :editFeature="editFeature"
    ></feature>
    <p class="mt-4" v-if="getFeatureToggles.length === 0">
      No features configured.
    </p>
  </v-container>
</template>

<script>
import Feature from "../components/Feature";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    feature: Feature
  },
  methods: {
    ...mapActions("api", ["removeFeature", "editFeature"])
  },
  computed: {
    ...mapGetters("api", ["getFeatureToggles"])
  }
};
</script>

<style lang="scss" scoped></style>
