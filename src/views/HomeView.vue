<script>

const API_BASE = 'https://comfort.webtm.ru/api';
export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      searchQuery: '',
      sortBy: 'popular'
    }
  },
  mounted() {
    this.getSortPosts();
  },
  methods: {
    async handleSearch() {
      const url = 'https://comfort.webtm.ru/api/post/search?q='+this.searchQuery;
      const options = {method: 'GET'};

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.posts = data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getSortPosts() {
      const url = 'https://comfort.webtm.ru/api/post?sort='+this.sortBy;
      const options = {method: 'GET'};

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.posts = data.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <div id="indexPage" class="page">
    <!-- Поиск и сортировка ТОЛЬКО на главной -->
    <div class="row mb-4">
      <div class="col-md-6 search-box">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Поиск постов..." @keyup.enter="handleSearch">

      </div>
      <div class="col-md-6 sort-options">
        <select class="form-control" v-model="sortBy" @change="getSortPosts">
          <option value="newest">Сначала новые</option>
          <option value="popular">По популярности</option>
          <option value="most_commented">По комментариям</option>
        </select>
      </div>
    </div>

    <div class="row">
      <!-- Карточка 1 -->
      <div v-for="post in posts" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100">
          <img :src="post.image" class="card-img-top" :alt="post.name">
          <div class="card-body d-flex flex-column">
            <div class="badge bg-success mb-2">{{ post.user_name }}</div>
            <h5 class="card-title">{{ post.name }}</h5>
            <p class="card-text flex-grow-1">{{ post.text }}</p>
            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="like-btn liked">
                                    ❤️ <span>{{ post.likes_count }}</span>
                                </span>
              <span>💬 <span>{{ post.comments_count }}</span></span>
            </div>
            <router-link :to="`/post/${post.id}`" class="btn btn-primary">Читать пост</router-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>