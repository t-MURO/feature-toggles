<template>
  <v-card>
    <v-card-text>
      <v-list
        v-if="getFeaturesByIds(environment.features).length > 0"
        dense
        subheader
      >
        <v-subheader
          >FEATURES ({{
            getFeaturesByIds(environment.features).length
          }})</v-subheader
        >
        <v-list-item-group color="primary" class="feature-list">
          <v-list-item
            v-for="feature in getFeaturesByIds(environment.features)"
            :key="feature._id"
            :ripple="false"
            :inactive="feature.status === 'DELETED'"
          >
            <v-list-item-icon @click.prevent>
              <feature-switch :feature="feature"></feature-switch>
            </v-list-item-icon>
            <v-chip
              class="mr-4"
              color="error"
              v-if="feature.status === 'DELETED'"
              >Deleted</v-chip
            >
            <v-list-item-content>
              <v-list-item-title v-text="feature.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <div>
                <v-btn color="accent" class="mr-1" small>
                  Configure
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
      selectFeaturesDialog: false
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
  max-height: 30em;
  overflow-y: auto;
}
</style>
