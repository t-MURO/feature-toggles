<template>
  <v-container v-if="feature">
    <h2 class="display-1">
      {{ feature.name
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
        :feature="feature"
        @close="editDialog = false"
      />
    </v-dialog>
    <v-row>
      <v-col lg="8" v-if="feature.description">
        <v-card>
          <v-card-text>
            <PreformattedParagraph :text="feature.description" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" fill-height>
        <feature-environments :feature="feature" />
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
      feature: null,
      editDialog: false
    };
  },
  beforeMount() {
    if (this.featureProp) {
      this.feature = this.featureProp;
      return;
    }
    const featureFromStore = this.getFeatureToggle(this.$route.params.id);
    if (featureFromStore) {
      this.feature = featureFromStore;
    }
    APIService.getFeatureToggle(this.$route.params.id)
      .then(f => (this.feature = f))
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
        this.feature = newValue;
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
