<template>
  <v-container>
    <h2 class="display-3">Features</h2>
    <v-spacer></v-spacer>
    <feature
      v-for="feature in features"
      :key="feature._id"
      :feature="feature"
      :removeFeature="removeFeature"
      :editFeature="editFeature"
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
    ...mapActions("api", ["removeFeature", "editFeature"])
  },
  computed: {
    ...mapState("api", {
      features: state => state.features
    })
  }
};
</script>

<style lang="scss" scoped></style>
