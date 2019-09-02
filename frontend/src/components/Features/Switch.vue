<template>
  <v-switch
    v-model="feature.isEnabled"
    @change="featureSwitch($event)"
    :loading="loading"
  ></v-switch>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "feature-switch",
  props: ["feature"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions("api", ["editFeature"]),
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
