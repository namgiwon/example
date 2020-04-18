import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import firebase from "firebase";
import { store } from "./store";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// firebase 토큰
var firebaseToken;

const firebaseConfig = {
  apiKey: "AIzaSyCzQ-x5XoYZDOVRKmIWILZ0gWpzA0P7Lqo",
  authDomain: "thankyoureward-b4189.firebaseapp.com",
  databaseURL: "https://thankyoureward-b4189.firebaseio.com",
  projectId: "thankyoureward-b4189",
  storageBucket: "thankyoureward-b4189.appspot.com",
  messagingSenderId: "837334228689",
  appId: "1:837334228689:web:aaa2b28bdfef0c17d9aff0",
  measurementId: "G-KS0GBP0E1K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (!user.emailVerified) {
          user.sendEmailVerification();
          console.log(store.state.isValid);
        } else {
          store.commit("validate");
          console.log(store.state.isValid);
        }
      }
    });
  });
