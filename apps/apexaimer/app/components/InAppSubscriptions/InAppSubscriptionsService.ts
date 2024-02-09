import { getSubscriptions, requestSubscription } from 'react-native-iap'

export enum InAppPremiumProducts {
  Yearly = 'regular_yearly',
  Monthly = 'regular_monthly',
}

const API_HOST =
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  process.env.NODE_ENV === 'production'
    ? 'https://api.apexaimer.com'
    : 'https://ac4a-103-89-79-154.ngrok-free.app'

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
      const res = await fetch(
        `${API_HOST}/subscriptions/${originalTransactionId}/has-access`
      )

      if (res.status === 200) {
        return true
      }
    } catch {
      // no-op
    }

    return false
  }

  async buyPremium(product: InAppPremiumProducts) {
    const subscriptions = await getSubscriptions({
      skus: [InAppPremiumProducts.Monthly],
    })

    return requestSubscription({
      sku: product,
    })
  }
}
