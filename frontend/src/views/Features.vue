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
import Feature from "../components/Feature";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    feature: Feature
  },
  methods: {
    ...mapActions("api", ["removeFeature"]),
    updateFeature(feature) {
      const index = this.features.findIndex(t => t._id === feature._id);
      this.features[index] = feature;
    }
  },
  computed: {
    ...mapState("api", {
      features: state => state.features
    })
  }
};
</script>

<style lang="scss" scoped></style>
