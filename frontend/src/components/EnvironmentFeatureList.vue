<template>
  <v-card>
    <v-card-text>
      <v-list dense subheader inactive>
        <v-subheader v-if="getFeaturesByIds(environment.features).length > 0"
          >FEATURES ({{
            getFeaturesByIds(environment.features).length
          }})</v-subheader
        >
        <v-subheader v-else>THIS ENVIRONMENT HAS NO FEATURES</v-subheader>
        <v-list-item-group inactive color="primary" class="feature-list">
          <v-list-item
            v-for="feature in getFeaturesByIds(environment.features)"
            :key="feature._id"
            :ripple="false"
            inactive
          >
            <v-list-item-action @click.prevent>
              <feature-switch :feature="feature"></feature-switch>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ feature.name }}
                <v-chip
                  class="ml-2"
                  color="error"
                  x-small
                  label
                  dense
                  v-if="feature.status === 'DELETED'"
                  >Deleted</v-chip
                >
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <div>
                <v-btn
                  v-if="feature.status !== 'DELETED'"
                  color="accent"
                  class="mr-1"
                  small
                >
                  Configure rules
                </v-btn>
                <v-btn small @click="removeFeature(feature._id)">
                  Remove
                </v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="selectFeaturesDialog = true">Add</v-btn>
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
import FeatureSwitch from "./Features/Switch";
import SelectFeatures from "./Features/SelectFeatures";

export default {
  components: { FeatureSwitch, SelectFeatures },
  props: ["environment"],
  data() {
    return {
      selectFeaturesDialog: false,
      addRulesDialog: false,
      addRulesEnv: null,
      addRulesFeature: null
    };
  },
  methods: {
    ...mapActions("api", ["editEnvironment"]),
    removeFeature(featureId) {
      let env = { ...this.$props.environment };
      env.features = env.features.filter(id => id !== featureId);
      this.editEnvironment(env);
    }
  },
  computed: {
    ...mapGetters("api", ["getFeaturesByIds"]),
    features() {
      return this.getFeaturesByIds(this.environment.features);
    }
  }
};
</script>

<style scoped>
.feature-list {
  max-height: 27.5em;
  overflow-y: auto;
}
</style>
