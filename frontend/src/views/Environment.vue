<template>
  <v-container v-if="environment">
    <h2 class="display-1">
      {{ environment.name
      }}<v-btn small text @click="editDialog = true"
        ><v-icon>edit</v-icon></v-btn
      >
    </h2>
    <v-dialog
      v-model="editDialog"
      scrollable
      max-width="800px"
      transition="dialog-transition"
    >
      <EditEnvironmentFields
        v-if="editDialog"
        type="edit"
        :cancel="true"
        :environment="environment"
        @close="editDialog = false"
      />
    </v-dialog>
    <v-row>
      <v-col lg="5">
        <v-card>
          <v-card-text>
            <PreformattedParagraph :text="environment.description" />
            Identifier: <strong>{{ environment.identifier }}</strong>
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <stats />
        </v-card>
      </v-col>
      <v-col lg="7">
        <environment-feature-list
          :environment="environment"
        ></environment-feature-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import APIService from "../services/APIService";
import EnvironmentFeatureList from "../components/EnvironmentFeatureList";
import Stats from "../components/Playground/Stats.vue";
import EditEnvironmentFields from "../components/EditEnvironmentFields";
import PreformattedParagraph from "../components/PreformattedParagraph";

export default {
  components: {
    EnvironmentFeatureList,
    Stats,
    EditEnvironmentFields,
    PreformattedParagraph
  },
  name: "Environment",
  data: function() {
    return {
      fetchedEnvironment: null,
      editDialog: false
    };
  },
  beforeMount() {
    APIService.getEnvironment(this.$route.params.id)
      .then(f => (this.environmentLocal = f))
      .catch(err => alert(err));
  },
  computed: {
    ...mapGetters("api", ["getEnvironment"]),
    environment() {
      return (
        this.fetchedEnvironment || this.getEnvironment(this.$route.params.id)
      );
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
