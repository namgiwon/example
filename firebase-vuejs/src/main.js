import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import { store } from "./store";
import axios from "axios";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// 메인 http 컴포넌트로 axios 사용. 사용 방법 : this.$http.get/this.$http.post
Vue.prototype.$http = axios;

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
