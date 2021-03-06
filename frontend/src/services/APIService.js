import axios from "axios";
import router from "../router";

const BASE_URL = "http://localhost:3333/";
const API_URL = BASE_URL + "api/";
const FEATURE_ROUTE = "feature-toggles/";
const ENVIRONMENT_ROUTE = "environments/";
const USER_ROUTE = "users/";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      router.push("/login");
    } else if (err.response.status >= 400) {
      console.log(err);
      throw err;
    }
  }
);

const user = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
});

export default class APIService {
  static getFeatureToggles() {
    return api.get(FEATURE_ROUTE).then(res => res.data);
  }

  static getFeatureToggle(id) {
    return api.get(FEATURE_ROUTE + id).then(res => res.data);
  }

  static getEnvironments() {
    return api.get(ENVIRONMENT_ROUTE).then(res => res.data);
  }

  static getEnvironment(id) {
    return api.get(ENVIRONMENT_ROUTE + id).then(res => res.data);
  }

  static createEnvironment(environment) {
    return api.post(ENVIRONMENT_ROUTE, environment).then(res => res.data);
  }

  static removeEnvironment(environment) {
    let id;
    typeof environment == "string"
      ? (id = environment)
      : (id = environment._id);
    return api.delete(ENVIRONMENT_ROUTE + id).then(res => res.data);
  }

  static editEnvironment(environment) {
    return api
      .put(ENVIRONMENT_ROUTE + environment._id, environment)
      .then(res => res.data);
  }

  static createFeatureToggle(featureToggle) {
    return api.post(FEATURE_ROUTE, featureToggle).then(res => res.data);
  }

  static editFeatureToggle(featureToggle) {
    return api
      .put(FEATURE_ROUTE + featureToggle._id, featureToggle)
      .then(res => res.data);
  }

  static removeFeatureToggle(id) {
    return api.delete(`${FEATURE_ROUTE}/remove/${id}`).then(res => res.data);
  }

  static deleteFeatureToggle(id) {
    return api.delete(FEATURE_ROUTE + id).then(res => res.data);
  }

  static getUser() {
    return api.get(USER_ROUTE + "me").then(res => res.data);
  }

  static login(email, password) {
    return user
      .post("login", {
        email,
        password
      })
      .then(res => res.data);
  }

  static logout() {
    return user.post("logout").then(res => res.data);
  }

  static register(email, password) {
    return user
      .post("register", {
        email,
        password
      })
      .then(res => res.data);
  }
}
