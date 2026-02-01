<script>
const API_BASE = 'https://comfort.webtm.ru/api'

export default {
  name: "ProfileView",
  data() {
    return {
      isLoading: false,
      posts: [],
      user: null,
      errorMessage: '',
      showLikedUsers: false,
      likedUsers: [],
      currentPostId: null,
      currentPostTitle: ''
    }
  },
  mounted() {
    this.loadMyPosts()
  },
  methods: {

    // Загружаем посты пользователя
    async loadMyPosts() {
      const token = localStorage.getItem('token')

      if (!token) {
        alert('Нужно авторизоваться')
        return this.$router.go(-1)
      }


      this.isLoading = true
      this.errorMessage = ''

      const url = API_BASE + '/my-post'
      const options = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (!response.ok) {
          this.errorMessage = data.message || 'Ошибка загрузки постов'
          return this.$router.go(-1)
        }

        this.posts = data.data || []

      } catch (error) {
        console.error('Ошибка загрузки постов:', error)
        this.errorMessage = 'Ошибка сети при загрузке постов'
      } finally {
        this.isLoading = false
      }
    },

    // Удаление поста
    async deletePost(postId) {
      if (!confirm('Вы уверены, что хотите удалить этот пост?')) {
        return
      }

      const token = localStorage.getItem('token')
      const url = API_BASE + '/post/' + postId
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      try {
        const response = await fetch(url, options)

        if (response.ok) {
          // Удаляем пост из списка
          this.posts = this.posts.filter(post => post.id !== postId)
          alert('Пост успешно удалён')
        } else {
          const errorData = await response.json()
          alert('Ошибка: ' + (errorData.message || 'Не удалось удалить пост'))
        }
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert('Не удалось удалить пост')
      }
    },

    // Показать пользователей, лайкнувших пост
    async showUsersWhoLiked(postId, postTitle) {
      const token = localStorage.getItem('token')

      this.isLoading = true
      this.currentPostId = postId
      this.currentPostTitle = postTitle

      const url = API_BASE + '/post/' + postId + '/likes/users'
      const options = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
          this.likedUsers = data.users || []
          this.showLikedUsers = true
        } else {
          alert('Ошибка: ' + (data.message || 'Не удалось загрузить лайки'))
        }
      } catch (error) {
        console.error('Ошибка загрузки лайков:', error)
        alert('Не удалось загрузить список лайкнувших')
      } finally {
        this.isLoading = false
      }
    },

    // Скрыть список лайкнувших
    hideLikedUsers() {
      this.showLikedUsers = false
      this.likedUsers = []
    },

    // Перейти к редактированию поста
    editPost(postId) {
      this.$router.push('/post/' + postId + '/edit')
    },
  }
}
</script>

<template>
  <div id="profilePage" class="page">
    <router-link to="/" class="btn btn-secondary mb-4">← Назад к постам</router-link>

    <!-- Ошибка -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Заголовок с именем пользователя -->
    <h2 class="mb-4">Добро пожаловать, {{ user?.name || 'Пользователь' }}!</h2>

    <!-- Кнопки действий -->
    <div class="mb-4">
      <router-link to="/create" class="btn btn-primary">Создать новый пост</router-link>
    </div>

    <!-- Мои посты -->
    <h4>Мои посты ({{ posts.length }})</h4>

    <!-- Загрузка -->
    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <!-- Таблица постов -->
    <div v-if="!isLoading && posts.length > 0">
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
        <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.name }}</td>
          <td>{{ post.created_at ? post.created_at.split('T')[0] : '—' }}</td>
          <td>
            {{ post.likes_count || 0 }}
            <button
                class="btn btn-sm btn-info ms-2"
                @click="showUsersWhoLiked(post.id, post.name)"
                title="Кто лайкнул"
            >
              👁️
            </button>
          </td>
          <td>
            {{ post.comments_count || 0 }}
            <span class="btn btn-sm btn-info ms-2">
              💬
            </span>
          </td>
          <td class="post-actions">
            <router-link
                :to="'/post/' + post.id"
                class="btn btn-primary btn-sm me-1"
            >
              Просмотр
            </router-link>
            <button
                class="btn btn-warning btn-sm me-1"
                @click="editPost(post.id)"
            >
              Редактировать
            </button>
            <button
                class="btn btn-danger btn-sm"
                @click="deletePost(post.id)"
            >
              Удалить
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>



    <!-- Раздел для пользователей, лайкнувших пост -->
    <div v-if="showLikedUsers" class="mt-5 border-top pt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">
          Пользователи, лайкнувшие пост "{{ currentPostTitle }}"
          <span class="badge bg-info ms-2">{{ likedUsers.length }}</span>
        </h4>
        <button class="btn btn-sm btn-secondary" @click="hideLikedUsers">
          ✕ Закрыть
        </button>
      </div>

      <div v-if="likedUsers.length > 0" class="row">
        <div
            v-for="user in likedUsers"
            :key="user.id"
            class="col-6 col-md-4 col-lg-3 mb-3"
        >
          <div class="card text-center h-100">
            <div class="card-body">
              <div class="user-avatar mx-auto mb-2">
                {{ (user.name || 'П').charAt(0).toUpperCase() }}
              </div>
              <h6 class="card-title mb-1">{{ user.name || 'Аноним' }}</h6>
              <p class="card-text text-muted small">{{ user.login || '' }}</p>
              <small class="text-muted">ID: {{ user.id }}</small>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center p-4 border rounded">
        <p class="text-muted mb-0">Этот пост ещё никто не лайкнул</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-avatar {
  width: 50px;
  height: 50px;
  background-color: #0d6efd;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2em;
  margin: 0 auto;
}

.post-actions {
  white-space: nowrap;
}

.table th {
  background-color: #f8f9fa;
  border-top: none;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>