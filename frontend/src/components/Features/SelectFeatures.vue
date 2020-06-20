<template>
  <v-card>
    <v-card-title primary-title>Select Feature Toggles</v-card-title>
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
        no-data-text="No feature toggles available"
        :mobile-breakpoint="10"
        :loading="loading"
      ></v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="close()">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="addNewDialog = true"
        >Create new</v-btn
      >
      <v-btn color="success" :loading="loading" @click="saveEnvironment()"
        >Add</v-btn
      >
    </v-card-actions>
    <v-dialog
      v-model="addNewDialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <EditFeatureFields
        type="create"
        :cancel="true"
        @close="addNewDialog = false"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditFeatureFields from "../EditFeatureFields";

export default {
  components: {
    EditFeatureFields
  },
  data() {
    return {
      loading: false,
      addNewDialog: false,
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
      this.environment.featureToggles.push(
        ...this.selectedFeatures.map(ft => ft._id)
      );
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
    ...mapGetters("api", ["getFeatureToggles"]),
    filteredFeatures() {
      return this.getFeatureToggles.filter(
        ft => !this.environment.featureToggles.includes(ft._id)
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
