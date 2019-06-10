import axios from "axios";
const API_URL = "http://localhost:3333/api";
const FEATURE_ROUTE = "/features/";
const ENVIRONMENT_ROUTE = "/environments/";
const USER_ROUTE = "/users/";

export default class APIService {
  
  getFeatures() {
    console.log(API_URL + FEATURE_ROUTE);
    return axios
      .get(API_URL + FEATURE_ROUTE)
      .then(res => res.data)
      .catch(err => console.log("hallo", err));
  }

  getFeature(id) {
    return axios.get(API_URL + FEATURE_ROUTE + id).then(res => res.data);
  }

  getEnvironments() {
    return axios.get(API_URL + ENVIRONMENT_ROUTE).then(res => res.data);
  }

  removeEnvironment(environment) {
    let id;
    typeof environment == "string"
      ? (id = environment)
      : (id = environment._id);
    return axios.delete(API_URL + ENVIRONMENT_ROUTE + id).then(res => res.data);
  }

  createFeature(feature) {
    return axios.post(API_URL + FEATURE_ROUTE, feature).then(res => res.data);
  }

  editFeature(feature) {
    return axios
      .put(API_URL + FEATURE_ROUTE + feature._id, feature)
      .then(res => res.data);
  }

  removeFeature(feature) {
    let id;
    typeof feature == "string" ? (id = feature) : (id = feature._id);
    return axios.delete(API_URL + FEATURE_ROUTE + id).then(res => res.data);
  }

  getUser(){
    return axios.get(API_URL + USER_ROUTE + 'me').then(res => res.data);
  }
}
