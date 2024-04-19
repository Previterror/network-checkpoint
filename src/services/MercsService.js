import { AppState } from "../AppState.js"
import { Merc } from "../models/Merc.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class MercsService {
    async getMercs() {
        const response = await api.get('/api/ads')
        // logger.log('ad response', response.data)
        const mercs = response.data.map(merc => new Merc(merc))
        AppState.mercs = mercs
    }

}

export const mercsService = new MercsService