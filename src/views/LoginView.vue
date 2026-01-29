<script>
export default {
  name: "LoginView",
  data() {
    return {
      login: null,
      password: null,
      errors: ''
    }
  },
  methods: {
    async handleLogin() {
      const url = 'https://comfort.webtm.ru/api/login';
      const options = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: `{"login":"${this.login}","password":"${this.password}"}`
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.username);
          this.$router.push('/profile');
        } else {
          alert('Логин или пароль неверный');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <div id="loginPage" class="page">
    <h1>Вход</h1>
    <form id="loginForm" @submit.prevent="handleLogin">
      <div class="form-group mb-3">
        <label for="loginLogin">Логин</label>
        <input v-model="login" type="text" class="form-control" id="loginLogin" placeholder="Введите логин" value="test_login_01">
      </div>
      <div class="form-group mb-3">
        <label for="loginPassword">Пароль</label>
        <input v-model="password" type="password" class="form-control" id="loginPassword" placeholder="Введите пароль" value="12345678">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Войти</button>
      <router-link to="/register" class="btn btn-secondary mt-2 ms-2">Нет аккаунта?</router-link>
    </form>
  </div>
</template>

<style scoped>

</style>