<template>
  <v-card>
    <v-card-text>
      <strong>Name: </strong>
      <v-text-field
        name="feature-name"
        label="Name"
        id="id"
        v-model="localFeature.name"
        :readonly="!editMode"
        dense
        solo
        flat
        :outlined="editMode"
      ></v-text-field>
      <div v-if="localFeature.description">
        <strong>Description: </strong>
        <v-textarea
          v-model="localFeature.description"
          :readonly="!editMode"
          auto-grow
          :outlined="editMode"
          solo
          flat
          rows="1"
        />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="!editMode" text @click="editMode = true">edit</v-btn>
      <v-btn v-if="editMode" text @click="editMode = false">cancel</v-btn>
      <v-btn
        v-if="editMode"
        text
        @click="editMode = false"
        color="success"
        outlined
        :flat="!editMode"
        solo
        >save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FeatureProps",
  props: ["featureToggle"],
  data() {
    return {
      localFeature: { ...this.featureToggle },
      loading: false,
      editMode: false
    };
  }
};
</script>

<style></style>
