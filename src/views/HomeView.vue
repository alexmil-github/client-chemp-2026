<script>
const API_BASE = 'https://comfort.webtm.ru/api';

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      searchQuery: '',
      sortBy: 'newest',
      isLoading: true,
      userLikes: {} // { postId: true/false }
    }
  },
  mounted() {
    this.getSortPosts();
  },
  methods: {
    async handleSearch() {
      const url = API_BASE + '/post/search?q=' + this.searchQuery;
      const options = {method: 'GET'};

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.posts = data.data;
        await this.checkPostsLikes();
      } catch (error) {
        console.error(error);
      }
    },

    async getSortPosts() {
      const url = API_BASE + '/post?sort=' + this.sortBy;
      const options = {method: 'GET'};

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.posts = data.data || [];
        await this.checkPostsLikes();
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    // Проверяем лайки для всех постов
    async checkPostsLikes() {
      const token = localStorage.getItem('token');
      if (!token) {
        // Если не авторизован
        this.posts.forEach(post => {
          this.userLikes[post.id] = false;
        });
        return;
      }

      // Проверяем лайки для каждого поста параллельно
      const promises = this.posts.map(post => this.checkPostLike(post.id));
      await Promise.all(promises);
    },

    // Проверяем лайк для конкретного поста (исправленная версия)
    async checkPostLike(postId) {
      const token = localStorage.getItem('token');

      const url = API_BASE + '/post/' + postId + '/like';
      const options = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };

      try {
        const response = await fetch(url, options);
        console.log('Проверка лайка для поста', postId, 'статус:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Ответ API для поста', postId, ':', data);

          // Пробуем разные варианты поля
          let liked = false;
          if (data.liked !== undefined) {
            liked = data.liked === true;
          } else if (data.is_liked !== undefined) {
            liked = data.is_liked === true;
          } else if (data.data && data.data.liked !== undefined) {
            liked = data.data.liked === true;
          }

          console.log('Пост', postId, 'лайкнут:', liked);
          this.userLikes[postId] = liked;

        } else if (response.status === 404) {
          // Если API возвращает 404 при отсутствии лайка
          console.log('Пост', postId, 'не лайкнут (404)');
          this.userLikes[postId] = false;
        } else {
          console.log('Пост', postId, 'ошибка:', response.status);
          this.userLikes[postId] = false;
        }
      } catch (error) {
        console.error('Ошибка проверки лайка для поста', postId, ':', error);
        this.userLikes[postId] = false;
      }
    },

    // Поставить/убрать лайк
    async handleLike(postId) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Для лайка нужно авторизоваться');
        this.$router.push('/login');
        return;
      }

      const url = API_BASE + '/post/' + postId + '/like';
      const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };

      try {
        const response = await fetch(url, options);
        console.log('Лайк поста', postId, 'статус:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Ответ на лайк:', data);

          // Меняем статус
          const newLikeStatus = !this.userLikes[postId];
          this.userLikes[postId] = newLikeStatus;

          // Обновляем счётчик
          const post = this.posts.find(p => p.id === postId);
          if (post) {
            if (newLikeStatus) {
              post.likes_count = (post.likes_count || 0) + 1;
            } else {
              post.likes_count = Math.max(0, (post.likes_count || 1) - 1);
            }
          }

        } else {
          const errorData = await response.json();
          console.error('Ошибка лайка:', errorData);
          alert('Ошибка: ' + (errorData.message || 'Не удалось поставить лайк'));
        }
      } catch (error) {
        console.error('Ошибка сети при лайке:', error);
        alert('Ошибка сети');
      }
    },
  }
}
</script>

<template>
  <div id="indexPage" class="page">
    <!-- Поиск и сортировка -->
    <div class="row mb-4">
      <div class="col-md-6 search-box">
        <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Поиск постов..."
            @keyup.enter="handleSearch"
        >
      </div>
      <div class="col-md-6 sort-options">
        <select class="form-control" v-model="sortBy" @change="getSortPosts">
          <option value="newest">Сначала новые</option>
          <option value="popular">По популярности</option>
          <option value="most_commented">По комментариям</option>
        </select>
      </div>
    </div>

    <!-- Загрузка -->
    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
      <p class="mt-2">Загрузка постов...</p>
    </div>

    <!-- Посты -->
    <div class="row" v-if="!isLoading">
      <div
          v-for="post in posts"
          :key="post.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <div class="card h-100">
          <img
              v-if="post.image"
              :src="post.image"
              class="card-img-top"
              :alt="post.name"
              style="height: 200px; object-fit: cover;"
          >
          <div class="card-body d-flex flex-column">
            <div class="badge bg-success mb-2">{{ post.user_name || 'Аноним' }}</div>
            <h5 class="card-title">{{ post.name }}</h5>
            <p class="card-text flex-grow-1">{{ post.text }}</p>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <!-- Кнопка лайка -->
              <button
                  class="btn btn-sm p-0 border-0 bg-transparent"
                  @click="handleLike(post.id)"
                  :title="userLikes[post.id] ? 'Убрать лайк' : 'Поставить лайк'"
              >
                <span class="like-btn" :class="{ liked: userLikes[post.id] }">
                  {{ userLikes[post.id] ? '❤️' : '🤍' }}
                  <span>{{ post.likes_count || 0 }}</span>
                </span>
              </button>

              <span>💬 <span>{{ post.comments_count || 0 }}</span></span>
            </div>
            <router-link :to="`/post/${post.id}`" class="btn btn-primary">Читать пост</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.like-btn {
  cursor: pointer;
  font-size: 1.2em;
  transition: transform 0.2s;
}

.like-btn:hover {
  transform: scale(1.1);
}

.like-btn.liked {
  color: #dc3545;
}
</style>