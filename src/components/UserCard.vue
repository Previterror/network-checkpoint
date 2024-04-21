<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import EditButton from './EditButton.vue';



const userprofile = computed(() => AppState.userprofile)
const user = computed(() => AppState.account)


</script>


<template v-if="userprofile">
    <section class="card m-2">
        <section v-if="userprofile.coverImg" class="row m-1">
            <img :src="userprofile.coverImg" alt="" class="img-fluid cover-img rounded-top m-0 p-0">
        </section>
        <section class="row mt-2 mx-2">
            <img :src="userprofile.picture" alt="" class="user-img border border-info border-5 p-0">
            <div class="col-12 col-md-8 mt-2 mx-2">
                <div class="row justify-content-between align-items-center">
                    <h4 class="col">{{ userprofile.class }} <i v-if="userprofile.graduated"
                            class="mdi mdi-account-school"></i>
                    </h4>

                    <a :href="userprofile.linkedin" v-if="userprofile.linkedin"
                        class="mdi mdi-linkedin text-decoration-none text-dark col-1">
                    </a>
                    <a :href="userprofile.github" v-if="userprofile.github"
                        class="mdi mdi-github text-decoration-none text-dark col-1"></a>

                </div>
                <div class="row justify-content-between">
                    <RouterLink :to="{ name: 'ActiveProfile', params: { profileId: userprofile.id } }" class="col-8">
                        <p class="fs-1 m-0 text-decoration-none text-dark">{{ userprofile.name }}</p>
                    </RouterLink>
                    <EditButton :user="userprofile" />
                </div>
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
    transform: translate(10px, -80px);
}
</style>