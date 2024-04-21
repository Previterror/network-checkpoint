<script setup>
import { computed, onMounted, ref } from 'vue';
import { Profile } from '../models/Profile.js';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import { Account } from '../models/Account.js';

defineProps({ user: { type: Profile, required: true } })

const editBody = ref({
    bio: '',
    coverImg: '',
    email: '',
    github: '',
    linkedin: '',
    name: '',
    picture: '',
    resume: '',
})

async function editProfile() {
    try {
        await accountService.editProfile(editBody.value)
    } catch (error) {
        Pop.toast('Could not edit profile', 'error')
        logger.error(error)
    }
}

onMounted(() => {
    editBody.value = { ...AppState.userprofile }
})
</script>


<template>
    <button class="btn btn-success p-0 row" data-bs-toggle="modal" data-bs-target="#editModal"><i
            class="mdi mdi-pencil"></i></button>

    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editModalLabel">Edit Profile</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="editProfile()" class="row p-2 gap-1">
                        <input v-model="editBody.name" type="text" placeholder="Name" class="col-5 form-control"
                            maxlength="100">
                        <input v-model="editBody.picture" type="url" placeholder="Profile Picture"
                            class="col-5 form-control" maxlength="500">
                        <input v-model="editBody.bio" type="text" placeholder="Bio" class="col-12 form-control"
                            maxlength="1000">
                        <input v-model="editBody.coverImg" type="url" placeholder="Cover Image"
                            class="col-5 form-control" maxlength="500">
                        <input v-model="editBody.email" type="text" placeholder="Email" class="col-5 form-control"
                            maxlength="500">
                        <input v-model="editBody.github" type="text" placeholder="GitHub" class="col-5 form-control"
                            maxlength="500">
                        <input v-model="editBody.linkedin" type="text" placeholder="LinkedIn" class="col-5 form-control"
                            maxlength="500">
                        <input v-model="editBody.resume" type="text" placeholder="Resume" class="col-12 form-control"
                            maxlength="500">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>