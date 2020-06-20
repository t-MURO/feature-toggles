<template>
  <v-card class="feature">
    <router-link :to="{ path: '/feature-toggles/' + featureToggle._id }">
      <v-card-title primary-title>{{ featureToggle.name }}</v-card-title>
    </router-link>
    <v-divider></v-divider>
    <v-card-text>
      <PreformattedParagraph
        v-if="featureToggle.description"
        :text="featureToggle.description"
      />
      <p v-if="getEnvironmentsForFeature(featureToggle._id).length > 0">
        Used in:
        <strong>
          <v-chip
            v-for="environment in getEnvironmentsForFeature(featureToggle._id)"
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
    </v-card-text>
    <v-card-actions>
      <feature-switch
        class="ml-3"
        :featureToggle="featureToggle"
      ></feature-switch>
      <v-spacer></v-spacer>
      <v-btn
        :to="{ path: '/feature-toggles/' + featureToggle._id }"
        color="info"
      >
        <v-icon left>settings</v-icon>
        Configure
      </v-btn>
      <v-btn @click="removeFeature(featureToggle._id)" color="error">
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
  props: ["featureToggle", "removeFeature", "editFeature"],
  data() {
    return {
      loading: false,
      enabled: false
    };
  },
  created() {
    this.enabled = this.featureToggle.isEnabled;
  },
  methods: {
    featureSwitch(event) {
      let featureToggle = { ...this.featureToggle };
      featureToggle.isEnabled = event;
      this.loading = true;
      this.editFeature(featureToggle).then(() => {
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
