<template>
  <v-switch
    v-model="featureToggle.isEnabled"
    @change="featureSwitch($event)"
    :loading="loading"
    :disabled="featureToggle.status === 'DELETED'"
  ></v-switch>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "feature-switch",
  props: ["featureToggle"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions("api", ["editFeature"]),
    featureSwitch(event) {
      let featureToggle = { ...this.featureToggle };
      featureToggle.isEnabled = event;
      this.loading = true;
      this.editFeature(featureToggle).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>
