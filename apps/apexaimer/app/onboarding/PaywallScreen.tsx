import { useState } from 'react'
import { View, Text } from 'react-native'
import { useRecoilValue } from 'recoil'

import { PaywallContainer } from '../components/Paywall/PaywallContainer'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  GeneralSubscriptions,
  busyPaying,
  generalSubscriptions,
  getYearlyDiscount,
} from '../components/GeneralPaywall/store'
import { PaywallSubPrice } from '../components/Paywall/PaywallSubPrice'
import { PaywallPlan } from '../components/Paywall/PaywallPlan'
import { PaywallDiscountSubPrice } from '../components/Paywall/PaywallDiscountSubPrice'
import { PAYWALL_CTA_HEIGHT, PaywallScreenCTA } from './PaywallScreenCTA'
import { OnboardingFadeInOutView } from './components/OnboardingFadeInOutView'

export function PaywallScreen() {
  const styles = useAppStyles(themedStyles)
  const resolvedSubs = useRecoilValue(generalSubscriptions)
  const { yearly, monthly } = resolvedSubs
  const isBusyPaying = useRecoilValue(busyPaying)
  const [activePlan, setActivePlan] = useState<
    keyof GeneralSubscriptions | 'free'
  >('yearly')

  return (
    <>
      <PaywallContainer bottomInset={PAYWALL_CTA_HEIGHT}>
        <OnboardingFadeInOutView
          style={styles.titleContainer}
          fadeInDelay={200}
        >
          <Text style={styles.title}>Ready to Begin?</Text>
          <Text style={styles.description}>
            Select the way it’s comfortable for you to warm-up. Explore the app
            before you buy or sign up for constant improvement right now. It’s
            up to you.
          </Text>
        </OnboardingFadeInOutView>
        <View style={styles.plansContainer}>
          <OnboardingFadeInOutView fadeInDelay={300}>
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
                <Text style={styles.planDescription}>No ads</Text>
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
          </OnboardingFadeInOutView>
          <OnboardingFadeInOutView fadeInDelay={400}>
            <PaywallPlan
              active={activePlan === 'monthly'}
              busy={isBusyPaying}
              onChange={() => {
                setActivePlan('monthly')
              }}
            >
              <View style={styles.planDescriptionContainer}>
                <Text style={styles.planTitle}>Monthly</Text>
                <Text style={styles.planDescription}>No ads</Text>
              </View>
              <View style={styles.planPricesContainer}>
                <PaywallSubPrice {...monthly} suffix="/month" />
              </View>
            </PaywallPlan>
          </OnboardingFadeInOutView>
          <OnboardingFadeInOutView fadeInDelay={500}>
            <PaywallPlan
              active={activePlan === 'free'}
              busy={isBusyPaying}
              onChange={() => {
                setActivePlan('free')
              }}
            >
              <View style={styles.planDescriptionContainer}>
                <Text style={styles.planTitle}>With ads</Text>
              </View>
              <View style={styles.planPricesContainer}>
                <Text style={styles.planFree}>Free</Text>
              </View>
            </PaywallPlan>
          </OnboardingFadeInOutView>
        </View>
      </PaywallContainer>
      <OnboardingFadeInOutView fadeInDelay={600}>
        <PaywallScreenCTA
          isFree={activePlan === 'free'}
          currentProductId={resolvedSubs[activePlan]?.productId}
        />
      </OnboardingFadeInOutView>
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
  planFree: {
    fontFamily: 'rubik 300',
    fontSize: 18,
    lineHeight: 22,
    color: 'text primary',
  },
})
