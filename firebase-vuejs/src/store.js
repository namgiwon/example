import Vue from "vue";
import Vuex from "vuex";
import { myFirebase } from "./firebase";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isValid: false,
    firebaseToken: ""
  },
  getters: {
    isValid(state) {
      return state.isValid;
    },
    getFirebaseToken(state) {
      return state.firebaseToken;
    }
  },
  mutations: {
    validate(state) {
      state.isValid = true;
    },
    setFirebaseToken(state, token) {
      state.firebaseToken = token;
      axios.defaults.headers.common = {
        Authorization: "Bearer " + token
      };
    }
  },
  actions: {
    validate(context) {
      return context.commit("validate");
    },
    setHeader(context) {
      var _this = this;
      myFirebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ false)
        .then(function(idToken) {
          _this.state.firebaseToken = idToken;
          axios.defaults.headers.common = {
            Authorization: "Bearer " + idToken
          };
        });
    }
  }
});
