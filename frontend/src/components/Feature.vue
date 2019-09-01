<template>
  <div class="t-layout">
    <v-flex xs12>
      <v-card>
        <h3>{{ feature.name }}</h3>
        <p>{{ feature.description }}</p>
        <v-card-actions>
          <v-switch
            @change="featureSwitch($event)"
            v-model="enabled"
            :loading="loading"
            color="success"
          ></v-switch>
          <v-spacer></v-spacer>
          <v-btn @click="editFeature(feature)" color="info">Edit</v-btn>
          <v-btn @click="removeFeature(feature)" color="error">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import APIService from "@/services/APIService";

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
      APIService.editFeature(feature).then(res => {
        this.$emit("featureUpdate", res.data);
        this.loading = false;
      });
    }
  },
  computed: {
    isActive() {
      return this.feature.isEnabled;
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
