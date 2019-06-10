<template>
  <v-container>
    <h2 class="display-3">Features</h2>
    <v-spacer></v-spacer>
    <feature
      v-for="feature in features"
      :key="feature._id"
      :feature="feature"
      :removeFeature="removeFeature"
      @featureUpdate="updateFeature(feature)"
    ></feature>
  </v-container>
</template>

<script>
import APIService from "@/services/APIService";
import Feature from "../components/Feature";

export default {
  components: {
    feature: Feature
  },
  data() {
    return {
      features: [],
      newFeature: {
        name: "",
        description: ""
      }
    };
  },
  beforeMount() {
    this.getFeatures();
  },
  methods: {
    getFeatures() {
      APIService.getFeatures().then(features => {
        this.features = features;
      });
    },
    createFeature(feature) {
      APIService.createFeature(feature).then(t => this.features.unshift(t));
    },
    editFeature(feature) {
      // feature.isEnabled = !feature.isEnabled;
      APIService.editFeature(feature).then(t => (feature = t));
    },
    removeFeature(feature) {
      APIService.removeFeature(feature).then(() => {
        this.features = this.features.filter(t => t._id !== feature._id);
      });
    },
    updateFeature(feature) {
      const index = this.features.findIndex(t => t._id === feature._id);
      this.features[index] = feature;
    }
  }
};
</script>

<style lang="scss" scoped></style>
