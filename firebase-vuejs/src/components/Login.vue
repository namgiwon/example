<template>
  <div>
    <router-view></router-view>
    <br />
    <router-link to="/login/signup">회원 가입</router-link>&nbsp;&nbsp;&nbsp;
    <router-link to="/login/signin">로그인</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      console.log(firebase);
    }
  }
};
</script>
