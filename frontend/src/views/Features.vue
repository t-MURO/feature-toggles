<template>
  <v-container>
    <h2 class="display-3">Features</h2>
    <v-spacer></v-spacer>
    <feature
      v-for="toggle in toggles"
      :key="toggle._id"
      :toggle="toggle"
      :removeToggle="removeToggle"
      @toggleUpdate="updateToggle(toggle)"
    ></feature>
  </v-container>
</template>

<script>
import APIService from "@/services/APIService";
import Feature from "../components/Feature";

const apiService = new APIService();

export default {
  components: {
    feature: Feature
  },
  data() {
    return {
      toggles: [],
      newToggle: {
        name: "",
        description: ""
      }
    };
  },
  beforeMount() {
    this.getToggles();
  },
  methods: {
    getToggles() {
      apiService.getToggles().then(toggles => {
        this.toggles = toggles;
      });
    },
    createToggle(toggle) {
      apiService.createToggle(toggle).then(t => this.toggles.unshift(t));
    },
    editToggle(toggle) {
      // toggle.isEnabled = !toggle.isEnabled;
      apiService.editToggle(toggle).then(t => (toggle = t));
    },
    removeToggle(toggle) {
      apiService.removeToggle(toggle).then(() => {
        this.toggles = this.toggles.filter(t => t._id !== toggle._id);
      });
    },
    updateToggle(toggle) {
      const index = this.toggles.findIndex(t => t._id === toggle._id);
      this.toggles[index] = toggle;
    }
  }
};
</script>

<style lang="scss" scoped></style>
