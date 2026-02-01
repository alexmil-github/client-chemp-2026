<script>
const API_BASE = 'https://comfort.webtm.ru/api'

export default {
  name: "EditPostView",
  data() {
    return {
      name: '',
      text: '',
      currentImage: '',
      imageFile: null,
      isLoading: false,
      errors: ''
    }
  },
  computed: {
    postId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.loadPost()
  },
  methods: {
    async loadPost() {
      const token = localStorage.getItem('token')
      const url = API_BASE + '/post/' + this.postId
      const options = {
        method: 'GET',
        headers: {}
      }

      if (token) {
        options.headers['Authorization'] = 'Bearer ' + token
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
          const post = data.data || data
          this.name = post.name
          this.text = post.text
          this.currentImage = post.image
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      }
    },

    handleFileChange(event) {
      this.imageFile = event.target.files[0]
      this.errors.image = []
    },

    clearErrors() {
      this.errors = ''
    },

    async editPost(e) {
      e.preventDefault()

      const token = localStorage.getItem('token')
      if (!token) {
        alert('Нужно авторизоваться')
        this.$router.push('/login')
        return
      }

      this.isLoading = true
      this.clearErrors()

      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('text', this.text)
      if (this.imageFile) {
        formData.append('image', this.imageFile)
      }

      const url = API_BASE + '/post/' + this.postId
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

        if (!response.ok) {
          if (response.status === 422 && data.errors) {
            this.errors = data.errors
          } else {
            alert(data.message || 'Ошибка редактирования')
          }
          return
        }

        alert('Пост успешно обновлён!')
        this.$router.push('/profile')

      } catch (error) {
        console.error('Ошибка:', error)
        alert('Ошибка сети')
      } finally {
        this.isLoading = false
      }
    },

    goBack() {
      this.$router.push('/profile')
    }
  }
}
</script>

<template>
  <div id="editPostPage" class="page">
    <button @click="goBack" class="btn btn-secondary mb-4">← Назад к профилю</button>

    <h2 class="mb-4">Редактирование поста</h2>
    <div v-if="errors" class="alert alert-danger mb-4">
      <strong>Ошибки:</strong> {{ errors }}
    </div>

    <form @submit="editPost" id="editPostForm">
      <div class="mb-3">
        <label class="form-label">Название поста</label>
        <input
            type="text"
            class="form-control"
            v-model="name"
            :class="{ 'is-invalid': errors.name }"
            :disabled="isLoading"
        >
        <div v-if="errors.name" class="invalid-feedback d-block">
          <div v-for="error in errors.name" :key="error" class="small">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Текст поста</label>
        <textarea
            class="form-control"
            rows="10"
            v-model="text"
            :class="{ 'is-invalid': errors.text }"
            :disabled="isLoading"
        ></textarea>
        <div v-if="errors.text" class="invalid-feedback d-block">
          <div v-for="error in errors.text" :key="error" class="small">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Текущее изображение</label>
        <div class="current-image-container mb-2" v-if="currentImage">
          <img
              :src="currentImage"
              alt="Текущее изображение"
              class="img-thumbnail"
              style="max-height: 200px;"
          >
        </div>
        <div v-else class="text-muted small mb-2">
          Нет изображения
        </div>

        <label class="form-label">Новое изображение</label>
        <input
            type="file"
            class="form-control"
            :class="{ 'is-invalid': errors.image }"
            @change="handleFileChange"
            :disabled="isLoading"
        >
        <div v-if="errors.image" class="invalid-feedback d-block">
          <div v-for="error in errors.image" :key="error" class="small">
            {{ error }}
          </div>
        </div>
      </div>

      <button
          type="submit"
          class="btn btn-primary mt-4"
          :disabled="isLoading"
      >
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
        {{ isLoading ? 'Сохранение...' : 'Сохранить изменения' }}
      </button>

      <button
          type="button"
          @click="goBack"
          class="btn btn-secondary mt-4 ms-2"
          :disabled="isLoading"
      >
        Отмена
      </button>
    </form>
  </div>
</template>

<style scoped>
.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>