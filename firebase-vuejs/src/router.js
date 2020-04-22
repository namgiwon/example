import Vue from "vue";
import Router from "vue-router";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Confirm from "./components/Confirm";
import CouponList from "./components/CouponList";
import StoreList from "./components/StoreList";
import Admin from "./components/Admin";
import { store } from "./store";
import bus from "./bus.js";

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
  bus.$emit("start:spinner");
  if (store.getters.isValid) {
    return next();
  } else {
    next("/login/signin");
  }
};

const notRequireAuth = () => (from, to, next) => {
  bus.$emit("start:spinner");
  return next();
};

export default new Router({
  //mode: "history",
  routes: [
    {
      path: "/login",
      component: Login,
      name: "login",
      beforeEnter: notRequireAuth(),
      children: [
        {
          path: "signup",
          name: "signup",
          component: Signup,
          beforeEnter: notRequireAuth()
        },
        {
          path: "signin",
          name: "signin",
          component: Signin,
          beforeEnter: notRequireAuth()
        }
      ]
    },
    {
      path: "/",
      name: "main",
      component: Main,
      beforeEnter: notRequireAuth()
    },
    {
      path: "/confirm",
      name: "confirm",
      component: Confirm
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      beforeEnter: requireAuth(),
      children: [
        {
          path: "couponList",
          name: "couponList",
          component: CouponList,
          beforeEnter: requireAuth()
        },
        {
          path: "storeList",
          name: "storeList",
          component: StoreList,
          beforeEnter: requireAuth()
        }
      ]
    }
  ]
});
