<template>
  <v-container v-if="featureToggle">
    <h2 class="display-1">
      {{ featureToggle.name
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
      <EditFeatureFields
        v-if="editDialog"
        type="edit"
        :cancel="true"
        :featureToggle="featureToggle"
        @close="editDialog = false"
      />
    </v-dialog>
    <v-row>
      <v-col lg="8" v-if="featureToggle.description">
        <v-card>
          <v-card-text>
            <PreformattedParagraph :text="featureToggle.description" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" fill-height>
        <feature-environments :featureToggle="featureToggle" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import APIService from "../services/APIService";
import FeatureEnvironments from "../components/Features/FeatureEnvironments";
import EditFeatureFields from "../components/EditFeatureFields";
import PreformattedParagraph from "../components/PreformattedParagraph";

export default {
  name: "Feature",
  props: ["featureProp"],
  components: {
    FeatureEnvironments,
    EditFeatureFields,
    PreformattedParagraph
  },
  data() {
    return {
      featureToggle: null,
      editDialog: false
    };
  },
  beforeMount() {
    if (this.featureProp) {
      this.featureToggle = this.featureProp;
      return;
    }
    const featureFromStore = this.getFeatureToggle(this.$route.params.id);
    if (featureFromStore) {
      this.featureToggle = featureFromStore;
    }
    APIService.getFeatureToggle(this.$route.params.id)
      .then(ft => (this.featureToggle = ft))
      .catch(err => alert(err));
  },
  computed: {
    ...mapGetters("api", ["getFeatureToggle", "getEnvironmentsForFeature"]),
    featureFromStore() {
      return this.getFeatureToggle(this.$route.params.id);
    }
  },
  watch: {
    featureFromStore(newValue) {
      if (newValue) {
        this.featureToggle = newValue;
      }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
