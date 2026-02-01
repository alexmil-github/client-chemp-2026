<script>
export default {
  name: "LoginView",
  data() {
    return {
      login: "test_login_01",
      password: "123456578",
      errors: ''
    }
  },
  methods: {
    async handleLogin(e) {
      e.preventDefault()
      const url = 'https://comfort.webtm.ru/api/login';
      const options = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: `{"login":"${this.login}","password":"${this.password}"}`
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.username)
          this.$router.push('/profile')
        } else {
          this.errors = data.errors
        }
        // Сохраняем токен и информацию о пользователе

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

    <div v-if="errors" class="alert alert-danger mb-4">
      <strong>Ошибки:</strong> {{ errors }}
    </div>

    <form id="loginForm" @submit="handleLogin">
      <div class="form-group mb-3">
        <label for="loginLogin">Логин</label>
        <input type="text" class="form-control" id="loginLogin" placeholder="Введите логин" value="test_login_01" v-model="login">
      </div>
      <div class="form-group mb-3">
        <label for="loginPassword">Пароль</label>
        <input type="password" class="form-control" id="loginPassword" placeholder="Введите пароль" value="12345678" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Войти</button>
      <router-link class="btn btn-secondary mt-2 ms-2" to="/register">Нет аккаунта?</router-link>
    </form>
  </div>
</template>

<style scoped>

</style>