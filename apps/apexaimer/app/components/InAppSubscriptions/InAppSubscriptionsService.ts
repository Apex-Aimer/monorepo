import { getSubscriptions, requestSubscription } from 'react-native-iap'

export enum InAppPremiumProducts {
  Yearly = 'regular_yearly',
  Monthly = 'regular_monthly',
}

export class InAppSubscriptionsService {
  private static __instance: InAppSubscriptionsService
  static get sharedInstance() {
    if (this.__instance == null) {
      this.__instance = new InAppSubscriptionsService()
    }

    return this.__instance
  }

  async checkServerAccess(originalTransactionId: string) {
    try {
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      const apiHost = process.env.EXPO_PUBLIC_API_HOST
      const res = await fetch(
        `${apiHost}/subscriptions/${originalTransactionId}/has-access`
      )

      if (res.status === 200) {
        return true
      }
    } catch (err) {
      // no-op
      console.log(err.message)
    }

    return false
  }

  async buyPremium(product: InAppPremiumProducts) {
    return requestSubscription({
      sku: product,
    })
  }
}
