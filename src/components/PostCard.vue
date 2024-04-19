<script setup>
import { Post } from '../models/Post.js';



defineProps({ post: { type: Post, required: true } })


</script>


<template>
    <section class="row card m-4 shadow">
        <section class="col-10 p-4">
            <section class="row">
                <div class="col-2">
                    <img :src="post.creator.picture" :alt="post.creator.name" :title="post.creator.name"
                        class="img-fluid user-img">
                    <h3>{{ post.creator.name }}</h3>
                    <p>{{ post.createdAt.toLocaleDateString }}</p>

                </div>
                <section class="col">{{ post.body }}</section>
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