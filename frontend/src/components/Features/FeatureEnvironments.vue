<template>
  <v-card>
    <v-list-item-group two-line>
      <v-subheader>USED IN</v-subheader>
      <v-list-item
        v-for="environment in getEnvironmentsForFeature(feature._id)"
        :key="environment._id"
        :to="{ path: '/environments/' + environment._id }"
      >
        <v-list-item-content>
          <v-list-item-title>{{ environment.name }}</v-list-item-title>
          <v-list-item-subtitle>{{
            environment.description
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FeatureEnvironments",
  props: ["feature"],
  computed: {
    ...mapGetters("api", ["getEnvironmentsForFeature"])
  }
};
</script>

<style></style>
