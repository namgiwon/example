<template>
  <div id="app">
    <router-view></router-view>
    <spinner :loading="LoadingStatus"></spinner>
  </div>
</template>

<script>
import Spinner from "./components/common/Spinner.vue";
import bus from "./bus.js";
export default {
  data() {
    return {
      LoadingStatus: false
    };
  },
  methods: {
    startSpinner() {
      4;
      this.LoadingStatus = true;
    },
    endSpinner() {
      this.LoadingStatus = false;
    }
  },
  created() {
    bus.$on("start:spinner", this.startSpinner);
    bus.$on("end:spinner", this.endSpinner);
  },
  beforeDestroy() {
    bus.$off("start:spinner");
    bus.$off("end:spinner");
  },
  components: {
    Spinner
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
