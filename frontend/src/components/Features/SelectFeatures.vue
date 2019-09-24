<template>
  <v-card>
    <v-card-title primary-title>
      Select Features
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-data-table
        v-model="selectedFeatures"
        :headers="headers"
        hide-default-header
        hide-default-footer
        show-select
        :items="filteredFeatures"
        item-key="name"
        no-data-text="No features available"
        :mobile-breakpoint="10"
        :loading="loading"
      >
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="close()">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" :loading="loading" @click="saveEnvironment()">
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      selectedFeatures: [],
      headers: [
        {
          text: "Name",
          sortable: true,
          value: "name"
        }
      ]
    };
  },
  methods: {
    ...mapActions("api", ["editEnvironment"]),
    saveEnvironment() {
      if (this.selectedFeatures.length === 0) return this.close();
      this.loading = true;
      this.environment.features.push(...this.selectedFeatures.map(f => f._id));
      this.editEnvironment(this.environment).then(() => {
        this.close();
      });
    },
    close() {
      this.loading = false;
      this.$emit("close");
    }
  },
  props: ["environment"],
  computed: {
    ...mapGetters("api", ["getFeatures"]),
    filteredFeatures() {
      return this.getFeatures.filter(
        f => !this.environment.features.includes(f._id)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card > .v-card__text {
  padding: 0;
}
</style>
