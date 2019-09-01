<template>
  <div class="t-layout">
    <v-flex xs12>
      <v-card>
        <h3>{{ environment.name }}</h3>
        <p>{{ environment.description }}</p>
        <v-card-actions>
          <v-switch
            @change="featureSwitch($event)"
            v-model="enabled"
            :loading="loading"
            color="success"
          ></v-switch>
          <v-spacer></v-spacer>
          <v-btn @click="editEnvironment(environment)" color="info">Edit</v-btn>
          <v-btn @click="removeEnvironment(environment)" color="error"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
// import APIService from "@/services/APIService";
// const apiService = new APIService();

export default {
  props: ["environment", "removeEnvironment", "editEnvironment"],
  data() {
    return {
      loading: false,
      enabled: false
    };
  },
  created() {
    this.enabled = this.environment.isEnabled;
  },
  methods: {
    featureSwitch(event) {
      console.log(event);
      //   let environment = { ...this.environment };
      //   environment.isEnabled = event;

      //   this.loading = true;
      //   apiService.editEnvironment(environment).then(res => {
      //     this.$emit("environmentUpdate", res.data);
      //     this.loading = false;
      //   });
    }
  },
  computed: {
    isActive() {
      return this.environment.isEnabled;
    }
  }
};
</script>

<style lang="scss" scoped>
.t-layout {
  margin: 1em 0;
  .v-card {
    padding: 1em 1em 0 1em;
  }
}
</style>
