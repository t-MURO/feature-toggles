<template>
  <div>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="title">
          Create
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="type" mandatory>
            <v-btn :small="$vuetify.breakpoint.smAndDown" text value="feature">
              <span>Feature</span>
              <v-icon v-if="$vuetify.breakpoint.smAndUp"
                >insert_emoticon</v-icon
              >
            </v-btn>
            <v-btn
              :small="$vuetify.breakpoint.smAndDown"
              text
              value="environment"
            >
              <span>Environment</span>
              <v-icon v-if="$vuetify.breakpoint.smAndUp">phonelink</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-card-title>

        <!-- FEATURE -->
        <v-container v-if="type === 'feature'" grid-list-sm class="pa-4">
          <v-form
            ref="feature"
            lazy-validation
            v-model="featureForm.valid"
            @submit.prevent="createFeatureFromForm()"
          >
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    placeholder="Name"
                    prepend-icon="description"
                    name="feature-name"
                    v-model="featureForm.feature.name"
                    :rules="featureForm.rules.nameRules"
                  >
                  </v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-textarea placeholder="Description" prepend-icon="title">
                  </v-textarea>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                @click="$refs.feature.validate()"
                :disabled="!featureForm.valid"
                type="submit"
                >Save</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-container>

        <!-- ENVIRONMENT -->
        <v-container v-if="type === 'environment'" grid-list-sm class="pa-4">
          <v-form
            ref="environment"
            lazy-validation
            v-model="environmentForm.valid"
            @submit.prevent="createEnvironmentFromForm()"
          >
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    placeholder="Name"
                    prepend-icon="description"
                    v-model="environmentForm.environment.name"
                    name="environment-name"
                    :rules="environmentForm.rules.nameRules"
                  >
                  </v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-textarea
                    placeholder="Description"
                    prepend-icon="title"
                    v-model="environmentForm.environment.description"
                  >
                  </v-textarea>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-select
                  prepend-icon="power_settings_new"
                  placeholder="Features"
                  v-model="environmentForm.environment.features"
                  :items="features"
                  item-text="name"
                  item-value="_id"
                  chips
                  multiple
                  :disabled="features.length < 1"
                ></v-select>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="lock_open"
                    placeholder="Identifier"
                  ></v-text-field>
                </v-flex>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                type="submit"
                @click="$refs.environment.validate()"
                :disabled="!environmentForm.valid"
                >Save</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-btn
      class="add-btn"
      fab
      color="primary"
      bottom
      right
      fixed
      @click="
        dialog = !dialog;
        setType();
      "
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      environmentForm: {
        rules: {
          nameRules: [
            v => !!v || "Name is required",
            v =>
              this.environments.findIndex(e => e.name === v) < 0 ||
              "No duplicate names allowed"
          ],
          identifierRules: [
            v =>
              this.environments.findIndex(e => e.identifier === v) < 0 ||
              "No duplicate identifiers allowed"
          ]
        },
        valid: false,
        validate: () => this.$refs.environment.validate(),
        environment: {
          name: "",
          description: "",
          identifier: "",
          features: []
        }
      },
      featureForm: {
        rules: {
          nameRules: [
            v => !!v || "Name is required",
            v =>
              this.features.findIndex(f => f.name === v) < 0 ||
              "No duplicate names allowed"
          ]
        },
        valid: false,
        feature: {
          name: "",
          description: ""
        }
      },
      rules: {},
      fts: [],
      type: ""
    };
  },
  methods: {
    ...mapActions("api", ["createEnvironment", "createFeature"]),
    setType() {
      if (!this.dialog) return;
      const url = window.location.pathname;
      if (url.includes("environment") && !url.includes("features"))
        this.type = "environment";
      else this.type = "feature";
    },
    createFeatureFromForm() {
      if (!this.$refs.feature.validate()) {
        return;
      }
      this.createFeature(this.featureForm.feature).then(() => {
        this.dialog = false;
      });
    },
    createEnvironmentFromForm() {
      if (!this.$refs.environment.validate()) {
        return;
      }
      this.createEnvironment(this.environmentForm.environment).then(() => {
        this.dialog = false;
      });
    }
  },
  computed: {
    ...mapState("api", {
      features: state => state.features,
      environments: state => state.environments
    }),
    featureNames: function() {
      return this.features.map(f => f.name);
    }
  }
};
</script>

<style lang="scss" scoped></style>
