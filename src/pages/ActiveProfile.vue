<script setup>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { profilesService } from '../services/ProfilesService.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService.js';
import { mercsService } from '../services/MercsService.js';
import Mercantile from '../components/Mercantile.vue';

const mercs = computed(() => AppState.mercs)
const posts = computed(() => AppState.posts)
const route = useRoute()
let profile = computed(() => AppState.activeprofile)


async function getProfile() {
    try {
        await profilesService.getProfile(route.params.profileId)
    } catch (error) {
        Pop.toast('Could not retrieve profile', 'error')
        logger.error(error)
    }
}

async function getUserPosts() {
    try {
        await profilesService.getUserPosts(route.params.profileId)
    } catch (error) {
        Pop.toast('Could not retrieve posts', 'error')
        logger.error(error)
    }
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
    getProfile()
    getUserPosts()
    getMercs()
})
</script>


<template>
    <section class="container-fluid">
        <section class="row">
            <section class="col">
                <Mercantile v-for="merc in mercs" :key="merc.title" :merc="merc" />
            </section>
            <section class="col-10">

                <section v-if="profile" class="card m-2">
                    <section class="row  m-2 position-relative">
                        <img :src="profile.coverImg" alt="" class="img-fluid cover-img rounded-top m-0 p-0">
                    </section>
                    <section class="row mt-2 mx-2">
                        <img :src="profile.picture" alt="" class="user-img border border-info border-5 p-0">
                        <div class="col mt-2 mx-2">
                            <div class="row justify-content-between align-items-center">
                                <h4 class="col">{{ profile.class }} <i v-if="profile.graduated"
                                        class="mdi mdi-account-school"></i>
                                </h4>
                                <div class="col-md-4 text-end fs-1 ">
                                    <a :href="profile.linkedin" v-if="profile.linkedin"
                                        class="mdi mdi-linkedin text-decoration-none text-dark">
                                    </a>
                                    <a :href="profile.github" v-if="profile.github"
                                        class="mdi mdi-github text-decoration-none text-dark"></a>
                                </div>
                            </div>
                            <h1>{{ profile.name }}</h1>
                        </div>
                        <p>{{ profile.bio }}</p>
                    </section>
                </section>



                <section v-if="profile">
                    <PostCard v-for="post in posts" :key="post.id" :post="post" />
                </section>

            </section>
        </section>
    </section>




</template>


<style lang="scss" scoped>
.cover-img {
    height: 30dvh;
    object-fit: cover;

}

.user-img {
    width: 20%;
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
    transform: translate(10px, -80px);
}
</style>