import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Features from "./views/Features";
import Environments from "./views/Environments";
import Login from "./views/Login";
import App from "./views/App";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login2",
      component: Login
    },
    {
      path: "/",
      name: "app",
      component: App,
      children: []
    },
    {
      path: "/:id",
      name: "app",
      component: App,
      children: [
        {
          path: "features",
          name: "feats",
          component: Features
        },
        {
          path: "environments",
          name: "environments",
          component: Environments
        }
      ]
    },
  ]
});
