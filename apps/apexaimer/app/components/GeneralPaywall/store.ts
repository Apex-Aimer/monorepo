import { useCallback } from 'react'
import { Product, getProducts } from 'react-native-iap'
import { atom, useSetRecoilState } from 'recoil'

import {
  InAppPremiumProducts,
  InAppSubscriptionsService,
} from '../InAppSubscriptions/InAppSubscriptionsService'

export const isGeneralPaywallShown = atom({
  key: 'isGeneralPaywallShown',
  default: false,
})

export function useGeneralPaywallScreen() {
  const setIsGeneralPaywallShown = useSetRecoilState(isGeneralPaywallShown)

  return {
    openPaywall: useCallback(() => {
      setIsGeneralPaywallShown(true)
    }, [setIsGeneralPaywallShown]),
  }
}

export const busyPaying = atom({
  key: 'generalPaywallBusyPaying',
  default: false,
})

export interface GeneralSubscriptions {
  yearly: Product
  monthly: Product
  weekly: Product
}

export const generalSubscriptions = atom<Partial<GeneralSubscriptions>>({
  key: 'generalPaywallSubs',
  default: null,
  effects: [
    ({ setSelf }) => {
      async function init() {
        const isConnected = await InAppSubscriptionsService.sharedInstance
          .connection

        if (!isConnected) {
          return null
        }

        const products = await getProducts({
          skus: [
            InAppPremiumProducts.Yearly,
            InAppPremiumProducts.Monthly,
            InAppPremiumProducts.Weekly,
          ],
        })

        const subs: GeneralSubscriptions = {
          yearly: products.find(
            ({ productId }) => productId === InAppPremiumProducts.Yearly
          ),
          monthly: products.find(
            ({ productId }) => productId === InAppPremiumProducts.Monthly
          ),
          weekly: products.find(
            ({ productId }) => productId === InAppPremiumProducts.Weekly
          ),
        }

        return subs
      }

      setSelf(init())
    },
  ],
})

export function getYearlyDiscount(monthlyPrice: number) {
  return ((Math.floor(monthlyPrice * 12) - 1) * 100 + 99) / 100
}
