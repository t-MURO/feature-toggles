import Vue from "vue";
import Router from "vue-router";
import FeatureToggles from "./views/FeatureToggles";
import FeatureToggle from "./views/FeatureToggle";
import Environments from "./views/Environments";
import Environment from "./views/Environment";
import Login from "./views/Login";
import App from "./views/App";
import Playground from "./views/Playground";
import Settings from "./views/Settings";
import store from "./store/store";

Vue.use(Router);

const LOGIN_ROUTE = "/login";
const NON_GUARDED_ROUTES = [LOGIN_ROUTE];

const authenticate = async (to, from, next) => {
  if (NON_GUARDED_ROUTES.includes(to.path) || store.state.user) {
    return next();
  } else {
    try {
      await store.dispatch("getUser");
      return next();
    } catch (e) {
      return next({ path: LOGIN_ROUTE });
    }
  }
};

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: LOGIN_ROUTE,
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "app",
      component: App,
      children: [
        {
          path: "/feature-toggles",
          name: "Feature Toggles",
          component: FeatureToggles
        },
        {
          path: "/feature-toggles/:id",
          name: "Feature Toggle",
          component: FeatureToggle
        },
        {
          path: "/environments",
          name: "environments",
          component: Environments
        },
        {
          path: "/environments/:id",
          name: "Environment",
          component: Environment
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
  ]
});

router.beforeEach(authenticate);

export default router;
