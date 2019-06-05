<template>
  <div>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class=" title">
          Create
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="type">
            <v-btn flat value="feature">
              <span>Feature</span>
              <v-icon>insert_emoticon</v-icon>
            </v-btn>
            <v-btn flat value="environment">
              <span>Environment</span>
              <v-icon>phonelink</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field placeholder="Name" prepend-icon="description">
                </v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-textarea placeholder="Description" prepend-icon="title">
                </v-textarea>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-select
                prepend-icon="power_settings_new"
                placeholder="Features"
                v-model="fts"
                :items="features"
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
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
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
export default {
  data() {
    return {
      dialog: false,
      fts: [],
      type: "",
      //   features: []
      features: ["redesign", "newRoute", "editButton"]
    };
  },
  methods: {
    setType() {
      if (!this.dialog) return;
      const url = window.location.pathname;
      if (url.includes("environment") && !url.includes("features"))
        this.type = "environment";
      else this.type = "feature";
    }
  }
};
</script>

<style lang="scss" scoped></style>
