<template>
  <span>
    <v-chip
      v-for="rule in rules"
      :key="rule.name"
      @click:close="removeFeatureFromRule(rule.name)"
      close
      class="mx-1"
    >
      {{ rule.name }}
    </v-chip>
  </span>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["environment", "featureToggle"],
  methods: {
    ...mapActions("api", ["editEnvironment"]),
    removeFeatureFromRule(name) {
      const index = this.environment.rules.findIndex(r => r.name === name);
      this.environment.rules[index].featureIds = this.environment.rules[
        index
      ].featureIds.filter(id => id !== this.featureToggle._id);
      this.editEnvironment(this.environment);
    }
  },
  computed: {
    rules() {
      return this.environment.rules.filter(r =>
        r.featureIds.includes(this.featureToggle._id)
      );
    }
  }
};
</script>
