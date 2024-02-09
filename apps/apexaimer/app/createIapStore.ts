import { AppState } from 'react-native'
import { atom } from 'recoil'

import { InAppSubscriptionsService } from './components/InAppSubscriptions/InAppSubscriptionsService'
import {
  defaultStorage,
  getPersistedStorageData,
  persistAtom,
} from './persistAtom'

export const iapRootToken = atom<string>({
  key: 'iapRootToken',
  default: null,
  effects: [persistAtom],
})

const LAST_KNOWN_ACCESS_STORE_KEY = 'LAST_KNOWN_ACESS_STORE_KEY'

export const iapHasPremium = atom({
  key: 'iapHasPremium',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      async function init() {
        const originalTransactionId = getPersistedStorageData(iapRootToken.key)

        if (originalTransactionId == null) {
          return false
        }

        let hasAccess = false

        try {
          hasAccess =
            await InAppSubscriptionsService.sharedInstance.checkServerAccess(
              originalTransactionId
            )
          /**
           * Trying to support offline
           *
           * If user doesn't have internet access (though it's weird for the app use)
           * we will try to get last known access key and use it
           */
          defaultStorage.set(LAST_KNOWN_ACCESS_STORE_KEY, hasAccess)
        } catch {
          hasAccess = defaultStorage.getBoolean(LAST_KNOWN_ACCESS_STORE_KEY)
        }

        return hasAccess
      }

      setSelf(init())

      onSet((hasAccess) => {
        defaultStorage.set(LAST_KNOWN_ACCESS_STORE_KEY, hasAccess)
      })

      const focusSub = AppState.addEventListener('change', async (status) => {
        if (status !== 'active') {
          return
        }
        init().then(setSelf)
      })

      return () => {
        focusSub.remove()
      }
    },
  ],
})
