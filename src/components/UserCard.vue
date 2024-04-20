<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';



const userprofile = computed(() => AppState.userprofile)



</script>


<template v-if="userprofile">
    <section class="card m-2">
        <section class="row m-1 position-relative">
            <img :src="userprofile.coverImg" alt="" class="img-fluid cover-img rounded-top m-0 p-0">
        </section>
        <section class="row mt-2 mx-2">
            <img :src="userprofile.picture" alt="" class="user-img border border-info border-5 p-0">
            <div class="col mt-2 mx-2">
                <div class="row justify-content-between align-items-center">
                    <h4 class="col">{{ userprofile.class }} <i v-if="userprofile.graduated"
                            class="mdi mdi-account-school"></i>
                    </h4>
                    <div class="col-md-4 text-end fs-1 ">
                        <a :href="userprofile.linkedin" v-if="userprofile.linkedin"
                            class="mdi mdi-linkedin text-decoration-none text-dark">
                        </a>
                        <a :href="userprofile.github" v-if="userprofile.github"
                            class="mdi mdi-github text-decoration-none text-dark"></a>
                    </div>
                </div>
                <h1>{{ userprofile.name }}</h1>
            </div>
            <p>{{ userprofile.bio }}</p>
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