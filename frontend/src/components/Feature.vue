<template>
  <v-card class="feature">
    <router-link :to="{ path: '/feature-toggles/' + feature._id }">
      <v-card-title primary-title>{{ feature.name }}</v-card-title>
    </router-link>
    <v-divider></v-divider>
    <v-card-text>
      <PreformattedParagraph
        v-if="feature.description"
        :text="feature.description"
      />
      <p v-if="getEnvironmentsForFeature(feature._id).length > 0">
        Used in:
        <strong>
          <v-chip
            v-for="environment in getEnvironmentsForFeature(feature._id)"
            :key="environment._id"
            :to="{ path: '/environments/' + environment._id }"
            outlined
            link
            class="ml-1"
          >
            {{ environment.name }}
          </v-chip>
        </strong>
      </p>
      <feature-switch :feature="feature"></feature-switch>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :to="{ path: '/feature-toggles/' + feature._id }" color="info">
        <v-icon left>settings</v-icon>
        Configure
      </v-btn>
      <v-btn @click="removeFeature(feature._id)" color="error">
        <v-icon left>delete</v-icon>
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import FeatureSwitch from "./Features/Switch";
import PreformattedParagraph from "./PreformattedParagraph";
export default {
  components: { FeatureSwitch, PreformattedParagraph },
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
.feature {
  margin: 1em 0;
}
a {
  text-decoration: none;
}
</style>
