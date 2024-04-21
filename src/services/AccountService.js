import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Profile } from '../models/Profile.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { profilesService } from './ProfilesService.js'

class AccountService {

  async editProfile(editBody) {
    const response = await api.put('/account', editBody)
    logger.log('updating account', response.data)
    AppState.account = new Account(response.data)
    AppState.userprofile = new Profile(response.data)
  }

  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
      logger.log('account response', res.data)
      await profilesService.getUserProfile(res.data.id)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const accountService = new AccountService()
