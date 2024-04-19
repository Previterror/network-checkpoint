<script setup>
import { computed, onBeforeMount, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import { profilesService } from '../services/ProfilesService.js';
import Mercantile from '../components/Mercantile.vue';
import { mercsService } from '../services/MercsService.js';



const user = computed(() => AppState.account)
const posts = computed(() => AppState.posts)
const mercs = computed(() => AppState.mercs)


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

function deactivateProfile() {
  profilesService.deactivateProfile()
}

async function getMercs() {
  try {
    await mercsService.getMercs()
  } catch (error) {
    Pop.toast('Could not get ads', 'success')
    logger.error(error)
  }
}

onMounted(() => {
  deactivateProfile()
  getAllPosts()
  getMercs()
})

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
  <section class="container-fluid">
    <section class="row">
      <div class="col">

      </div>
      <div class="col-8">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div class="col">
        <Mercantile v-for="merc in mercs" :key="merc.title" :merc="merc" />
      </div>
    </section>
  </section>




</template>

<style scoped lang="scss">
.form-img {
  border-radius: 50%;
}
</style>
