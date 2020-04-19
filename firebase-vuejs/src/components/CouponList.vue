<template>
  <div class="container">
    쿠폰 목록
    <br />

    <!-- 모달 -->
    <Modal v-if="showModal" @close="showModal = false">
      <h5 slot="header">요청 실패</h5>
      <span slot="footer" @click="showModal = false">
        {{ msg }}
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { config } from "../config";
import Modal from "./common/Modal.vue";

export default {
  data() {
    return {
      coupons: [],
      showModal: false,
      msg: ""
    };
  },
  created: function() {
    var params = {
      page: 1,
      isFirstPage: true,
      searchParam: ""
    };

    var headers = {
      Authorization: "Bearer " + this.firebaseToken
    };

    var _this = this;
    this.$http
      .get(config.getRestUrlBase() + "/coupon/summary/admin", {
        params,
        headers
      })
      .then(function(res) {
        _this.coupons.push(res.data.message);
        console.log(_this.coupons);
      })
      .catch(function(error) {
        if (error.response.status == 401) {
          _this.msg = "토큰이 만료되었습니다. 페이지를 새로고침 해주세요.";
          _this.showModal = !_this.showModal;
        }
      });
  },
  computed: {
    ...mapGetters({
      firebaseToken: "getFirebaseToken"
    })
  },
  components: {
    Modal: Modal
  }
};
</script>
