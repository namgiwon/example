<template>
  <div class="container">
    <h3>로그인</h3>
    <br />
    <b-form @submit="onSubmit">
      <b-form-group id="fieldset-1" label label-for="email" description="이메일은 인증용으로만 사용됩니다.">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="이메일을 입력해 주세요"
        ></b-form-input>
      </b-form-group>
      <b-form-group label label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="비밀 번호를 입력해 주세요"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">로그인</b-button>
    </b-form>

    <!-- 모달 -->
    <Modal v-if="showModal" @close="showModal = false">
      <h5 slot="header">로그인 실패</h5>
      <span slot="footer" @click="showModal = false">
        {{msg}}
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </Modal>
  </div>
</template>

<script>
import { myFirebase } from "../firebase";
import Modal from "./common/Modal.vue";
import { store } from "../store";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      showModal: false,
      msg: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      // 파이어베이스 콜백 함수에서 this 키워드가 undefined임
      var _this = this;
      myFirebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(function(user) {
          myFirebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ false)
            .then(function(idToken) {
              store.commit("validate");
              store.commit("setFirebaseToken", idToken);
              _this.$router.push("/admin/couponList");
            });
        })
        .catch(function(error) {
          if (error.code == "auth/wrong-password") {
            _this.msg = "비밀 번호가 틀렸습니다.";
            _this.showModal = !_this.showModal;
            return;
          }
        });
    }
  },
  components: {
    Modal: Modal
  }
};
</script>
