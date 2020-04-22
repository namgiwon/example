<template>
  <b-pagination
    v-model="currentPage"
    pills
    :total-rows="rows"
    :per-page="perPage"
    :change="changePage()"
  ></b-pagination>
</template>

<script>
import { getParameterByName } from "../../util";
import { api } from "../../api";

export default {
  props: ["propsdata"],
  data() {
    return {
      perPage: 10,
      currentPage: 1
    };
  },
  methods: {
    changePage() {
      var _this = this;
      if (this.$route.path.indexOf("couponList")) {
        api.fetchCoupons(this.currentPage).then(function(res) {
          _this.$emit("change-page", res.data.message);
        });
      }
    }
  },
  computed: {
    rows() {
      return localStorage.getItem("messageTotalCount");
    }
  }
};
</script>

<style scoped></style>
