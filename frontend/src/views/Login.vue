<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <!-- LOGIN FORM -->
          <v-card v-show="isLoginForm" class="elevation-6">
            <v-form
              ref="login"
              lazy-validation
              v-model="loginForm.valid"
              @submit.prevent="login()"
            >
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-alert
                class="v-alert-custom"
                v-model="userWasCreated"
                dismissible
                type="success"
                tile
              >
                Registration successful
              </v-alert>
              <v-alert
                class="v-alert-custom"
                v-model="loginHasErrors"
                dismissible
                type="error"
                tile
              >
                {{ loginErrorMessage }}
              </v-alert>
              <v-card-text>
                <v-text-field
                  prepend-icon="person"
                  :rules="rules.emailRules"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="loginForm.email"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  :rules="rules.simpleRequiredRules"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="loginForm.password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="primary" @click="switchForm()">
                  Register
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  color="primary"
                  :disabled="!loginForm.valid"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>

          <!-- REGISTRATION FORM -->
          <v-card v-show="!isLoginForm" class="elevation-6">
            <v-form
              ref="register"
              @submit.prevent="register()"
              lazy-validation
              v-model="registerForm.valid"
            >
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration</v-toolbar-title>
              </v-toolbar>
              <v-alert
                class="v-alert-custom"
                v-model="registrationHasErrors"
                dismissible
                type="error"
                tile
              >
                {{ registrationErrorMessage }}
              </v-alert>
              <v-card-text>
                <v-text-field
                  prepend-icon="person"
                  :rules="rules.emailRules"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="registerForm.email"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  :rules="rules.passwordRules"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="registerForm.password"
                ></v-text-field>
                <v-text-field
                  prepend-icon="invalid-icon"
                  :rules="rules.confirmPasswordRules"
                  name="confirm-password"
                  label="Confirm password"
                  id="confirm-password"
                  type="password"
                  v-model="registerForm.confirmPassword"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="primary" @click="switchForm()">
                  Login
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  color="primary"
                  :disabled="!registerForm.valid"
                  >Register</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from "vuex";

import APIService from "../services/APIService";
import { EMAIL_REGEX } from "../config/email";

export default {
  name: "Login",
  data() {
    return {
      isLoginForm: true,
      loginForm: this.cleanLoginForm(),
      registerForm: this.cleanRegisterForm(),
      rules: {
        emailRules: [
          v => !!v || "Email is required",
          v => EMAIL_REGEX.test(v) || "Email address is invalid"
        ],
        passwordRules: [
          v => !!v || "Password is required"
          // v =>
          //   !(v.length < 6) || "Password should be at least 6 characters long"
        ],
        confirmPasswordRules: [
          v => !(v !== this.registerForm.password) || "Passwords don't match"
        ],
        simpleRequiredRules: [v => !!v || "Password is required"]
      },
      userWasCreated: false,
      registrationHasErrors: false,
      registrationErrorMessage: "",
      loginHasErrors: false,
      loginErrorMessage: ""
    };
  },
  methods: {
    ...mapActions(["setUser"]),

    login() {
      if (!this.validateLoginForm()) return;
      APIService.login(this.loginForm.email, this.loginForm.password)
        .then(user => {
          this.setUser(user);
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.response.data.message);
          this.loginErrorMessage = err.response.data.message;
          this.loginHasErrors = true;
        });
    },

    register() {
      if (!this.validateRegisterForm()) return;
      APIService.register(this.registerForm.email, this.registerForm.password)
        .then(() => {
          this.loginForm.email = this.registerForm.email;
          this.userWasCreated = true;
          this.isLoginForm = true;
          this.registerForm = this.cleanRegisterForm();
        })
        .catch(err => {
          this.registrationErrorMessage = err.response.data.message;
          this.registrationHasErrors = true;
        });
    },

    validateLoginForm() {
      return this.$refs.login.validate();
    },

    validateRegisterForm() {
      return this.$refs.register.validate();
    },

    switchForm() {
      this.isLoginForm = !this.isLoginForm;
      if (!this.isLoginForm) {
        this.registrationHasErrors = false;
        this.registerForm = this.cleanRegisterForm();
        this.$refs.register.resetValidation();
      }
    },

    cleanLoginForm() {
      return {
        valid: true,
        email: "",
        password: ""
      };
    },

    cleanRegisterForm() {
      return {
        valid: true,
        email: "",
        password: "",
        confirmPassword: ""
      };
    }
  }
};
</script>

<style scoped>
.v-alert-custom {
  margin-top: 0;
}
</style>
