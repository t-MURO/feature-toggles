<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-autocomplete
    auto-select-first
    text
    solo-inverted
    hide-details
    prepend-inner-icon="search"
    label="Search"
    :items="getSearchableItems"
    item-text="name"
    item-value="path"
    @input="$router.push($event)"
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>
          {{ data.item.name }}
          <v-chip dense>{{ data.item.type }}</v-chip>
        </v-list-item-title>
        <v-list-item-subtitle>{{ data.item.description }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GlobalSearch",
  computed: {
    ...mapGetters("api", ["getSearchableItems"])
  },
};
</script>
