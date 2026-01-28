<script>
export default {
  name: "NavigationBar"
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
        <router-link class="nav-link active" to="">Выйти</router-link>


      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>