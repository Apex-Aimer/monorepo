import { initConnection, requestSubscription, setup } from 'react-native-iap'

export enum InAppPremiumProducts {
  Yearly = 'regular_yearly',
  Monthly = 'regular_monthly',
  Weekly = 'regular_weekly',
}

export class InAppSubscriptionsService {
  private static __instance: InAppSubscriptionsService
  static get sharedInstance() {
    if (this.__instance == null) {
      setup({ storekitMode: 'STOREKIT2_MODE' })

      this.__instance = new InAppSubscriptionsService()
      this.__instance.connection = initConnection()
    }

    return this.__instance
  }

  public connection: Promise<boolean>

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

  async buyPremium(product: string) {
    let purchase = await requestSubscription({
      sku: product,
    })

    if (purchase == null) {
      return false
    }

    return true
  }
}
