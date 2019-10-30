import Vue from "vue";
import Router from "vue-router";
import Features from "./views/Features";
import Environments from "./views/Environments";
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
  ]
});

router.beforeEach(authenticate);

export default router;
