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
    },
    refreshFirebaseToken(state) {
      myFirebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          state.firebaseToken = idToken;
          axios.defaults.headers.common = {
            Authorization: "Bearer " + token
          };
        });
    }
  },
  actions: {
    validate(context) {
      return context.commit("validate");
    },
    refreshFirebaseToken(context) {
      return context.commit("setFirebaseToken");
    }
  }
});
