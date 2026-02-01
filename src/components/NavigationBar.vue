<script>
export default {
  name: "NavigationBar",
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">Blog</router-link>
      <div class="navbar-nav">
        <router-link class="nav-link active" to="/">Главная</router-link>
        <router-link class="nav-link active" to="/register">Регистрация</router-link>
        <router-link class="nav-link active" to="/login">Войти</router-link>
        <router-link class="nav-link active" to="/profile">Профиль</router-link>
        <a class="nav-link active" href="#" @click.prevent="logout">Выйти</a>


      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>