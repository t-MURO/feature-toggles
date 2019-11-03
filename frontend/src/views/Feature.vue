<template>
  <v-container v-if="feature">
    <h2 class="display-1">{{ feature.name }}</h2>
    <v-row>
      <v-col lg="8">
        <feature-props :feature="feature" />
      </v-col>
      <v-col lg="4" fill-height>
        <feature-environments :feature="feature" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import APIService from "../services/APIService";
import FeatureProps from "../components/Features/FeatureProps";
import FeatureEnvironments from "../components/Features/FeatureEnvironments";

export default {
  name: "Feature",
  props: ["featureProp"],
  components: {
    FeatureProps,
    FeatureEnvironments
  },
  data() {
    return {
      feature: null
    };
  },
  beforeMount() {
    if (this.featureProp) {
      this.feature = this.featureProp;
      return;
    }
    const featureFromStore = this.getFeature(this.$route.params.id);
    if (featureFromStore) {
      this.feature = featureFromStore;
    }
    APIService.getFeature(this.$route.params.id)
      .then(f => (this.feature = f))
      .catch(err => alert(err));
  },
  computed: {
    ...mapGetters("api", ["getFeature", "getEnvironmentsForFeature"]),
    featureFromStore() {
      console.log("computing");
      return this.getFeature(this.$route.params.id);
    }
  },
  watch: {
    featureFromStore(newValue) {
      console.log("watching!");
      if (newValue) {
        this.feature = newValue;
      }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
