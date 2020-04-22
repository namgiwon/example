import bus from "./bus.js";

export default {
  mounted() {
    bus.$emit("end:spinner");
  }
};
