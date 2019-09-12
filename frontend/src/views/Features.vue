<template>
  <v-container>
    <h2 class="display-3">Features</h2>
    <v-spacer></v-spacer>
    <feature
      v-for="feature in getFeatures"
      :key="feature._id"
      :feature="feature"
      :removeFeature="removeFeature"
      :editFeature="editFeature"
    ></feature>
    <p class="mt-4" v-if="getFeatures.length === 0">No features configured.</p>
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
    ...mapGetters("api", ["getFeatures"])
  }
};
</script>

<style lang="scss" scoped></style>
