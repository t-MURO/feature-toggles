<template>
  <span>
    <v-btn
      @click="dialog = true"
      v-if="featureToggle.status !== 'DELETED'"
      color="accent"
      class="mr-1"
      small
      >Add rules</v-btn
    >
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title
          >Select rules for '{{ featureToggle.name }}'</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table
            v-model="selectedRules"
            :headers="headers"
            hide-default-header
            hide-default-footer
            show-select
            :items="filteredRules"
            item-key="name"
            no-data-text="No rules available"
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
          <edit-rule-fields
            :type="'create'"
            :environment="environment"
            @close="addNewDialog = false"
          ></edit-rule-fields>
        </v-dialog>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapActions } from "vuex";
import EditRuleFields from "./EditRuleFields";

export default {
  components: {
    EditRuleFields
  },
  data() {
    return {
      dialog: false,
      addNewDialog: false,
      loading: false,
      selectedRules: [],
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
      if (this.selectedRules.length === 0) return this.close();
      this.loading = true;
      this.selectedRules.forEach(r => {
        r.featureIds.push(this.featureToggle._id);
        const index = this.environment.rules.findIndex(
          oldRule => oldRule.name === r.name
        );
        this.environment.rules[index] = r;
      });
      this.editEnvironment(this.environment).then(() => {
        this.close();
      });
    },
    close() {
      this.selectedRules = [];
      this.loading = false;
      this.dialog = false;
    }
  },
  props: ["environment", "featureToggle"],
  computed: {
    filteredRules() {
      return this.environment.rules.filter(
        r => !r.featureIds.includes(this.featureToggle._id)
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
