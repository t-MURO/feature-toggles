<template>
  <div>
    <v-dialog v-model="featureDialog" width="800px">
      <EditFeatureFields
        type="create"
        :cancel="true"
        @close="featureDialog = false"
      />
    </v-dialog>
    <v-dialog v-model="environmentDialog" width="800px">
      <EditEnvironmentFields
        type="create"
        :cancel="true"
        @close="environmentDialog = false"
      />
    </v-dialog>
    <v-menu open-on-hover left top offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" fab v-on="on" bottom right fixed>
          <v-icon>add</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="featureDialog = true">
          <v-list-item-title>New Feature Toggle</v-list-item-title>
        </v-list-item>
        <v-list-item @click="environmentDialog = true">
          <v-list-item-title>New Environment</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import EditFeatureFields from "./EditFeatureFields";
import EditEnvironmentFields from "./EditEnvironmentFields";

export default {
  components: { EditFeatureFields, EditEnvironmentFields },
  data() {
    return {
      environmentDialog: false,
      featureDialog: false
    };
  }
};
</script>
