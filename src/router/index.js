import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import PostView from "@/views/PostView.vue";
import CreatePostView from "@/views/CreatePostView.vue";
import EditPostView from "@/views/EditPostView.vue";
import ProfileView from "@/views/ProfileView.vue";

let name = 'CreatePostView';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView
    },
    {
      path: '/create',
      name: 'CreatePost',
      component: CreatePostView
    },
    {
      path: '/post/:id/edit',
      name: 'EditPost',
      component: EditPostView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
  ],
})

export default router
