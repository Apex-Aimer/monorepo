import { useState } from 'react'
import { Text, View } from 'react-native'

import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import { PaywallPlan } from '../Paywall/PaywallPlan'
import { PAYWALL_HORIZONTAL_PADDING } from '../Paywall/PaywallPlan.styles'
import { PaywallContainer } from '../Paywall/PaywallContainer'
import {
  GENERAL_PAYWALL_CTA_HEIGHT,
  GeneralPaywallCTA,
} from './GeneralPaywallCTA'
import { atom, useRecoilValue } from 'recoil'
import {
  InAppPremiumProducts,
  InAppSubscriptionsService,
} from '../InAppSubscriptions/InAppSubscriptionsService'
import { Product, getProducts } from 'react-native-iap'
import { PaywallSubPrice } from '../Paywall/PaywallSubPrice'
import { PaywallDiscountSubPrice } from '../Paywall/PaywallDiscountSubPrice'
import { busyPaying } from './store'

enum Plans {
  Yearly,
  Monthly,
  Weekly,
}

interface Props {
  close(): void
}

interface Subs {
  yearly: Product
  monthly: Product
  weekly: Product
}

const subs = atom<Partial<Subs>>({
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

        const subs: Subs = {
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

function getYearlyDiscount(monthlyPrice: number) {
  return ((Math.floor(monthlyPrice * 12) - 1) * 100 + 99) / 100
}

export function GeneralPaywallScreen({ close }: Props) {
  const styles = useAppStyles(themedStyles)
  const resolvedSubs = useRecoilValue(subs)
  const { yearly, monthly, weekly } = resolvedSubs
  const isBusyPaying = useRecoilValue(busyPaying)
  const [activePlan, setActivePlan] = useState<keyof Subs>('yearly')

  return (
    <>
      <PaywallContainer bottomInset={GENERAL_PAYWALL_CTA_HEIGHT}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Go Premium</Text>
          <Text style={styles.description}>
            Enjoy ads-less experience. Commit to constant improvement in your
            Apex Legends skills.
          </Text>
        </View>
        <View style={styles.plansContainer}>
          {yearly && (
            <PaywallPlan
              active={activePlan === 'yearly'}
              busy={isBusyPaying}
              badge="Save 40%"
              onChange={() => {
                setActivePlan('yearly')
              }}
            >
              <View style={styles.planDescriptionContainer}>
                <Text style={styles.planTitle}>Yearly</Text>
              </View>
              <View style={styles.planPricesContainer}>
                <PaywallSubPrice {...yearly} suffix="/year" />
                <PaywallDiscountSubPrice
                  {...monthly}
                  calculateDiscount={getYearlyDiscount}
                  suffix="/year"
                />
              </View>
            </PaywallPlan>
          )}
          <PaywallPlan
            active={activePlan === 'monthly'}
            busy={isBusyPaying}
            onChange={() => {
              setActivePlan('monthly')
            }}
          >
            <View style={styles.planDescriptionContainer}>
              <Text style={styles.planTitle}>Monthly</Text>
            </View>
            <View style={styles.planPricesContainer}>
              <PaywallSubPrice {...monthly} suffix="/month" />
            </View>
          </PaywallPlan>
          <PaywallPlan
            active={activePlan === 'weekly'}
            busy={isBusyPaying}
            onChange={() => {
              setActivePlan('weekly')
            }}
          >
            <View style={styles.planDescriptionContainer}>
              <Text style={styles.planTitle}>Weekly</Text>
            </View>
            <View style={styles.planPricesContainer}>
              <PaywallSubPrice {...weekly} suffix="/week" />
            </View>
          </PaywallPlan>
        </View>
      </PaywallContainer>
      <GeneralPaywallCTA
        onBack={close}
        currentProductId={resolvedSubs[activePlan].productId}
      />
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerCover: {
    width: '100%',
    aspectRatio: 1.483,
  },
  headerCoverGradient: {
    backgroundColor: 'bg',
  },
  content: {
    backgroundColor: 'bg',
    flexDirection: 'column',
    gap: 32,
    paddingTop: 30,
    paddingHorizontal: PAYWALL_HORIZONTAL_PADDING,
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 14,
  },
  title: {
    fontFamily: 'rubik 700',
    fontSize: 30,
    color: 'text primary',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'rubik 400',
    fontSize: 18,
    color: 'text primary',
    textAlign: 'center',
  },
  plansContainer: {
    gap: 16,
  },
  planTitle: {
    fontFamily: 'rubik 500',
    fontSize: 22,
    lineHeight: 22,
    color: 'text primary',
  },
  planDescription: {
    fontFamily: 'rubik 300',
    fontSize: 18,
    lineHeight: 22,
    color: 'text primary',
  },
  planDescriptionContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  planPricesContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
  },
  planPrice: {
    fontFamily: 'rubik 400',
    fontSize: 18,
    lineHeight: 22,
    color: 'text primary',
  },
  planPriceDiscount: {
    fontFamily: 'rubik 400',
    fontSize: 16,
    lineHeight: 16,
    color: 'line',
  },
})
