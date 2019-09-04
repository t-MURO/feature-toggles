<template>
  <div class="t-layout">
    <v-flex xs12>
      <v-card>
        <h3>{{ feature.name }}</h3>
        <p>{{ feature.description }}</p>
        <p v-if="getEnvironmentsForFeature(feature._id).length > 0">
          Used in:
          <strong>{{
            getEnvironmentsForFeature(feature._id)
              .map(e => e.name)
              .join(", ")
          }}</strong>
        </p>
        <v-card-actions>
          <feature-switch :feature="feature"></feature-switch>
          <v-spacer></v-spacer>
          <v-btn color="info">
            <v-icon left>settings</v-icon>
            Configure
          </v-btn>
          <v-btn @click="removeFeature(feature._id)" color="error">
            <v-icon left>delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import FeatureSwitch from "./Features/Switch";
import { mapGetters } from "vuex";
export default {
  components: { FeatureSwitch },
  props: ["feature", "removeFeature", "editFeature"],
  data() {
    return {
      loading: false,
      enabled: false
    };
  },
  created() {
    this.enabled = this.feature.isEnabled;
  },
  methods: {
    featureSwitch(event) {
      let feature = { ...this.feature };
      feature.isEnabled = event;
      this.loading = true;
      this.editFeature(feature).then(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapGetters("api", ["getEnvironmentsForFeature"])
  }
};
</script>

<style lang="scss" scoped>
.t-layout {
  margin: 1em 0;
  .v-card {
    padding: 1em 1em 0 1em;
  }
}
</style>
