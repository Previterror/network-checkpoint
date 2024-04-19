<script setup>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { profilesService } from '../services/ProfilesService.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';


const route = useRoute()
const profile = computed(() => AppState.activeprofile)

async function getProfile() {
    try {
        await profilesService.getProfile(route.params.profileId)
    } catch (error) {
        Pop.toast('Could not retrieve profile', 'error')
        logger.error(error)
    }
}

onMounted(() => getProfile())
</script>


<template>
    <section class="row card m-2">
        <img :src="profile.coverImg" alt="" class="img-fluid cover-img rounded m-0 p-0">
        <div>{{ profile.name }}</div>
        <div>{{ profile.picture }}</div>
    </section>
</template>


<style lang="scss" scoped>
.cover-img {
    height: 30dvh;
    object-fit: cover;
    object-position: center;
}
</style>