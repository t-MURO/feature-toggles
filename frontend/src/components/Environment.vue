<template>
  <div class="t-layout">
    <v-flex xs12>
      <v-card>
        <h3>{{ environment.name }}</h3>
        <br />
        <p>{{ environment.description }}</p>
        <p>
          Identifier: <strong>{{ environment.identifier }}</strong>
        </p>
        <v-list dense subheader>
          <v-subheader>FEATURES</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="feature in getFeatures(environment.features)"
              :key="feature._id"
            >
            <!-- to="/features" -->

              <v-list-item-icon @click.prevent>
                <feature-switch :feature="feature"></feature-switch>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="feature.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <!-- <v-btn color="accent" small>
                  Configure
                </v-btn> -->
                <v-btn small>
                  Remove
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info"> <v-icon left>settings</v-icon> Configure</v-btn>
          <v-btn @click="removeEnvironment(environment._id)" color="error">
            <v-icon left>delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FeatureSwitch from "./Features/Switch";

export default {
  components: { FeatureSwitch },
  props: ["environment", "removeEnvironment"],
  computed: {
    ...mapGetters("api", ["getFeatures"])
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
