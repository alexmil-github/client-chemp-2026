<script>
const API_BASE = 'https://comfort.webtm.ru/api'
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
    async handleRegister(e) {
      e.preventDefault();
      const url = API_BASE +'/register';
      const options = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: `{"login":"${this.login}","password":"${this.password}","name":"${this.name}"}`
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          this.name = ''
          this.login = ''
          this.password = ''
          // Перенаправляем на страницу входа через 1 секунду
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.errors = data.errors
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

    <div v-if="errors" class="alert alert-danger mb-4">
      <strong>Ошибки:</strong> {{ errors }}
    </div>

    <form id="registerForm" @submit="handleRegister">
      <div class="form-group mb-3">
        <label for="registerName">Имя</label>
        <input type="text" class="form-control" id="registerName" placeholder="Введите имя" value="test_name_02"  v-model="name">
      </div>
      <div class="form-group mb-3">
        <label for="registerLogin">Логин</label>
        <input type="text" class="form-control" id="registerLogin" placeholder="Введите логин" v-model="login">
      </div>
      <div class="form-group mb-3">
        <label for="registerPassword">Пароль</label>
        <input type="password" class="form-control" id="registerPassword" placeholder="Введите пароль" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Зарегистрироваться</button>
      <router-link to="/login" class="btn btn-secondary mt-2 ms-2">Уже есть аккаунт?</router-link>
    </form>
  </div>
</template>

<style scoped>

</style>