<script setup>
import { Post } from '../models/Post.js';



defineProps({ post: { type: Post, required: true } })


</script>


<template>
    <section class="row card m-4 shadow">
        <section class="col-12 p-4 ">
            <section class="row">
                <div class="col-2">
                    <img :src="post.creator.picture" :alt="post.creator.name" :title="post.creator.name"
                        class="img-fluid user-img">
                </div>
                <section class="col">
                    <h3>{{ post.creator.name }}</h3>
                    <div class="row text-center">
                        <p class="col-2 m-0 p-0">{{ post.createdAt.toLocaleDateString() }}</p>
                        <p v-if="post.creator.graduated" class="col text-start m-0 p-0"><i
                                class="mdi mdi-account-school"></i>
                        </p>
                    </div>
                </section>
            </section>
            <section class="row mt-3">
                <div class="col-12 fs-5">{{ post.body }}</div>
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