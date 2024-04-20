<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import { profilesService } from '../services/ProfilesService.js';
import Mercantile from '../components/Mercantile.vue';
import { mercsService } from '../services/MercsService.js';
import ProfileCard from '../components/ProfileCard.vue';



const user = computed(() => AppState.account)
const posts = computed(() => AppState.posts)
const mercs = computed(() => AppState.mercs)
const currentPage = computed(() => AppState.currentpage)
const maxPages = computed(() => AppState.maxPages)
const profiles = computed(() => AppState.profiles)

const newPostData = ref({
  body: '',
  imgUrl: '',
})

async function createPost() {
  try {
    logger.log('creating post', newPostData.value)
    await postsService.createPost(newPostData.value)
  } catch (error) {
    Pop.toast('Could not create post', 'error')
    logger.error(error)
  }
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

async function changePage(inc) {
  try {
    await postsService.changePage(inc)
  } catch (error) {
    Pop.toast('Could not change page', 'error')
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
    <div class="p-2 card align-items-center shadow rounded elevation-3 mt-3 mx-1">
      <div class="row gap-2 justify-content-around">
        <div class="m-1 col-3">
          <img v-if="user" :src="user.picture" :alt="user.name" :title="user.name" class="img-fluid form-img">
        </div>

        <div class="col-12 col-md-8">
          <form @submit.prevent="createPost()" class="text-end row">
            <textarea v-model="newPostData.body" name="body" id="body" cols="50" rows="5" class="my-2 me-5"
              placeholder="Give us your thoughts..."></textarea>
            <input v-model="newPostData.imgUrl" type="text" class="my-2" placeholder="Image Link">
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
        <div v-if="profiles">
          <h1>Profiles</h1>
          <ProfileCard v-for="profile in profiles" :key="profile.id" :profile="profile" />
        </div>
        <div v-if="posts">
          <h1>Posts</h1>
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
        <div class="row justify-content-around p-3">
          <button :disabled="currentPage == 1" @click="changePage(currentPage - 1)" onclick="window.scrollTo(top)"
            class="btn btn-primary col-3">Previous</button>
          <button :disabled="currentPage == maxPages" @click="changePage(currentPage + 1)"
            onclick="window.scrollTo(top)" class="btn btn-primary col-3">Next</button>
        </div>
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
