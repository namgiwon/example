import Vue from "vue";
import Router from "vue-router";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Confirm from "./components/Confirm";
import StoreInfo from "./components/StoreInfo";
import { store } from "./store";

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
  if (store.getters.isValid) {
    return next();
  } else {
    next("/login/signin");
  }
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: Login,
      name: "login",
      children: [
        {
          path: "signup",
          name: "signup",
          component: Signup
        },
        {
          path: "signin",
          name: "signin",
          component: Signin
        }
      ]
    },
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/confirm",
      name: "confirm",
      component: Confirm
    },
    {
      path: "/storeInfo",
      name: "storeInfo  ",
      component: StoreInfo,
      beforeEnter: requireAuth()
    }
  ]
});
