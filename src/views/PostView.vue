<script>
const API_BASE = 'https://comfort.webtm.ru/api'
export default {
  name: "PostView",
  data() {
    return {
      post: null,
      newComment: '',
      isLoading: true,  // Добавляем состояние загрузки
      isLiked: false, // Статус лайка текущего пользователя
      errors: ''
    }
  },
  created() {
    this.getPostDetails()
  },
  computed: {
    postId() {
      return this.$route.params.id
    }
  },


  methods: {
    async getPostDetails() {

      const url = API_BASE + '/post/' + this.postId
      const options = {method: 'GET'};

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.post = data.data || data;
        await this.checkMyLike();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false
      }
    },

    async handleLike() {
      const url = API_BASE + '/post/' + this.postId + '/like'
      const token = localStorage.getItem('token')

      if (!token) {
        alert('Нужно авторизоваться')
        return
      }

      const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()
        // Обновляем пост после лайка
        this.getPostDetails()
      } catch (error) {
        console.error(error)
      }
    },

    async addComment() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Для добавления комментария нужно авторизоваться');
        return
      }

      const url = API_BASE + '/post/' + this.postId + '/comment';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer ' + token
        },
        body: `{"text":"${this.newComment}"}`
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Очищаем поле ввода
          this.newComment = '';
          // Обновляем счётчик комментариев в посте
          await this.getPostDetails();
        } else {
          this.errors = data.errors
        }

      } catch (error) {
        console.error(error);
      }
    },

    async checkMyLike() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.isLiked = false
        return
      }

      const url = API_BASE + '/post/' + this.postId + '/like'
      const options = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          // Предполагаем, что API возвращает { liked: true/false }
          this.isLiked = data.is_liked === true
        }
      } catch (error) {
        console.error('Ошибка проверки лайка:', error)
      }
    },

    async deleteComment(commentId) {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Нужно авторизоваться')
        return
      }

      if (!confirm('Удалить комментарий?')) {
        return
      }

      const url = API_BASE + '/comment/' + commentId
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
          this.getPostDetails()
        } else {
          alert(data.error)
        }
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert('Ошибка сети')
      }
    },

  }
}
</script>

<template>
  <div id="postPage" class="page">
    <router-link to="/" class="btn btn-secondary mb-4">← Назад к постам</router-link>

    <!-- Показываем спиннер во время загрузки -->
    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
      <p class="mt-2">Загрузка поста...</p>
    </div>

    <!-- Если пост не найден -->
    <div v-else-if="!post" class="alert alert-danger">
      Пост не найден или произошла ошибка загрузки
    </div>
    <div v-else>
      <h2 class="mb-4">{{ post.name || 'Без названия' }}</h2>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span class="badge bg-success">{{ post.user || 'Аноним' }}</span>
          <span class="text-muted ms-2">{{ post.created_at || 'data' }}</span>
        </div>
        <div>
                    <span class="like-btn me-3" @click="handleLike">
                      <span v-if="isLiked">❤️</span>
                      <span v-else>🤍</span>
                      <span>{{ post.likes_count || 0 }}</span>
                    </span>
          <span>💬 <span>{{ post.comments_count || 0 }}</span></span>
        </div>
      </div>

      <img
          v-if="post.image"
          :src="post.image"
          alt="Изображение поста"
          class="img-fluid mb-4 rounded post-image-large"
      >
      <p class="mb-5">{{ post.text || 'text' }}</p>

      <h4 class="mt-3 mb-4">Комментарии</h4>
      <div v-if="errors" class="alert alert-danger mb-4">
        <strong>Ошибки:</strong> {{ errors }}
      </div>

      <form @submit.prevent="addComment" class="mb-4">
        <textarea rows="3" class="form-control" placeholder="Введите комментарий" v-model="newComment"></textarea>
        <button type="submit" class="btn btn-success mt-2">Отправить</button>
      </form>
    </div>


    <div class="comments" v-if="post && post.comments.length > 0">
      <!-- Комментарий 1 -->
      <div v-for="comment in post.comments" class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex align-items-center mb-2">
              <div class="comment-avatar">{{ comment.user[0].toUpperCase() }}</div>
              <div>
                <h5 class="card-title mb-0">{{ comment.user }}</h5>
                <small class="card-text text-muted">{{ comment.created_at }}</small>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" @click="deleteComment(comment.id)">Удалить</button>
          </div>
          <p class="card-text">{{ comment.text }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>