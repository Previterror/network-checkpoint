import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {
    async search(searchQuery) {
        AppState.profiles = []
        const response = await api.get(`/api/profiles?query=${searchQuery}`)
        logger.log('search profiles', response.data)
        const foundProfiles = response.data.map(profile => new Profile(profile))
        AppState.profiles = foundProfiles
    }

    async changeProPage(inc, profileId) {
        let response = await api.get(`api/profiles/${profileId}/posts?page=${inc}`)
        logger.log('ProPage response', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.posts = posts
        AppState.currentpage = response.data.page
        AppState.currentpage = response.data.page
        AppState.maxPages = response.data.totalPages
    }

    async getUserPosts(profileId) {
        const response = await api.get(`api/profiles/${profileId}/posts`)
        logger.log('profile posts', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.posts = posts
        AppState.currentpage = response.data.page
        AppState.maxPages = response.data.totalPages
    }

    async getProfile(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        // logger.log('profile found', response.data)
        let activeprofile = new Profile(response.data)
        AppState.activeprofile = activeprofile
    }

    async getUserProfile(userId) {
        const response = await api.get(`api/profiles/${userId}`)
        // logger.log('getting User Profile', response.data)
        let userprofile = new Profile(response.data)
        AppState.userprofile = userprofile
        logger.log('appstate userpro', AppState.userprofile)
    }

    deactivateProfile() {
        AppState.activeprofile = null
    }

}

export const profilesService = new ProfilesService