import { useState } from 'react'
import { Text, View } from 'react-native'

import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import { PaywallPlan } from '../Paywall/PaywallPlan'
import { PaywallContainer } from '../Paywall/PaywallContainer'
import {
  GENERAL_PAYWALL_CTA_HEIGHT,
  GeneralPaywallCTA,
} from './GeneralPaywallCTA'
import { useRecoilValue } from 'recoil'
import { PaywallSubPrice } from '../Paywall/PaywallSubPrice'
import { PaywallDiscountSubPrice } from '../Paywall/PaywallDiscountSubPrice'
import {
  GeneralSubscriptions,
  busyPaying,
  generalSubscriptions,
  getYearlyDiscount,
} from './store'

interface Props {
  close(): void
}

export function GeneralPaywallScreen({ close }: Props) {
  const styles = useAppStyles(themedStyles)
  const resolvedSubs = useRecoilValue(generalSubscriptions)
  const { yearly, monthly, weekly } = resolvedSubs
  const isBusyPaying = useRecoilValue(busyPaying)
  const [activePlan, setActivePlan] =
    useState<keyof GeneralSubscriptions>('yearly')

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
