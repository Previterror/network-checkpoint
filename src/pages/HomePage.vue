<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';


const user = computed(() => AppState.account)
const posts = computed(() => AppState.posts)



async function createPost() {

}

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  } catch (error) {
    Pop.toast('Could not retrieve posts', 'error')
    logger.error(error)
  }
}

onMounted(() => getAllPosts())

</script>

<template>

  <!-- SECTION - Create Post Form -->
  <div v-if="user" class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="p-2 card align-items-center shadow rounded elevation-3 mt-3">
      <div class="row gap-2 justify-content-around">
        <div class="m-1 col-3">
          <img v-if="user" :src="user.picture" :alt="user.name" :title="user.name" class="img-fluid form-img">
        </div>

        <div class="col-8">
          <form @submit="createPost()" class="text-end">
            <textarea name="body" id="body" cols="50" rows="5" class="my-2 me-5"></textarea>
            <button type="submit" class="btn btn-outline-info me-5">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <PostCard v-for="post in posts" :key="post.id" :post="post" />




</template>

<style scoped lang="scss">
.form-img {
  border-radius: 50%;
}
</style>
