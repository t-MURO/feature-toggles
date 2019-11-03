<template>
  <v-form
    ref="environment"
    lazy-validation
    v-model="isValid"
    @submit.prevent="$emit('environment-updated', localEnvironment)"
  >
    <v-card>
      <v-card-title primary-title>
        <span v-if="type === 'create'">Create Environment</span>
        <span v-if="type === 'edit'">Edit {{ environment.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          placeholder="Name"
          prepend-icon="description"
          name="environment-name"
          v-model="localEnvironment.name"
          :rules="nameRules"
        />
        <v-textarea
          placeholder="Description (optional)"
          prepend-icon="title"
          v-model="localEnvironment.description"
          rows="2"
          auto-grow
        />
        <v-select
          prepend-icon="power_settings_new"
          placeholder="Features (optional)"
          v-model="localEnvironment.features"
          :items="getFeatures"
          item-text="name"
          item-value="_id"
          clearable
          chips
          deletable-chips
          multiple
          hide-selected
          :disabled="getFeatures.length < 1"
        >
          <template slot="item" slot-scope="data">
            {{ data.item.name }}
            <v-spacer></v-spacer>
            <template v-if="data.item.isEnabled">
              <span v-if="$vuetify.breakpoint.smAndUp">Enabled </span>✔️
            </template>
          </template>
        </v-select>
        <v-text-field
          prepend-icon="lock_open"
          placeholder="Identifier (optional)"
          v-model="localEnvironment.identifier"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="cancel" text color="primary" @click="$emit('close')"
          >Cancel</v-btn
        >
        <v-btn text color="primary" @click="resetForm()">Reset</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="save()"
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
  props: ["environment", "type", "cancel"],
  data() {
    return {
      isValid: false,
      localEnvironment: {
        name: "",
        description: "",
        identifier: "",
        features: []
      },
      nameRules: [
        v => !!v || "Name is required",
        v =>
          this.type !== "create" ||
          this.getEnvironments.findIndex(e => e.name === v) < 0 ||
          "No duplicate names allowed",
        v => !/^[0-9][*]*/.test(v) || "Name cannot start with a number",
        v =>
          /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(v) ||
          "Name can only contain upper and lower case letters, numbers, $ and _"
      ],
      identifierRules: [
        v =>
          this.getEnvironments.findIndex(e => e.identifier === v) < 0 ||
          "No duplicate identifiers allowed"
      ]
    };
  },
  beforeMount() {
    if (this.environment) {
      this.localEnvironment = { ...this.environment };
    }
  },
  methods: {
    ...mapActions("api", ["createEnvironment", "editEnvironment"]),
    resetForm() {
      if (this.environment) {
        this.localEnvironment = this.environment;
      } else {
        this.$refs.environment.reset();
      }
    },
    save() {
      if (!this.$refs.environment.validate()) {
        return;
      }
      if (this.type === "create") {
        this.createEnvironment(this.localEnvironment).then(() => {
          this.$emit("close");
          this.$refs.environment.reset(); //look into this
        });
      } else if (this.type === "edit") {
        this.editEnvironment(this.localEnvironment).then(() => {
          this.$emit("close");
          this.$refs.environment.reset();
        });
      }
    }
  },
  computed: {
    ...mapGetters("api", ["getEnvironments", "getFeatures"])
  }
};
</script>
