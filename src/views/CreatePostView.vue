<script>
export default {
  name: "CreatePostView"
}
</script>

<template>
  <div id="createPostPage" class="page">
    <a href="#indexPage" class="btn btn-secondary mb-4">← Назад к постам</a>
    <h2 class="mb-4">Создание поста</h2>
    <form id="createPostForm">
      <div class="mb-3">
        <label class="form-label">Название поста</label>
        <input type="text" class="form-control" value="test_post_name">
      </div>
      <div class="mb-3">
        <label class="form-label">Текст поста</label>
        <textarea class="form-control" rows="10">test_text</textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Изображение</label>
        <input type="file" class="form-control">
      </div>
      <button type="submit" class="btn btn-success mt-4">Создать пост</button>
    </form>
  </div>
</template>

<style scoped>

</style>