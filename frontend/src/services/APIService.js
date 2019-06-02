import axios from "axios";
const API_URL = "http://localhost:3333";
const TOGGLE_ROUTE = "/toggles/";
const ENVIRONMENT_ROUTE = "/environments/";

export default class APIService {
  // constructor(){
  //     axios.get(API_URL + TOGGLE_ROUTE).then(res => console.log(res.data)).catch(err => console.log('hallo', err));
  // }

  getToggles() {
    console.log(API_URL + TOGGLE_ROUTE);
    return axios
      .get(API_URL + TOGGLE_ROUTE)
      .then(res => res.data)
      .catch(err => console.log("hallo", err));
  }

  getToggle(id) {
    return axios.get(API_URL + TOGGLE_ROUTE + id).then(res => res.data);
  }

  getEnvironments() {
    return axios.get(API_URL + ENVIRONMENT_ROUTE).then(res => res.data);
  }

  getEnvironment(id) {
    return axios.get(API_URL + ENVIRONMENT_ROUTE + id).then(res => res.data);
  }

  createToggle(toggle) {
    return axios.post(API_URL + TOGGLE_ROUTE, toggle).then(res => res.data);
  }

  editToggle(toggle) {
    return axios
      .put(API_URL + TOGGLE_ROUTE + toggle._id, toggle)
      .then(res => res.data);
  }

  removeToggle(toggle) {
    let id;
    typeof toggle == "string" ? (id = toggle) : (id = toggle._id);
    return axios.delete(API_URL + TOGGLE_ROUTE + id).then(res => res.data);
  }
}
