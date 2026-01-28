<script>
export default {
  name: "EditPostView"
}
</script>

<template>
  <div id="editPostPage" class="page">
    <a href="#profilePage" class="btn btn-secondary mb-4">← Назад к профилю</a>
    <h2 class="mb-4">Редактирование поста</h2>
    <form id="editPostForm">
      <div class="mb-3">
        <label class="form-label">Название поста</label>
        <input type="text" class="form-control" value="Новое название поста">
      </div>
      <div class="mb-3">
        <label class="form-label">Текст поста</label>
        <textarea class="form-control" rows="10">Новый текст поста для редактирования...</textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Текущее изображение</label>
        <div class="current-image-container mb-2">
          <img src="https://placeholder.apptor.studio/400/200/product1.png" alt="Текущее изображение" class="img-thumbnail" style="max-height: 200px;">
        </div>
        <label class="form-label">Новое изображение</label>
        <input type="file" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary mt-4">Сохранить изменения</button>
      <a href="#profilePage" class="btn btn-secondary mt-4 ms-2">Отмена</a>
    </form>
  </div>
</template>

<style scoped>

</style>