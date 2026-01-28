<script>
export default {
  name: "LoginView"
}
</script>

<template>
  <div id="loginPage" class="page">
    <h1>Вход</h1>
    <form id="loginForm">
      <div class="form-group mb-3">
        <label for="loginLogin">Логин</label>
        <input type="text" class="form-control" id="loginLogin" placeholder="Введите логин" value="test_login_01">
      </div>
      <div class="form-group mb-3">
        <label for="loginPassword">Пароль</label>
        <input type="password" class="form-control" id="loginPassword" placeholder="Введите пароль" value="12345678">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Войти</button>
      <a href="#registerPage" class="btn btn-secondary mt-2 ms-2">Нет аккаунта?</a>
    </form>
  </div>
</template>

<style scoped>

</style>