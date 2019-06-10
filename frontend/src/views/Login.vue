<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-6">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn icon large target="_blank">
                  <v-icon large>code</v-icon>
                </v-btn>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :disabled="!(email.length > 0 && password.length > 0)"
                @click="login()"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import APIService from "../services/APIService";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      APIService.login(this.email, this.password)
        .then(user => {
          this.$store.commit("SET_USER", user);
          this.$router.push("/");
        })
        .catch(err => {
          alert("auth failed");
          console.log(err);
        });
      console.log(this.email, this.password);
    }
  }
};
</script>

<style scoped></style>
