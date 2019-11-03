<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-autocomplete
    ref="autocomplete"
    auto-select-first
    text
    solo-inverted
    hide-details
    prepend-inner-icon="search"
    :menu-props="menuOptions"
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
          <v-chip label link x-small :color="getLabelColor(data.item)">{{
            data.item.type
          }}</v-chip>
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
  data() {
    return {
      menuOptions: {
        maxHeight: 300,
        transition: false,
        maxWidth: 600
      }
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.adjustMenuWidth);
  },
  mounted() {
    this.menuOptions = {
      ...this.menuOptions,
      maxWidth: this.$refs.autocomplete.$el.clientWidth
    };
  },
  methods: {
    adjustMenuWidth() {
      this.menuOptions = {
        ...this.menuOptions,
        maxWidth: this.$refs.autocomplete.$el.clientWidth
      };
    },
    getLabelColor(item) {
      switch (item.type) {
        case "FEATURE":
          return "primary";
        case "ENVIRONMENT":
          return "accent";
        default:
          return "primary";
      }
    }
  },
  computed: {
    ...mapGetters("api", ["getSearchableItems"])
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.adjustMenuWidth);
  }
};
</script>
