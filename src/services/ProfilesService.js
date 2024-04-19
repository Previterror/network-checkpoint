import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {
    async getUserPosts(profileId) {
        const response = await api.get(`api/profiles/${profileId}/posts`)
        logger.log('profile posts', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.posts = posts

    }

    async getProfile(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        // logger.log('profile found', response.data)
        let activeprofile = new Profile(response.data)
        AppState.activeprofile = activeprofile
    }

    deactivateProfile() {
        AppState.activeprofile = null
    }

}

export const profilesService = new ProfilesService