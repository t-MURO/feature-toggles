<template>
  <v-form
    ref="featureToggle"
    lazy-validation
    v-model="isValid"
    @submit.prevent="save()"
  >
    <v-card>
      <v-card-title primary-title>
        <span v-if="type === 'create'">Create Feature</span>
        <span v-if="type === 'edit'">Edit {{ featureToggle.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          placeholder="Name"
          prepend-icon="description"
          name="feature-toggle-name"
          v-model="localFeatureToggle.name"
          :rules="nameRules"
        />
        <v-textarea
          placeholder="Description (optional)"
          prepend-icon="title"
          v-model="localFeatureToggle.description"
          rows="3"
          auto-grow
        />
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="cancel" text color="primary" @click="$emit('close')"
          >Cancel</v-btn
        >
        <v-btn text color="primary" @click="resetForm()">Reset</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="$refs.featureToggle.validate()"
          :disabled="!isValid"
          type="submit"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["featureToggle", "type", "cancel"],
  data() {
    return {
      isValid: false,
      localFeatureToggle: {
        name: "",
        description: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v =>
          this.type !== "create" ||
          this.getAllFeatureToggles.findIndex(ft => ft.name === v) < 0 ||
          "No duplicate names allowed",
        v => !/^[0-9][*]*/.test(v) || "Name cannot start with a number",
        v =>
          /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(v) ||
          "Name can only contain upper and lower case letters, numbers, $ and _"
      ]
    };
  },
  beforeMount() {
    if (this.featureToggle) {
      this.localFeatureToggle = { ...this.featureToggle };
    }
  },
  methods: {
    ...mapActions("api", ["createFeatureToggle", "editFeature"]),
    resetForm() {
      if (this.featureToggle) {
        this.localFeatureToggle = this.featureToggle;
      } else {
        this.$refs.featureToggle.reset();
      }
    },
    save() {
      if (!this.$refs.featureToggle.validate()) {
        return;
      }
      if (this.type === "create") {
        this.createFeatureToggle(this.localFeatureToggle).then(() => {
          this.$emit("close");
          this.$refs.featureToggle.reset(); //look into this
        });
      } else if (this.type === "edit") {
        this.editFeature(this.localFeatureToggle).then(() => {
          this.$emit("close");
          this.$refs.featureToggle.reset();
        });
      }
    }
  },
  computed: {
    ...mapGetters("api", ["getAllFeatureToggles"])
  }
};
</script>
