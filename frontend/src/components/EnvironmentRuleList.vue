<template>
  <v-card>
    <v-card-text>
      <v-list dense subheader inactive>
        <v-subheader v-if="environment.rules.length > 0"
          >RULES ({{ environment.rules.length }})</v-subheader
        >
        <v-subheader v-else>THIS ENVIRONMENT HAS NO RULES</v-subheader>
        <v-list-item-group inactive color="primary" class="rule-list">
          <v-list-item
            v-for="rule in environment.rules"
            :key="rule.name"
            :ripple="false"
            inactive
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ rule.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <span v-if="rule.roles && rule.roles.length > 0">
                  Roles: {{ rule.roles }}
                  <span v-if="rule.displayToPercentage">, </span>
                </span>
                <span v-if="rule.displayToPercentage">
                  Display to {{ rule.displayToPercentage }}% of users
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <div>
                <v-btn
                  @click="editRule(rule)"
                  color="accent"
                  class="mr-1"
                  small
                >
                  Edit
                </v-btn>
                <v-btn small @click="removeRule(rule)">
                  Remove
                </v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="addRulesDialog = true">Add</v-btn>
    </v-card-actions>
    <v-dialog v-model="selectFeaturesDialog" scrollable max-width="400px">
      <select-features
        @close="selectFeaturesDialog = false"
        :environment="environment"
      ></select-features>
    </v-dialog>
    <v-dialog v-model="addRulesDialog" scrollable max-width="500px">
      <edit-rule-fields
        :environment="environment"
        :type="'create'"
        @close="addRulesDialog = false"
      ></edit-rule-fields>
    </v-dialog>
    <v-dialog v-model="editRuleDialog" scrollable max-width="500px">
      <edit-rule-fields
        :environment="environment"
        :rule="ruleToEdit"
        :type="'edit'"
        @close="editRuleDialog = false"
      ></edit-rule-fields>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectFeatures from "./Features/SelectFeatures";
import EditRuleFields from "./Rules/EditRuleFields.vue";

export default {
  components: { SelectFeatures, EditRuleFields },
  props: ["environment"],
  data() {
    return {
      selectFeaturesDialog: false,
      addRulesDialog: false,
      addRulesEnv: null,
      addRulesFeature: null,
      editRuleDialog: false,
      ruleToEdit: null
    };
  },
  methods: {
    ...mapActions("api", ["editEnvironment"]),
    removeRule(rule) {
      const env = { ...this.environment };
      env.rules = this.environment.rules.filter(r => r.name !== rule.name);
      this.editEnvironment(env);
    },
    editRule(rule) {
      this.ruleToEdit = rule;
      this.editRuleDialog = true;
    }
  },
  computed: {
    ...mapGetters("api", ["getFeatureTogglesByIds"]),
    features() {
      return this.getFeatureTogglesByIds(this.environment.featureToggles);
    }
  }
};
</script>

<style scoped>
.rule-list {
  max-height: 27.5em;
  overflow-y: auto;
}
</style>
