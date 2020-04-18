import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isValid: false
  },
  getters: {
    isValid(state) {
      return state.isValid;
    }
  },
  mutations: {
    validate(state) {
      state.isValid = true;
    },
    notValidate(state) {
      state.isValid = false;
    }
  },
  actions: {
    validate(context) {
      return context.commit("validate");
    }
  }
});
