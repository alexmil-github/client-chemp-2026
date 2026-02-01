<script>
const API_BASE = 'https://comfort.webtm.ru/api'

export default {
  name: "CreatePostView",
  data() {
    return {
      name: 'test_post_name',
      text: 'test_text',
      imageFile: null,
      isLoading: false,
      errors: ''
    }
  },
  methods: {
    async createPost(e) {
      e.preventDefault()

      const token = localStorage.getItem('token')
      this.isLoading = true

      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('text', this.text)
      if (this.imageFile) {
        formData.append('image', this.imageFile)
      }

      const url = API_BASE + '/post'
      const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
          alert('Пост успешно создан!')
          this.$router.push('/profile')
        }
        this.errors = data.errors
      } catch (error) {
        console.error('Ошибка:', error)
        alert('Ошибка сети')
      } finally {
        this.isLoading = false
      }
    },

    handleFileChange(event) {
      this.imageFile = event.target.files[0]
    },

    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <div id="createPostPage" class="page">
    <button @click="goBack" class="btn btn-secondary mb-4">← Назад к постам</button>

    <h2 class="mb-4">Создание поста</h2>

    <div v-if="errors" class="alert alert-danger mb-4">
      <strong>Ошибки:</strong> {{ errors }}
    </div>

    <form @submit="createPost" id="createPostForm">
      <div class="mb-3">
        <label class="form-label">Название поста</label>
        <input
            type="text"
            class="form-control"
            v-model="name"
            :disabled="isLoading"
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Текст поста</label>
        <textarea
            class="form-control"
            rows="10"
            v-model="text"
            :disabled="isLoading"
        ></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Изображение</label>
        <input
            type="file"
            class="form-control"
            @change="handleFileChange"
            :disabled="isLoading"
        >
      </div>

      <button
          type="submit"
          class="btn btn-success mt-4"
          :disabled="isLoading"
      >
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
        {{ isLoading ? 'Создание...' : 'Создать пост' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>