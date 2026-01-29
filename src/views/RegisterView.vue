<script>
export default {
  name: "RegisterView",
  data() {
    return {
      name: null,
      login: null,
      password: null,
      errors: ''
    }
  },
  methods: {
    async handleRegister() {
      const url = 'https://comfort.webtm.ru/api/register';
      const options = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: `{"login": "${this.login}","password": "${this.password}","name": "${this.name}"}`
        // body: JSON.stringify({
        //   login: this.login,
        //   password: this.password,
        //   name: this.name
        // })
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          this.$router.push('/login');
        } else {
          this.errors = data.errors;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <div id="registerPage" class="page">
    <h1>Регистрация</h1>
    <form id="registerForm" @submit.prevent="handleRegister">
      <div class="form-group mb-3">
        <label for="registerName">Имя</label>
        <input v-model="name" type="text" class="form-control" id="registerName" placeholder="Введите имя" value="test_name_02">
      </div>
      <div class="form-group mb-3">
        <label for="registerLogin">Логин</label>
        <input v-model="login" type="text" class="form-control" id="registerLogin" placeholder="Введите логин" value="test_login_02">
      </div>
      <div class="form-group mb-3">
        <label for="registerPassword">Пароль</label>
        <input v-model="password" type="password" class="form-control" id="registerPassword" placeholder="Введите пароль" value="12345678">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Зарегистрироваться</button>
      <router-link to="/login" class="btn btn-secondary mt-2 ms-2">Уже есть аккаунт?</router-link>
    </form>
  </div>
</template>

<style scoped>

</style>