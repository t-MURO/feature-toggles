import axios from "axios";
const BASE_URL = "http://localhost:3333/";
const API_URL = BASE_URL + "api/";
const FEATURE_ROUTE = "features/";
const ENVIRONMENT_ROUTE = "environments/";
const USER_ROUTE = "users/";

export default class APIService {
  static getFeatures() {
    // console.log(API_URL + FEATURE_ROUTE);
    return axios
      .get(API_URL + FEATURE_ROUTE)
      .then(res => res.data)
      .catch(err => console.log("hallo", err));
  }

  static getFeature(id) {
    return axios.get(API_URL + FEATURE_ROUTE + id).then(res => res.data);
  }

  static getEnvironments() {
    return axios.get(API_URL + ENVIRONMENT_ROUTE).then(res => res.data);
  }

  static removeEnvironment(environment) {
    let id;
    typeof environment == "string"
      ? (id = environment)
      : (id = environment._id);
    return axios.delete(API_URL + ENVIRONMENT_ROUTE + id).then(res => res.data);
  }

  static createFeature(feature) {
    return axios.post(API_URL + FEATURE_ROUTE, feature).then(res => res.data);
  }

  static editFeature(feature) {
    return axios
      .put(API_URL + FEATURE_ROUTE + feature._id, feature)
      .then(res => res.data);
  }

  static removeFeature(feature) {
    let id;
    typeof feature == "string" ? (id = feature) : (id = feature._id);
    return axios.delete(API_URL + FEATURE_ROUTE + id).then(res => res.data);
  }

  static getUser() {
    return axios.get(API_URL + USER_ROUTE + "me").then(res => res.data);
  }

  static login(email, password) {
    return axios.post(BASE_URL + "login", {email, password}).then(res => res.data);
  }
}
