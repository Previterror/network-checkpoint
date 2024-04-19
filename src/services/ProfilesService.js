import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {





    async getProfile(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        // logger.log('profile found', response.data)
        let activeprofile = new Profile(response.data)
        AppState.activeprofile = activeprofile
    }

}

export const profilesService = new ProfilesService