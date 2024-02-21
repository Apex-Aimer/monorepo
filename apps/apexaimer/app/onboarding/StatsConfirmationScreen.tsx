import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { atom, useSetRecoilState } from 'recoil'
import { useHeaderHeight } from '@react-navigation/elements'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { useThemeColors } from '../components/ThemeProvider'
import { Avatar } from '../components/Avatar'
import { OnboardingScreenCTA } from './components/OnboardingScreenCTA'

interface StatProps {
  label: string
  value: string
}

function Stat({ label, value }: StatProps) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)

  return (
    <LinearGradient
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={theme['onboarding option gradient'] as string[]}
      style={styles.stat}
    >
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </LinearGradient>
  )
}

export function StatsConfirmationScreen() {
  const styles = useAppStyles(themedStyles)
  const fadeOut = useOnboardingFadeOut()
  const { bottom } = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottom, paddingTop: headerHeight + PADDING_VERTICAL },
      ]}
    >
      <OnboardingFadeInOutView>
        <Text style={styles.title}>Is data we{'\n'}extracted correct?</Text>
      </OnboardingFadeInOutView>
      <View style={styles.content}>
        <View style={styles.userDetails}>
          <OnboardingFadeInOutView fadeInDelay={200}>
            <Avatar size={80} />
          </OnboardingFadeInOutView>
          <OnboardingFadeInOutView fadeInDelay={250}>
            <Text style={styles.username}>Username</Text>
          </OnboardingFadeInOutView>
        </View>
        <View style={styles.contentRow}>
          <OnboardingFadeInOutView fadeInDelay={300}>
            <Stat label="Level" value="350" />
          </OnboardingFadeInOutView>
          <OnboardingFadeInOutView fadeInDelay={350}>
            <Stat label="Rank" value="Gold IV" />
          </OnboardingFadeInOutView>
        </View>
        <View style={styles.contentRow}>
          <OnboardingFadeInOutView fadeInDelay={400}>
            <Stat label="KD ratio" value="0.6" />
          </OnboardingFadeInOutView>
          <OnboardingFadeInOutView fadeInDelay={450}>
            <Stat label="Kills" value="1000" />
          </OnboardingFadeInOutView>
        </View>
      </View>
      <OnboardingScreenCTA
        fadeInDelay={600}
        onPress={() => {
          fadeOut()
        }}
      >
        Next
      </OnboardingScreenCTA>
    </View>
  )
}

const PADDING_VERTICAL = 36
const TITLE_LINE_HEIGHT = 36

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'bg',
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'rubik 600',
    fontSize: 24,
    lineHeight: TITLE_LINE_HEIGHT,
    color: 'text primary',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    gap: 24,
    paddingTop: 48,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  userDetails: {
    gap: 15,
    alignItems: 'center',
  },
  username: {
    fontFamily: 'rubik 500',
    fontSize: 20,
    color: 'text primary',
  },
  stat: {
    width: 140,
    height: 140,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  statLabel: {
    fontFamily: 'rubik 600',
    fontSize: 25,
    lineHeight: 30,
    color: 'text primary',
  },
  statValue: {
    fontFamily: 'rubik 600',
    fontSize: 30,
    lineHeight: 30,
    color: 'text accent',
  },
})
