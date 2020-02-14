<template>
  <v-form
    ref="rules"
    lazy-validation
    v-model="isValid"
    @submit.prevent="save()"
  >
    <v-card>
      <v-card-title primary-title>
        <span v-if="type === 'create'"
          >Add rule to '{{ environment.name }}'</span
        >
        <span v-if="type === 'edit'">Edit '{{ rule.name }}'</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          name="name"
          required
          label="Name"
          :rules="nameRules"
        ></v-text-field>
        <v-select
          :items="possibleRoles"
          v-model="roles"
          placeholder="Roles (Optional)"
          clearable
          multiple
          chips
          deletable-chips
        ></v-select>
        <v-checkbox
          label="Canary Release / AB-Test"
          v-model="enabledPercentage"
        ></v-checkbox>
        <v-slider
          v-model="displayToPercentage"
          step="5"
          thumb-label
          v-if="enabledPercentage"
          :disabled="!enabledPercentage"
        >
          <template v-slot:prepend>
            {{ displayToPercentage }}% of users will get the feature
          </template>
        </v-slider>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="close()">Cancel</v-btn>
        <v-btn @click="resetForm()">text</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="$refs.rules.validate()"
          :disabled="!isValid"
          type="submit"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["environment", "rule", "type"],
  data() {
    return {
      isValid: false,
      possibleRoles: ["USER", "BETA", "ADMIN"],
      roles: [],
      enabledPercentage: false,
      displayToPercentage: 100,
      name: "",
      nameRules: [
        v =>
          (this.type === "create" &&
            this.environment.rules.findIndex(r => r.name === v) < 0) ||
          (this.type === "edit" &&
            this.environment.rules.findIndex(
              r => r.name === v && v !== this.rule.name
            ) < 0) ||
          "No duplicate names allowed"
      ]
    };
  },
  created() {
    if (this.type === "edit") {
      this.setRole();
    }
  },
  methods: {
    ...mapActions("api", ["editEnvironment"]),
    resetForm() {
      this.$refs.rules.reset();
    },
    setRole() {
      this.roles = this.rule.roles || null;
      this.enabledPercentage = this.rule.displayToPercentage || null;
      this.displayToPercentage = this.rule.displayToPercentage || null;
      this.name = this.rule.name || null;
    },
    close() {
      this.resetForm();
      this.$emit("close");
    },
    save() {
      if (!this.$refs.rules.validate()) {
        return;
      }
      const percentage = this.enabledPercentage
        ? this.displayToPercentage
        : null;

      const updatedRule = {
        name: this.name,
        featureIds: [],
        roles: this.roles,
        displayToPercentage: percentage
      };

      if (this.type === "create") {
        this.environment.rules.push(updatedRule);
      } else if (this.type === "edit") {
        const index = this.environment.rules.findIndex(
          r => r.name === this.rule.name
        );
        this.environment.rules[index] = updatedRule;
      }
      this.editEnvironment(this.environment);
      this.close();
    }
  },
  watch: {
    rule: function() {
      this.resetForm();
      this.setRole();
    }
  }
};
</script>
