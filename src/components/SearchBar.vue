<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';



const searchQuery = ref('')

async function search() {
    try {
        logger.log('searching for', searchQuery.value)
        await postsService.search(searchQuery.value)
        await profilesService.search(searchQuery.value)
    } catch (error) {
        Pop.toast('Could not search', 'error')
        logger.error(error)
    }
}
</script>


<template>
    <form @submit.prevent="search()">
        <div class="container">
            <div class="row align-items-center">
                <div class="input-group">
                    <input v-model="searchQuery" type="text" class="form-control" placeholder="Search"
                        aria-label="Search" aria-describedby="basic-addon2">
                    <button class="btn btn-secondary rounded-end" type="submit">
                        <i class="mdi mdi-magnify"></i>
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>


<style lang="scss" scoped></style>