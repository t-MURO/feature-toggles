import Vue from "vue";
import Router from "vue-router";
import Features from "./views/Features";
import Environments from "./views/Environments";
import Login from "./views/Login";
import App from "./views/App";
import Playground from "./views/Playground";
import Settings from "./views/Settings";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "app",
      component: App,
      children: [
        {
          path: "/features",
          name: "feats",
          component: Features
        },
        {
          path: "/environments",
          name: "environments",
          component: Environments
        },
        {
          path: "/playground",
          name: "workspace",
          component: Playground
        },
        {
          path: "/settings",
          name: "settings",
          component: Settings
        }
      ]
    }

    // {
    //   path: "/:id",
    //   name: "app",
    //   component: App,
    //   children: [
    //     {
    //       path: "features",
    //       name: "feats",
    //       component: Features
    //     },
    //     {
    //       path: "environments",
    //       name: "environments",
    //       component: Environments
    //     },
    //     {
    //       path: "workspace",
    //       name: "workspace",
    //       component: Workspaces
    //     },
    //     {
    //       path: "settings",
    //       name: "settings",
    //       component: Settings
    //     }
    //   ]
    // }
  ]
});
