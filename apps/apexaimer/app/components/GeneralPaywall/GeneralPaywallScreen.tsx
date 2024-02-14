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

enum Plans {
  Yearly,
  Monthly,
  Weekly,
}

interface Props {
  close(): void
}

export function GeneralPaywallScreen({ close }: Props) {
  const styles = useAppStyles(themedStyles)
  const [activePlan, setActivePlan] = useState(Plans.Yearly)

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
            active={activePlan === Plans.Yearly}
            badge="Save 40%"
            onChange={() => {
              setActivePlan(Plans.Yearly)
            }}
          >
            <View style={styles.planDescriptionContainer}>
              <Text style={styles.planTitle}>Yearly</Text>
            </View>
            <View style={styles.planPricesContainer}>
              <Text style={styles.planPrice}>19.99/year</Text>
            </View>
          </PaywallPlan>
          <PaywallPlan
            active={activePlan === Plans.Monthly}
            onChange={() => {
              setActivePlan(Plans.Monthly)
            }}
          >
            <View style={styles.planDescriptionContainer}>
              <Text style={styles.planTitle}>Monthly</Text>
            </View>
            <View style={styles.planPricesContainer}>
              <Text style={styles.planPrice}>2.99/month</Text>
            </View>
          </PaywallPlan>
          <PaywallPlan
            active={activePlan === Plans.Weekly}
            onChange={() => {
              setActivePlan(Plans.Weekly)
            }}
          >
            <View style={styles.planDescriptionContainer}>
              <Text style={styles.planTitle}>Weekly</Text>
            </View>
            <View style={styles.planPricesContainer}>
              <Text style={styles.planPrice}>0.75/week</Text>
            </View>
          </PaywallPlan>
        </View>
      </PaywallContainer>
      <GeneralPaywallCTA onBack={close} />
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
