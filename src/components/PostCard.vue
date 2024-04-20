<script setup>
import { Post } from '../models/Post.js';
import { Account } from '../models/Account.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const user = computed(() => AppState.account)

defineProps(
    {
        post: { type: Post, required: true },

    }
)

async function deletePost(postId) {
    try {
        await postsService.deletePost(postId)
    } catch (error) {
        Pop.toast('Could not delete post', 'error')
        logger.error(error)
    }
}

async function likePost(postId) {
    try {
        await postsService.likePost(postId)
    } catch (error) {
        Pop.toast('Could not like post', 'error')
        logger.error(error)
    }
}

</script>


<template>
    <section class="row card m-4 shadow">
        <section class="col-12 p-4 ">
            <section class="row">
                <div class="col-12 col-md-1">
                    <RouterLink :to="{ name: 'ActiveProfile', params: { profileId: post.creatorId } }">
                        <img :src="post.creator.picture" :alt="post.creator.name" :title="post.creator.name"
                            class="img-fluid user-img">
                    </RouterLink>
                </div>
                <section class="col">
                    <RouterLink :to="{ name: 'ActiveProfile', params: { profileId: post.creatorId } }"
                        class="text-decoration-none text-dark fs-2">
                        {{ post.creator.name }}
                    </RouterLink>
                    <div class="row">
                        <i class="">{{ post.createdAt.toLocaleDateString() }}
                        </i>
                        <i v-if="post.creator.graduated" class="mdi mdi-account-school"></i>
                    </div>
                </section>
            </section>
            <section class="row mt-3">
                <div class="col-12 fs-5 align-items">
                    <div class="row justify-content-around">
                        <div class="col-6">
                            {{ post.body }}
                        </div>
                        <div class="col-4">
                            <img :src="post.imgUrl" :alt="post.body" :title="post.body" class="rounded img-fluid">
                        </div>
                    </div>
                </div>
            </section>
            <section class="row justify-content-between mt-2">
                <button v-if="user?.id == post.creatorId" @click="deletePost(post.id)"
                    class="col-1 btn btn-outline-danger">
                    <i class="mdi mdi-delete"></i>
                </button>
                <button @click="likePost(post.id)" class="col-2 btn btn-outline-danger">
                    <i class="mdi mdi-heart"> {{ post.likes.length }}</i>
                </button>
            </section>
        </section>
    </section>
</template>


<style lang="scss" scoped>
.user-img {
    width: 100px;
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
}
</style>