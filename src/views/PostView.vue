<script>
export default {
  name: "PostView",
  data() {
    return {
      post: null,
      newComment: null,
      comments: []
    }
  },
  computed: {
    postId() {
      return this.$route.params.id;
    }
  },
  created() {
    this.getPostDetail();
  },
  methods: {
    async getPostDetail() {
      const url = 'https://comfort.webtm.ru/api/post/' + this.postId;
      const options = {method: 'GET'};

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.post = data;
        this.comments = data.comments.reverse();
      } catch (error) {
        console.error(error);
      }
    },

    async handleLike() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Нужно авторизоваться');
      }
      const url = 'https://comfort.webtm.ru/api/post/7/like';
      const options = {
        method: 'POST',
        headers: {authorization: `Bearer ${token}`}
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.success) {
          this.getPostDetail();
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }


    },

    async addComment() {
      const token = localStorage.token;
      if(!token) {
        alert('Для добавления комментария нужно авторизоваться');
      }
      const url = 'https://comfort.webtm.ru/api/post/'+this.postId+'/comment';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: `{"text":"${this.newComment}"}`
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        await this.getPostDetail();
        this.newComment = '';
      } catch (error) {
        console.error(error);
      }

    }
  }
}
</script>

<template>
  <div v-if="post" id="postPage" class="page">
    <router-link to="/" class="btn btn-secondary mb-4">← Назад к постам</router-link>
    <h2 class="mb-4">{{ post.name || 'Нет названия'}}</h2>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <span class="badge bg-success"> {{ post.user_name || 'Аноним' }} </span>
        <span class="text-muted ms-2">{{ post.created_at }}</span>
      </div>
      <div>
                    <span class="like-btn me-3" @click="handleLike">
                        ❤️ <span>{{ post.likes_count || 0 }}</span>
                    </span>
        <span>💬 <span>{{ post.comments_count || 0 }}</span></span>
      </div>
    </div>

    <img
        v-if="post.image"
        :src="post.image" :alt="post.name" class="img-fluid mb-4 rounded post-image-large">
    <p class="mb-5">{{ post.text }}</p>

    <h4 class="mt-3 mb-4">Комментарии</h4>
    <form class="mb-4" @submit.prevent="addComment">
      <textarea v-model="newComment" rows="3" class="form-control" placeholder="Введите комментарий"></textarea>
      <button type="submit" class="btn btn-success mt-2">Отправить</button>
    </form>


    <div class="comments" v-if="post && post.comments ">
      <!-- Комментарий 1 -->
      <div v-for="comment in comments" class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex align-items-center mb-2">
              <div class="comment-avatar">{{ comment.user[0].toUpperCase() }}</div>
              <div>
                <h5 class="card-title mb-0"> {{ comment.user}}</h5>
                <small class="card-text text-muted"> {{ comment.created_at }}</small>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger">Удалить</button>
          </div>
          <p class="card-text">{{ comment.text }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>