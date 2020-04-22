<template>
  <div class="container">
    <div v-if="!isValid">
      <p>이메일 인증 후 로그인 버튼을 클릭해 주세요.</p>
      <b-button variant="success" @click="emailVerified()">확인</b-button>
    </div>
    <div v-if="isValid">
      <b-alert variant="success" show>
        이메일 인증이 완료되었습니다.
        <br />
        <router-link to="/admin/couponList">바로가기</router-link>
      </b-alert>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import { mapActions, mapMutations, mapGetters } from "vuex";
import listMixins from "../listMixins.js";

export default {
  methods: {
    ...mapMutations({
      validate: "validate"
    }),
    ...mapActions({
      validate: "validate"
    }),
    emailVerified() {
      var _this = this;
      _this.$router.go(0);
    }
  },
  computed: {
    ...mapGetters({
      isValid: "isValid"
    })
  },
  mixins: [listMixins]
};
</script>
