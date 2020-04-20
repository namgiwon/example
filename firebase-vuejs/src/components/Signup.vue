<template>
  <div class="container">
    <h3>회원 가입</h3>
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
      <b-button type="submit" variant="primary">등록</b-button>
    </b-form>

    <!-- 모달 -->
    <Modal v-if="showModal" @close="showModal = false">
      <h5 slot="header">등록 실패</h5>
      <span slot="footer" @click="showModal = false">
        {{ msg }}
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </Modal>
  </div>
</template>

<script>
import firebase from "firebase";
import Modal from "./common/Modal.vue";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      msg: "",
      showModal: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var _this = this;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(user => {
          _this.$router.push("/confirm");
        })
        .catch(error => {
          console.log(error);
          if (error.code == "auth/email-already-in-use") {
            _this.msg = "이미 등록된 이메일입니다.";
          } else if (error.code == "auth/weak-password") {
            _this.msg = "비밀 번호는 여섯자리 이상 입력해 주세요.";
          }
          _this.showModal = !_this.showModal;
        });
    }
  },
  components: {
    Modal: Modal
  }
};
</script>
