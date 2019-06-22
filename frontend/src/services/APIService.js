import axios from "axios";
const BASE_URL = "http://localhost:3333/";
const API_URL = BASE_URL + "api/";
const FEATURE_ROUTE = "features/";
const ENVIRONMENT_ROUTE = "environments/";
// const USER_ROUTE = "users/";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

const user = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
});

export default class APIService {
  static getFeatures() {
    // console.log(API_URL + FEATURE_ROUTE);
    return api
      .get(FEATURE_ROUTE)
      .then(res => res.data)
      .catch(err => console.log("hallo", err));
  }

  static getFeature(id) {
    return api.get(FEATURE_ROUTE + id).then(res => res.data);
  }

  static getEnvironments() {
    return api.get(ENVIRONMENT_ROUTE).then(res => res.data);
  }

  static removeEnvironment(environment) {
    let id;
    typeof environment == "string"
      ? (id = environment)
      : (id = environment._id);
    return api.delete(ENVIRONMENT_ROUTE + id).then(res => res.data);
  }

  static createFeature(feature) {
    return api.post(FEATURE_ROUTE, feature).then(res => res.data);
  }

  static editFeature(feature) {
    return api.put(FEATURE_ROUTE + feature._id, feature).then(res => res.data);
  }

  static removeFeature(feature) {
    let id;
    typeof feature == "string" ? (id = feature) : (id = feature._id);
    return api.delete(FEATURE_ROUTE + id).then(res => res.data);
  }

  // static getUser() {
  //   return api.get(USER_ROUTE + "me").then(res => res.data);
  // }

  static login(email, password) {
    return user.post("login", { email, password }).then(res => res.data);
  }

  static logout() {
    return user.post("logout").then(res => res.data);
  }

  static register(email, password) {
    return user.post("register", { email, password }).then(res => res.data);
  }
}
