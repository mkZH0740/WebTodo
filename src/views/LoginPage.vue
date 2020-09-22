<template>
  <div class="login">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginPage/LoginForm";

export default {
name: "LoginPage",
  components: {LoginForm},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.loggedIn) {
        vm.$router.replace('/invalid')
      }
    })
  }
}
</script>

<style scoped>
  .login {
    position: absolute;
    height: 40%;
    width: 50%;
    top: 30%;
    left: 25%;
    margin: auto;
    
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    background-color: rgba(64, 158, 255, .2);
  }

  .failed {
    font-size: 50px;
  }
</style>