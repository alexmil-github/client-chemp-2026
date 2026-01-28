<script>
export default {
  name: "ProfileView"
}
</script>

<template>
  <div id="profilePage" class="page">
    <a href="#indexPage" class="btn btn-secondary mb-4">← Назад к постам</a>
    <h2 class="mb-4">Добро пожаловать, Алексей Иванов!</h2>

    <div class="mb-4">
      <a href="#createPostPage" class="btn btn-primary">Создать новый пост</a>
      <button class="btn btn-info ms-2" onclick="alert('GET /api/my-post')">Обновить мои посты</button>
    </div>

    <h4>Мои посты</h4>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Название поста</th>
        <th>Дата создания</th>
        <th>Лайки</th>
        <th>Комментарии</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody id="myPostsTable">
      <tr>
        <td>7</td>
        <td>Путешествие в горы</td>
        <td>2025-01-26</td>
        <td>
          24
          <button class="btn btn-sm btn-info ms-2" onclick="alert('GET /api/post/7/likes/users')">👁️</button>
        </td>
        <td>
          8
          <button class="btn btn-sm btn-info ms-2" onclick="alert('GET /api/post/7/comment')">💬</button>
        </td>
        <td class="post-actions">
          <a href="#postPage?id=7" class="btn btn-primary btn-sm">Просмотр</a>
          <a href="#editPostPage" class="btn btn-warning btn-sm">Редактировать</a>
          <button class="btn btn-danger btn-sm" onclick="alert('DELETE /api/post/6')">Удалить</button>
        </td>
      </tr>
      <tr>
        <td>8</td>
        <td>Рецепты здорового питания</td>
        <td>2025-01-25</td>
        <td>
          156
          <button class="btn btn-sm btn-info ms-2" onclick="alert('GET /api/post/8/likes/users')">👁️</button>
        </td>
        <td>
          42
          <button class="btn btn-sm btn-info ms-2" onclick="alert('GET /api/post/8/comment')">💬</button>
        </td>
        <td class="post-actions">
          <a href="#postPage?id=8" class="btn btn-primary btn-sm">Просмотр</a>
          <a href="#editPostPage" class="btn btn-warning btn-sm">Редактировать</a>
          <button class="btn btn-danger btn-sm" onclick="alert('DELETE /api/post/8')">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Раздел для пользователей, лайкнувших посты -->
    <div class="mt-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Пользователи, лайкнувшие пост "Путешествие в горы"</h4>
        <button class="btn btn-sm btn-secondary">✕ Закрыть</button>
      </div>
      <div class="row">
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <div class="user-avatar mx-auto mb-2">МП</div>
              <h6 class="card-title mb-1">Мария Петрова</h6>
              <p class="card-text text-muted small">@maria_petrova</p>
              <small class="text-muted">Лайкнул: сегодня</small>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <div class="user-avatar mx-auto mb-2">ДС</div>
              <h6 class="card-title mb-1">Дмитрий Смирнов</h6>
              <p class="card-text text-muted small">@dmitry_smirnov</p>
              <small class="text-muted">Лайкнул: вчера</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>