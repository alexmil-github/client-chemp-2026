<script>

import {defineComponent} from "vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default defineComponent({
  components: {NavigationBar}
})
</script>

<template>
  <NavigationBar></NavigationBar>
  <div class="container py-5">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
