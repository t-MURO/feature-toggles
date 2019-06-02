<template>
  <div class="t-layout">
    <v-flex xs12>
      <v-card>
        <h3>{{ toggle.name }}</h3>
        <p>{{ toggle.description }}</p>
        <v-card-actions>
          <v-switch
            @change="toggleSwitch($event)"
            v-model="enabled"
            :loading="loading"
            color="success"
          ></v-switch>
          <v-btn @click="editToggle(toggle)" color="info">Edit</v-btn>
          <v-btn @click="removeToggle(toggle)" color="error">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import APIService from "@/services/APIService";

const apiService = new APIService();

export default {
  props: ["toggle", "removeToggle", "editToggle"],
  data() {
    return {
      loading: false,
      enabled: false
    };
  },
  created() {
    this.enabled = this.toggle.isEnabled;
  },
  methods: {
    toggleSwitch(event) {
      let toggle = { ...this.toggle };
      toggle.isEnabled = event;

      this.loading = true;
      apiService.editToggle(toggle).then(res => {
        this.$emit("toggleUpdate", res.data);
        this.loading = false;
      });
    }
  },
  computed: {
    isActive() {
      return this.toggle.isEnabled;
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
