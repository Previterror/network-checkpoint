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
    class: '',
    graduated: ''
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
                        <label for="name">Name:</label>
                        <input v-model="editBody.name" type="text" placeholder="Name" class="col-5 form-control"
                            maxlength="100" id="name">
                        <label for="picture">Profile Picture:</label>
                        <input v-model="editBody.picture" type="url" placeholder="Profile Picture"
                            class="col-5 form-control" maxlength="500" id="picture">
                        <label for="bio">Bio:</label>
                        <input v-model="editBody.bio" type="text" placeholder="Bio" class="col-12 form-control"
                            maxlength="1000" id="bio">
                        <label for="coverImg">Cover Image:</label>
                        <input v-model="editBody.coverImg" type="url" placeholder="Cover Image"
                            class="col-5 form-control" maxlength="500" id="coverImg">
                        <label for="class">Class:</label>
                        <input v-model="editBody.class" type="text" placeholder="Class" class="col-5 form-control"
                            maxlength="500" id="class">
                        <div class="d-flex gap-1">
                            <label for="graduated" class="form-check-label">Graduated:</label>
                            <input type="checkbox" class="form-check-input" id="graduated" name="graduated">
                        </div>
                        <label for="github">GitHub:</label>
                        <input v-model="editBody.github" type="text" placeholder="GitHub" class="col-5 form-control"
                            maxlength="500" id="github">
                        <label for="linkedin">LinkedIn:</label>
                        <input v-model="editBody.linkedin" type="text" placeholder="LinkedIn" class="col-5 form-control"
                            maxlength="500" id="linkedin">
                        <label for="resume">Resume:</label>
                        <input v-model="editBody.resume" type="text" placeholder="Resume"
                            class="col-12 form-control mb-1" maxlength="500" id="resume">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>