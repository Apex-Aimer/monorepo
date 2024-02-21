import { StyleSheet, Text, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import {
  ArrowTrendingUpIcon,
  CalendarIcon,
  UserGroupIcon,
} from 'react-native-heroicons/solid'
import { FaceSmileIcon } from 'react-native-heroicons/outline'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { OnboardingScreenCTA } from './components/OnboardingScreenCTA'
import { Suspense } from 'react'
import { generalSubscriptions } from '../components/GeneralPaywall/store'
import { useRecoilValue } from 'recoil'

function SubscriptionPreloadInner() {
  useRecoilValue(generalSubscriptions)

  return null
}

function SubscriptionPreload() {
  return (
    <Suspense fallback={null}>
      <SubscriptionPreloadInner />
    </Suspense>
  )
}

export function FinishScreen() {
  const styles = useAppStyles(themedStyles)
  const headerHeight = useHeaderHeight()
  const fadeOut = useOnboardingFadeOut()

  return (
    <>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <View style={styles.inner}>
          <OnboardingFadeInOutView>
            <Text style={styles.title}>We set up the app for you</Text>
          </OnboardingFadeInOutView>
          <View style={styles.benefits}>
            <OnboardingFadeInOutView style={styles.benefit} fadeInDelay={200}>
              <View style={styles.benefitIconContainer}>
                <ArrowTrendingUpIcon
                  size={40}
                  color={StyleSheet.flatten(styles.benefitIcon).backgroundColor}
                />
              </View>
              <View style={styles.benefitTexts}>
                <Text style={styles.benefitTitle}>Great for Beginners</Text>
                <Text style={styles.benefitDescription}>
                  People who practise regularly improve their skills faster than
                  others. They rank up and have better stats.
                </Text>
              </View>
            </OnboardingFadeInOutView>
            <OnboardingFadeInOutView style={styles.benefit} fadeInDelay={300}>
              <View style={styles.benefitIconContainer}>
                <FaceSmileIcon
                  size={40}
                  color={StyleSheet.flatten(styles.benefitIcon).backgroundColor}
                />
              </View>
              <View style={styles.benefitTexts}>
                <Text style={styles.benefitTitle}>Stop Dying Fast</Text>
                <Text style={styles.benefitDescription}>
                  Prepare your body to the game by pumping blood to your
                  muscles, speed up a nervous system and remember gaming
                  mechanics.
                </Text>
              </View>
            </OnboardingFadeInOutView>
            <OnboardingFadeInOutView style={styles.benefit} fadeInDelay={400}>
              <View style={styles.benefitIconContainer}>
                <UserGroupIcon
                  size={40}
                  color={StyleSheet.flatten(styles.benefitIcon).backgroundColor}
                />
              </View>
              <View style={styles.benefitTexts}>
                <Text style={styles.benefitTitle}>
                  Don’t Let Teammates Down
                </Text>
                <Text style={styles.benefitDescription}>
                  Help your team achieve best results possible. You’ll be ready
                  for a fight from the first game. Have fun playing together.
                </Text>
              </View>
            </OnboardingFadeInOutView>
            <OnboardingFadeInOutView style={styles.benefit} fadeInDelay={500}>
              <View style={styles.benefitIconContainer}>
                <CalendarIcon
                  size={40}
                  color={StyleSheet.flatten(styles.benefitIcon).backgroundColor}
                />
              </View>
              <View style={styles.benefitTexts}>
                <Text style={styles.benefitTitle}>Practice Daily</Text>
                <Text style={styles.benefitDescription}>
                  Warm-ups are short, and not like long practises. But do them
                  consistently and like magic it adds up for real results. You
                  have to experience for yourself to believe.
                </Text>
              </View>
            </OnboardingFadeInOutView>
          </View>
        </View>
        <OnboardingScreenCTA onPress={fadeOut} fadeInDelay={600}>
          <Text style={styles.ctaText}>Get Started</Text>
        </OnboardingScreenCTA>
      </View>
      <SubscriptionPreload />
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'bg',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 48,
  },
  title: {
    fontFamily: 'rubik 600',
    fontSize: 22,
    lineHeight: 22,
    color: 'text primary',
  },
  benefits: {
    gap: 24,
  },
  benefit: {
    flexDirection: 'row',
    gap: 20,
  },
  benefitIconContainer: {
    paddingTop: 11,
  },
  benefitIcon: {
    backgroundColor: 'text primary',
  },
  benefitTexts: {
    flex: 1,
    gap: 4,
  },
  benefitTitle: {
    fontFamily: 'rubik 700',
    fontSize: 14,
    lineHeight: 20,
    color: 'text primary',
  },
  benefitDescription: {
    fontFamily: 'rubik 400',
    fontSize: 12,
    lineHeight: 16,
    color: 'text primary',
  },
  ctaText: {
    fontFamily: 'rubik 800',
    fontSize: 18,
    color: 'text light',
  },
})
