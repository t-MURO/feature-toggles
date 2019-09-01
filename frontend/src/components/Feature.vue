<template>
  <div class="t-layout">
    <v-flex xs12>
      <v-card>
        <h3>{{ feature.name }}</h3>
        <p>{{ feature.description }}</p>
        <v-card-actions>
          <v-switch
            @change="featureSwitch($event)"
            v-model="feature.isEnabled"
            :loading="loading"
            color="success"
          ></v-switch>
          <v-spacer></v-spacer>
          <v-btn @click="editFeature(feature)" color="info">
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
export default {
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
