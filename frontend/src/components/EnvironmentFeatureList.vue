<template>
  <v-card>
    <v-card-text>
      <v-list dense subheader inactive>
        <v-subheader v-if="getFeatureTogglesByIds(environment.featureToggles).length > 0"
          >FEATURE TOGGLES ({{
            getFeatureTogglesByIds(environment.featureToggles).length
          }})</v-subheader
        >
        <v-subheader v-else>THIS ENVIRONMENT HAS NO FEATURES</v-subheader>
        <v-list-item-group inactive color="primary" class="feature-list">
          <v-list-item
            v-for="featureToggle in getFeatureTogglesByIds(environment.featureToggles)"
            :key="featureToggle._id"
            :ripple="false"
          >
            <v-list-item-action @click.prevent>
              <feature-switch :featureToggle="featureToggle"></feature-switch>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ featureToggle.name }}
                <v-chip
                  class="ml-2"
                  color="error"
                  x-small
                  label
                  dense
                  v-if="featureToggle.status === 'DELETED'"
                  >Deleted</v-chip
                >
                <RuleChipGroup
                  :environment="environment"
                  :featureToggle="featureToggle"
                  class="ml-2"
                />
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <div>
                <SelectRules
                  v-if="featureToggle"
                  :featureToggle="featureToggle"
                  :environment="environment"
                />
                <v-btn small @click="removeFeature(featureToggle._id)">Remove</v-btn>
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
import SelectRules from "./Rules/SelectRules";
import RuleChipGroup from "./Rules/RuleChipGroup";

export default {
  components: { FeatureSwitch, SelectFeatures, RuleChipGroup, SelectRules },
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
      env.featureToggles = env.featureToggles.filter(id => id !== featureId);
      this.editEnvironment(env);
    }
  },
  computed: {
    ...mapGetters("api", ["getFeatureTogglesByIds"]),
    featureToggles() {
      this.getFeatureTogglesByIds(this.environment.featureToggles);
      return null;
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
