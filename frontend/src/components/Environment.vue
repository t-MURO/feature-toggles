<template>
  <v-card class="environment">
    <v-card-title primary-title>
      {{ environment.name }}
    </v-card-title>
    <v-card-text>
      <p>{{ environment.description }}</p>
      <p>
        Identifier: <strong>{{ environment.identifier }}</strong>
      </p>
      <v-list
        v-if="getFeaturesByIds(environment.features).length > 0"
        dense
        subheader
      >
        <v-divider></v-divider>
        <v-subheader>FEATURES</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="feature in getFeaturesByIds(environment.features)"
            :key="feature._id"
            :ripple="false"
            :inactive="feature.status === 'DELETED'"
          >
            <!-- to="/features" -->

            <v-list-item-icon @click.prevent>
              <feature-switch :feature="feature"></feature-switch>
            </v-list-item-icon>
              <v-chip class="mr-4" color="error" v-if="feature.status === 'DELETED'">Deleted</v-chip>
            <v-list-item-content>
              <v-list-item-title v-text="feature.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <!-- <v-btn color="accent" small>
                  Configure
                </v-btn> -->
              <v-btn small @click="removeFeature(environment, feature._id)">
                Remove
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
        <v-toolbar elevation="0" flat>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="selectFeaturesDialog = true"
            >Add
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </v-list>
      <v-btn v-else @click="selectFeaturesDialog = true">Add Features</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info"> <v-icon left>settings</v-icon> Configure</v-btn>
      <v-btn @click="removeEnvironment(environment._id)" color="error">
        <v-icon left>delete</v-icon>
        Delete
      </v-btn>
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
  data() {
    return {
      selectFeaturesDialog: false
    };
  },
  props: ["environment", "removeEnvironment"],
  methods: {
    ...mapActions("api", ["editEnvironment"]),
    removeFeature(environment, featureId) {
      let env = { ...environment };
      env.features = environment.features.filter(id => id !== featureId);
      this.editEnvironment(env);
    }
  },
  computed: {
    ...mapGetters("api", ["getFeaturesByIds"])
  }
};
</script>

<style lang="scss" scoped>
.environment {
  margin: 1em 0;
}
</style>
