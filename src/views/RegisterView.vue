<script>
export default {
  name: "RegisterView"
}
</script>

<template>
  <div id="registerPage" class="page">
    <h1>Регистрация</h1>
    <form id="registerForm">
      <div class="form-group mb-3">
        <label for="registerName">Имя</label>
        <input type="text" class="form-control" id="registerName" placeholder="Введите имя" value="test_name_02">
      </div>
      <div class="form-group mb-3">
        <label for="registerLogin">Логин</label>
        <input type="text" class="form-control" id="registerLogin" placeholder="Введите логин" value="test_login_02">
      </div>
      <div class="form-group mb-3">
        <label for="registerPassword">Пароль</label>
        <input type="password" class="form-control" id="registerPassword" placeholder="Введите пароль" value="12345678">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Зарегистрироваться</button>
      <a href="#loginPage" class="btn btn-secondary mt-2 ms-2">Уже есть аккаунт?</a>
    </form>
  </div>
</template>

<style scoped>

</style>