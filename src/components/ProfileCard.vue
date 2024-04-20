<script setup>
import { Profile } from '../models/Profile.js';


defineProps({ profile: { type: Profile, required: true } })

</script>


<template>
    <section class="row card m-4 shadow">
        <section class="col-12 p-4 ">
            <section class="row">
                <div class="col-12 col-md-1">
                    <RouterLink :to="{ name: 'ActiveProfile', params: { profileId: profile.id } }">
                        <img :src="profile.picture" :alt="profile.name" :title="profile.name"
                            class="img-fluid user-img">
                    </RouterLink>
                </div>
                <section class="col p-0">
                    <RouterLink :to="{ name: 'ActiveProfile', params: { profileId: profile.id } }"
                        class="text-decoration-none text-dark fs-2">
                        {{ profile.name }}
                    </RouterLink>
                    <div class="row">
                        <p class="fs-4 col-12 col-md-3">{{ profile.class }}</p>
                        <i v-if="profile.graduated" class="mdi mdi-account-school fs-4 col-12 col-md-3"></i>
                    </div>
                </section>
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