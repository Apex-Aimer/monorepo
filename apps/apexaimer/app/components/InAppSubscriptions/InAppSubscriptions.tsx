import { noop } from 'lodash'
import { memo, useEffect } from 'react'
import { Platform } from 'react-native'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import {
  PurchaseError,
  SubscriptionPurchase,
  finishTransaction,
  initConnection,
  promotedProductListener,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap'

import { iapHasPremium, iapRootToken } from '../../createIapStore'
import { InAppSubscriptionsService } from './InAppSubscriptionsService'

const iapConnected = atom({
  key: 'iapConnected',
  default: false,
})

const connection = initConnection()

function InAppSubscriptionsComp() {
  const [isConnected, setConnected] = useRecoilState(iapConnected)
  const setHasPremium = useSetRecoilState(iapHasPremium)
  const setRootToken = useSetRecoilState(iapRootToken)

  useEffect(() => {
    InAppSubscriptionsService.sharedInstance.connection
      .then((value) => {
        setConnected(value)
      })
      /**
       * TODO: Pass it to sentry probably a good idea
       */
      .catch(noop)
  }, [setConnected])

  useEffect(() => {
    if (!isConnected) {
      return
    }

    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: SubscriptionPurchase) => {
        const rootToken = Platform.select({
          ios: purchase.originalTransactionIdentifierIOS,
          android: purchase.purchaseToken,
        })

        /**
         * TODO:
         * It might be a good idea to somehow send it to the server
         * just not right now...
         */

        setRootToken(rootToken)
        setHasPremium(true)

        await finishTransaction({ purchase, isConsumable: false })
      }
    )

    const purchaseErrorSubscription = purchaseErrorListener(
      (_error: PurchaseError) => {
        // TODO: Pass it to sentry probably a good idea
      }
    )

    const promotedProductSubscription = promotedProductListener(async () => {
      //   const product = await IapIos.getPromotedProductIOS();
      //   setPromotedProductsIOS((prevProducts) => [
      //     ...prevProducts,
      //     ...(product ? [product] : []),
      //   ]);
    })

    return () => {
      purchaseUpdateSubscription.remove()
      purchaseErrorSubscription.remove()
      promotedProductSubscription?.remove()
    }
  }, [isConnected, setHasPremium, setRootToken])

  return null
}

export const InAppSubscriptions = memo(InAppSubscriptionsComp)
